'use strict';
/**
 * FitMyPhotoA4 — Admin API server (zero external dependencies).
 * Node.js built-ins only: http, crypto, fs, net, tls.
 *
 * Responsibilities:
 *  - Admin password verification (scrypt hash, constant-time compare)
 *  - Rate limiting (lock admin after N failed logins) + OTP resend throttle
 *  - 2-factor auth via email OTP (minimal SMTP client)
 *  - Signed sessions (random token, SHA-256 hash stored)
 *  - Activity log (who changed what when)
 *  - Tool usage stats (today / month / total, by size)
 *  - Site settings (SEO defaults, GA/Search Console, AdSense, tool toggles)
 *  - Per-page SEO overrides (title, meta title, meta description, H1, content, slug aliases)
 *
 * Storage: Supabase PostgreSQL via PostgREST (global fetch, zero deps).
 * Falls back to a local JSON file when SUPABASE_URL is not configured.
 * NOTE: on Render's free plan the local file is ephemeral — configure
 * SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY for durable storage.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const net = require('net');
const tls = require('tls');
const os = require('os');

const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'admin-db.json');

const ENV = {
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'paramkaur00',
  ADMIN_EMAIL: (process.env.ADMIN_EMAIL || '').toLowerCase(),
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: Number(process.env.SMTP_PORT || 587),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  SMTP_SECURE: String(process.env.SMTP_SECURE || '0') === '1',
  RATE_MAX: Number(process.env.RATE_MAX || 5),
  LOCK_MS: Number(process.env.LOCK_MS || 15 * 60 * 1000),
  OTP_TTL_MS: Number(process.env.OTP_TTL_MS || 10 * 60 * 1000),
  OTP_MAX_ATTEMPTS: Number(process.env.OTP_MAX_ATTEMPTS || 3),
  SESSION_TTL_MS: Number(process.env.SESSION_TTL_MS || 24 * 60 * 60 * 1000),
  RESEND_COOLDOWN_MS: Number(process.env.RESEND_COOLDOWN_MS || 60000),
  IS_PROD: String(process.env.NODE_ENV || '').slice(0, 0) === 'production' || String(process.env.NODE_ENV || '') === 'production',
  SUPABASE_URL: (process.env.SUPABASE_URL || '').replace(/\/+$/, ''),
  SUPABASE_KEY: process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || '',
};

const DEFAULT_SETTINGS = {
  siteName: 'FitMyPhotoA4',
  tagline: 'Free A4 photo sheet maker',
  contactEmail: 'paramkaur7821@gmail.com',
  phone: '',
  logo: '',
  social: {},
  homeSEO: null,
  accent: '#7c5cff',
  otpEnabled: true,
  seoDefaults: {
    titleTemplate: '{page} | PhotoSheet Pro',
    metaDescription: 'Make passport, PAN, voter and custom size photo sheets free on one A4 page. Print at 100% scale anywhere in India.',
    keywords: 'photo sheet maker, passport photo, A4 photo print',
  },
  integrations: {
    gaId: '',
    searchConsole: '',
    adsenseScript: '',
  },
  tools: {
    passport: true,
    pan: true,
    voter: true,
    stamp: true,
    custom: true,
  },
};

function dbBackend() {
  const sb = ENV.SUPABASE_URL && ENV.SUPABASE_KEY;
  return {
    isSupabase: !!sb,
    url: sb ? ENV.SUPABASE_URL + '/rest/v1/' : '',
    key: ENV.SUPABASE_KEY,
  };
}

function sbHeaders(key, json) {
  const h = {
    apikey: key,
    Authorization: 'Bearer ' + key,
  };
  if (json) h['Content-Type'] = 'application/json';
  return h;
}

async function sbGet(b) {
  const res = await fetch(b.url + 'app_kv?id=eq.1&select=value', {
    headers: sbHeaders(b.key),
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error('supabase GET ' + res.status);
  const rows = await res.json();
  return rows && rows.length ? rows[0].value : null;
}

async function sbUpsert(b, value) {
  const res = await fetch(b.url + 'app_kv', {
    method: 'POST',
    headers: sbHeaders(b.key, true),
    body: JSON.stringify({ id: 1, value, updated_at: new Date().toISOString() }),
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error('supabase UPSERT ' + res.status + ' ' + body.slice(0, 160));
  }
  return true;
}

function db() {
  let data = null;

  async function init() {
    const b = dbBackend();
    if (b.isSupabase) {
      try {
        data = await sbGet(b);
      } catch (e) {
        console.error('[db] supabase load failed, falling back to file:', e.message);
      }
    }
    if (!data) {
      try {
        if (fs.existsSync(DB_FILE)) data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      } catch (e) {
        console.error('DB read failed', e.message);
      }
    }
    if (!data) {
      data = seed();
    }
    if (b.isSupabase) {
      try {
        await saveToSupabase();
      } catch (e) {
        console.error('[db] initial supabase sync failed:', e.message);
      }
    }
  }

  let saveQueue = Promise.resolve();

  async function saveToSupabase() {
    const b = dbBackend();
    await sbUpsert(b, data);
  }

  function save() {
    const b = dbBackend();
    // keep last data written to disk for the file fallback path
    if (b.isSupabase) {
      saveQueue = saveQueue.then(() => saveToSupabase()).catch((e) => {
        console.error('[db] supabase save failed:', e.message);
      });
    } else {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
      } catch (e) {
        console.error('DB write failed', e.message);
      }
    }
  }

  function load() {
    return data;
  }

  function seed() {
    const hash = makeHash(ENV.ADMIN_PASSWORD);
    const d = {
      version: 1,
      adminPassword: hash,
      sessions: {},
      pendingLogin: null,
      pendingOtp: null,
      rate: { fails: 0, lockUntil: 0 },
      otpResendByIp: {},
      activity: [],
      stats: { total: 0, bySize: {}, days: {}, months: {} },
      settings: JSON.parse(JSON.stringify(DEFAULT_SETTINGS)),
      pageOverrides: {},
      pageAliases: {},
      posts: {},
    };
    return d;
  }
  return { init, load, save, seed };
}

const store = db();

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
function monthKey() {
  return new Date().toISOString().slice(0, 7);
}

function makeHash(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const key = crypto.scryptSync(password, salt, 64);
  return { algo: 'scrypt', salt, hash: key.toString('hex'), ver: 1 };
}
function verifyHash(password, rec) {
  if (!rec || !rec.salt || !rec.hash) return false;
  const key = Buffer.from(rec.hash, 'hex');
  const test = crypto.scryptSync(password, rec.salt, key.length);
  return key.length === test.length && crypto.timingSafeEqual(key, test);
}
function randomToken(bytes) {
  return crypto.randomBytes(bytes).toString('hex');
}
function sha256(s) {
  return crypto.createHash('sha256').update(s).digest('hex');
}
function maskEmail(email) {
  const at = email.indexOf('@');
  if (at <= 1) return '***';
  return email.slice(0, 2) + '***' + email.slice(at - 1);
}

function log(conn, action, actor, detail) {
  const d = store.load();
  d.activity.unshift({
    ts: Date.now(),
    action,
    actor: actor || 'system',
    detail: detail || '',
    ip: conn.ip || 'unknown',
  });
  if (d.activity.length > 500) d.activity.length = 500;
  store.save();
}

/**
 * Minimal SMTP client using node:net / node:tls — supports AUTH LOGIN,
 * 587 STARTTLS and 465 implicit TLS. Sends a simple HTML+text email.
 */
function sendEmail(to, subject, text, html) {
  const host = ENV.SMTP_HOST;
  if (!host || !ENV.SMTP_USER) return Promise.resolve({ ok: false, configured: false });
  return new Promise((resolve, reject) => {
    const secure = ENV.SMTP_SECURE || ENV.SMTP_PORT === 465;
    const sockOptions = { host, port: ENV.SMTP_PORT, rejectUnauthorized: false };
    let socket = secure ? tls.connect(sockOptions) : net.connect(sockOptions);
    let buf = '';
    let step = 0;
    let farewell = false;
    const lines = [];
    let mail = '';

    function send(line) {
      socket.write(line + '\r\n');
    }
    function check(code, proceed) {
      if (!/^[0-9]{3} /.test(lines[lines.length - 1])) return;
      proceed();
    }
    socket.on('connect', () => {
      // wait for banner
    });
    socket.on('secureConnect', () => {
      // 220 banner comes after secure connect
    });
    socket.on('data', (chunk) => {
      buf += chunk.toString('latin1');
      const parts = buf.split(/\r?\n/);
      buf = parts.pop() || '';
      for (const p of parts) {
        if (p.trim()) {
          lines.push(p.trim());
          const code = String(p.trim().slice(0, 3));
          const cont = p.length > 3 && p[3] === '-';
          if (cont) continue;
          handle(code, p);
        }
      }
    });

    function handle(code, line) {
      if (code === '221') {
        socket.end();
        resolve({ ok: true, configured: true });
        return;
      }
      if (step === 0) {
        send('EHLO ' + os.hostname());
        step = 1;
      } else if (step === 1) {
        if (line.toUpperCase().includes('STARTTLS') && !secure && ENV.SMTP_PORT !== 465) {
          send('STARTTLS');
          step = 2;
        } else if (line.toUpperCase().includes('AUTH')) {
          send('AUTH LOGIN');
          step = 3;
        } else {
          fail(new Error('server does not support STARTTLS/AUTH'));
        }
      } else if (step === 2) {
        const upgraded = tls.connect({
          socket,
          rejectUnauthorized: false,
        });
        socket.removeAllListeners('data');
        socket = upgraded;
        buf = '';
        lines.length = 0;
        upgraded.on('secureConnect', () => {});
        upgraded.on('data', (chunk) => {
          buf += chunk.toString('latin1');
          const parts = buf.split(/\r?\n/);
          buf = parts.pop() || '';
          for (const p of parts) {
            if (p.trim()) {
              lines.push(p.trim());
              const code2 = String(p.trim().slice(0, 3));
              const cont = p.length > 3 && p[3] === '-';
              if (cont) continue;
              afterUpgrade(code2, p);
            }
          }
        });
        // rebind handler state
        step = 3;
      } else if (step === 3) {
        send(Buffer.from(ENV.SMTP_USER).toString('base64'));
        step = 4;
      } else if (step === 4) {
        send(Buffer.from(ENV.SMTP_PASS).toString('base64'));
        step = 5;
      } else if (step === 5) {
        send('MAIL FROM:<' + ENV.SMTP_USER + '>');
        step = 6;
      } else if (step === 6) {
        send('RCPT TO:<' + to + '>');
        step = 7;
      } else if (step === 7) {
        send('DATA');
        step = 8;
      } else if (step === 8) {
        const boundary = '----=_fmp_' + crypto.randomBytes(8).toString('hex');
        const headers =
          'Date: ' + new Date().toUTCString() + '\r\n' +
          'To: <' + to + '>\r\n' +
          'From: <' + ENV.SMTP_USER + '>\r\n' +
          'Subject: ' + subject + '\r\n' +
          'MIME-Version: 1.0\r\n' +
          'Content-Type: multipart/alternative; boundary="' + boundary + '"\r\n\r\n' +
          '--' + boundary + '\r\n' +
          'Content-Type: text/plain; charset=UTF-8\r\n\r\n' + text + '\r\n' +
          '--' + boundary + '\r\n' +
          'Content-Type: text/html; charset=UTF-8\r\n\r\n' + (html || '<p>' + text.replace(/</g, '&lt;').replace(/\n/g, '<br>') + '</p>') + '\r\n' +
          '--' + boundary + '--\r\n.\r\n';
        mail = headers;
        send(mail);
        step = 9;
        farewell = true;
      } else if (step === 9) {
        send('QUIT');
        step = 10;
      } else if (step === 10) {
        socket.end();
        resolve({ ok: true, configured: true });
      }
    }
    function afterUpgrade(code, line) {
      if (step === 3) {
        send('AUTH LOGIN');
        step = 4;
      } else if (step === 4) {
        send(Buffer.from(ENV.SMTP_USER).toString('base64'));
        step = 5;
      } else if (step === 5) {
        send(Buffer.from(ENV.SMTP_PASS).toString('base64'));
        step = 6;
      } else if (step === 6) {
        send('MAIL FROM:<' + ENV.SMTP_USER + '>');
        step = 7;
      } else if (step === 7) {
        send('RCPT TO:<' + to + '>');
        step = 8;
      } else if (step === 8) {
        send('DATA');
        step = 9;
      } else if (step === 9) {
        const headers =
          'Date: ' + new Date().toUTCString() + '\r\n' +
          'To: <' + to + '>\r\n' +
          'From: <' + ENV.SMTP_USER + '>\r\n' +
          'Subject: ' + subject + '\r\n' +
          'MIME-Version: 1.0\r\n' +
          'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
          text + '\r\n.\r\n';
        send(headers);
        step = 10;
      } else if (step === 10) {
        send('QUIT');
        step = 11;
      } else if (step === 11) {
        socket.end();
        resolve({ ok: true, configured: true });
      }
    }

    function fail(err) {
      try {
        socket.destroy();
      } catch (e) {}
      reject(err);
    }
    socket.on('error', (err) => {
      try {
        socket.destroy();
      } catch (e) {}
      reject(err);
    });
    setTimeout(() => {
      try {
        socket.destroy();
      } catch (e) {}
      reject(new Error('SMTP timeout'));
    }, 15000);
  });
}

function issueOtp(conn) {
  const d = store.load();
  const otp = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
  const salt = crypto.randomBytes(8).toString('hex');
  d.pendingOtp = {
    hash: sha256(salt + otp + salt),
    salt,
    created: Date.now(),
    expires: Date.now() + ENV.OTP_TTL_MS,
    attempts: 0,
    consumed: false,
  };
  store.save();
  log(conn, 'otp_issued', 'admin', 'OTP sent to ' + (ENV.ADMIN_EMAIL || '(no email configured)'));
  return { otp, salt };
}

function beginLogin(conn) {
  const d = store.load();
  const loginToken = randomToken(32);
  const salt = crypto.randomBytes(8).toString('hex');
  d.pendingLogin = {
    tokenHash: sha256(salt + loginToken + salt),
    salt,
    created: Date.now(),
    expires: Date.now() + ENV.OTP_TTL_MS,
  };
  store.save();
  return loginToken;
}

function validLoginToken(token) {
  const d = store.load();
  const p = d.pendingLogin;
  if (!p || !token) return false;
  const h = sha256(p.salt + token + p.salt);
  const a = Buffer.from(h, 'hex');
  const b = Buffer.from(p.tokenHash, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b) && Date.now() < p.expires;
}

function createSession(conn) {
  const d = store.load();
  const token = randomToken(32);
  const salt = crypto.randomBytes(8).toString('hex');
  d.sessions[sha256(salt + token + salt)] = {
    salt,
    created: Date.now(),
    expires: Date.now() + ENV.SESSION_TTL_MS,
  };
  // prune expired
  for (const k of Object.keys(d.sessions)) {
    if (d.sessions[k].expires < Date.now()) delete d.sessions[k];
  }
  store.save();
  return { token, expires: d.sessions[sha256(salt + token + salt)].expires };
}

function authFrom(req, conn) {
  const d = store.load();
  const header = (req.headers.authorization || '').trim();
  if (!header.startsWith('Bearer ')) return null;
  const token = header.slice(7);
  for (const k of Object.keys(d.sessions)) {
    const s = d.sessions[k];
    const h = sha256(s.salt + token + s.salt);
    const a = Buffer.from(h, 'hex');
    const b = Buffer.from(k, 'hex');
    if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
      if (Date.now() > s.expires) {
        delete d.sessions[k];
        store.save();
        return null;
      }
      return true;
    }
  }
  return null;
}

function revokeSession(req) {
  const d = store.load();
  const header = (req.headers.authorization || '').trim();
  if (!header.startsWith('Bearer ')) return;
  const token = header.slice(7);
  for (const k of Object.keys(d.sessions)) {
    const s = d.sessions[k];
    const h = sha256(s.salt + token + s.salt);
    if (h === k) {
      delete d.sessions[k];
      store.save();
      return;
    }
  }
}

function json(data, status, res) {
  const body = JSON.stringify(data);
  res.writeHead(status || 200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function clientIp(req) {
  return (
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown'
  );
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (c) => {
      body += c;
      if (body.length > 2 * 1024 * 1024) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        console.error('[readBody] parse error, raw=' + JSON.stringify(body.slice(0, 120)));
        resolve({ _parseError: true });
      }
    });
    req.on('error', () => resolve({}));
  });
}

function withCors(req, res) {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return true;
  }
  return false;
}

function publicSettings(d) {
  const s = d.settings || DEFAULT_SETTINGS;
  return {
    siteName: s.siteName,
    tagline: s.tagline,
    contactEmail: s.contactEmail,
    accent: s.accent,
    tools: s.tools,
    integrations: s.integrations,
    seoDefaults: s.seoDefaults,
    phone: s.phone || '',
    logo: s.logo || '',
    social: s.social || {},
    homeSEO: s.homeSEO || null,
  };
}

function cleanPost(post, createdAt, updatedAt) {
  return {
    slug: String(post.slug || '').slice(0, 80),
    title: String(post.title || '').slice(0, 200),
    excerpt: String(post.excerpt || '').slice(0, 400),
    category: String(post.category || 'Guide').slice(0, 80),
    content: String(post.content || '').slice(0, 100000),
    metaTitle: String(post.metaTitle || post.title || '').slice(0, 200),
    metaDescription: String(post.metaDescription || '').slice(0, 320),
    featuredImage: String(post.featuredImage || '').slice(0, 500),
    author: String(post.author || '').slice(0, 80),
    tags: Array.isArray(post.tags) ? post.tags.map((t) => String(t).trim()).filter(Boolean).slice(0, 20) : [],
    faq: Array.isArray(post.faq)
      ? post.faq.slice(0, 30).map((f) => ({
          q: String(f?.q || '').slice(0, 300),
          a: String(f?.a || '').slice(0, 2000),
        }))
      : [],
    status: post.status === 'published' ? 'published' : 'draft',
    createdAt: createdAt || post.createdAt || Date.now(),
    updatedAt: updatedAt || post.updatedAt || Date.now(),
    publishedAt: post.publishedAt || (post.status === 'published' ? Date.now() : 0),
  };
}

function statsView(d) {
  const s = d.stats;
  const today = s.days[todayKey()] || 0;
  const month = s.months[monthKey()] || 0;
  return {
    today,
    month,
    total: s.total || 0,
    bySize: s.bySize || {},
  };
}

const server = http.createServer(async (req, res) => {
  if (withCors(req, res)) return;
  const conn = { ip: clientIp(req) };
  const u = new URL(req.url || '/', 'http://localhost');
  const p = u.pathname;

  const ROUTES = ['/api/health', '/api/auth', '/api/stats', '/api/settings', '/api/pages', '/api/activity', '/api/posts'];
  if (req.method !== 'OPTIONS' && !ROUTES.some((r) => p.startsWith(r))) {
    return json({ error: 'not found' }, 404, res);
  }

  if (p === '/api/health') {
    const d = store.load();
    const backend = dbBackend();
    return json({ ok: true, db: backend.isSupabase ? 'supabase/postgres' : DB_FILE, activity: d.activity.length }, 200, res);
  }

  if (p === '/api/auth/login') {
    const d = store.load();
    const body = await readBody(req);
    if (body._parseError) return json({ error: 'bad json' }, 400, res);
    if (d.rate.lockUntil > Date.now()) {
      return json(
        { error: 'locked', retryAfterMs: d.rate.lockUntil - Date.now() },
        429,
        res
      );
    }
    const ok = verifyHash(String(body.password || ''), d.adminPassword);
    if (!ok) {
      d.rate.fails = (d.rate.fails || 0) + 1;
      if (d.rate.fails >= ENV.RATE_MAX) {
        d.rate.lockUntil = Date.now() + ENV.LOCK_MS;
        d.activity.unshift({
          ts: Date.now(),
          action: 'account_locked',
          actor: 'admin',
          detail: 'Locked for ' + (ENV.LOCK_MS / 60000) + ' min after ' + ENV.RATE_MAX + ' failed attempts',
          ip: conn.ip,
        });
        store.save();
        return json(
          { error: 'locked', retryAfterMs: ENV.LOCK_MS },
          429,
          res
        );
      }
      store.save();
      log(conn, 'login_failed', 'admin', 'Wrong password (attempt ' + d.rate.fails + ')');
      return json(
        { error: 'wrong_password', attemptsLeft: ENV.RATE_MAX - d.rate.fails },
        401,
        res
      );
    }
    d.rate.fails = 0;
    store.save();
    log(conn, 'login_password_ok', 'admin', 'Password accepted');

    const otpEnabled = (d.settings.otpEnabled !== undefined ? d.settings.otpEnabled : true) && true;
    const loginToken = beginLogin(conn);
    if (!otpEnabled) {
      const ses = createSession(conn);
      log(conn, 'login_ok', 'admin', '2FA disabled — session issued');
      return json({ ok: true, token: ses.token, expires: ses.expires, otpEnabled: false }, 200, res);
    }
    const issued = issueOtp(conn);
    let sendResult = { ok: false, configured: false };
    if (ENV.ADMIN_EMAIL && ENV.SMTP_HOST && ENV.SMTP_USER) {
      try {
        sendResult = await sendEmail(
          ENV.ADMIN_EMAIL,
          'FitMyPhotoA4 — Login OTP',
          'Your One Time Password (OTP) is: ' + issued.otp + '\nIt is valid for 10 minutes.\nIf you did not request this, ignore this email.',
          null
        );
      } catch (e) {
        console.error('OTP email send failed:', e.message);
        sendResult = { ok: false, configured: true, error: e.message };
      }
    }
    const debugOtp = !sendResult.ok ? issued.otp : undefined;
    if (debugOtp) console.error('SMTP not configured/failed — OTP for testing: ' + debugOtp);
    return json(
      {
        ok: true,
        needOtp: true,
        loginToken,
        email: ENV.ADMIN_EMAIL ? maskEmail(ENV.ADMIN_EMAIL) : null,
        smtpConfigured: !!ENV.SMTP_HOST && !!ENV.SMTP_USER,
        otpDebug: debugOtp !== undefined ? debugOtp : undefined,
      },
      200,
      res
    );
  }

  if (p === '/api/auth/otp/resend') {
    const d = store.load();
    const body = await readBody(req);
    if (body._parseError) return json({ error: 'bad json' }, 400, res);
    if (!validLoginToken(String(body.loginToken || ''))) {
      return json({ error: 'invalid_login_token' }, 401, res);
    }
    const ip = conn.ip;
    const last = d.otpResendByIp[ip] || 0;
    if (Date.now() - last < ENV.RESEND_COOLDOWN_MS) {
      return json({ error: 'resend_cooldown', retryAfterMs: ENV.RESEND_COOLDOWN_MS - (Date.now() - last) }, 429, res);
    }
    d.otpResendByIp[ip] = Date.now();
    const issued = issueOtp(conn);
    let sendResult = { ok: false, configured: false };
    if (ENV.ADMIN_EMAIL && ENV.SMTP_HOST && ENV.SMTP_USER) {
      try {
        sendResult = await sendEmail(
          ENV.ADMIN_EMAIL,
          'FitMyPhotoA4 — New Login OTP',
          'Your new One Time Password (OTP) is: ' + issued.otp + '\nValid for 10 minutes.',
          null
        );
      } catch (e) {
        sendResult = { ok: false, configured: true, error: e.message };
      }
    }
    const debugOtp = !sendResult.ok ? issued.otp : undefined;
    return json({ ok: true, otpDebug: debugOtp }, 200, res);
  }

  if (p === '/api/auth/verify') {
    const d = store.load();
    const body = await readBody(req);
    if (body._parseError) return json({ error: 'bad json' }, 400, res);
    if (!validLoginToken(String(body.loginToken || ''))) {
      return json({ error: 'invalid_login_token' }, 401, res);
    }
    const o = d.pendingOtp;
    if (!o || !String(body.otp || '')) {
      return json({ error: 'invalid_otp' }, 401, res);
    }
    if (o.consumed || Date.now() > o.expires) {
      return json({ error: 'otp_expired' }, 401, res);
    }
    o.attempts = (o.attempts || 0) + 1;
    if (o.attempts > ENV.OTP_MAX_ATTEMPTS) {
      d.pendingOtp.consumed = true;
      d.pendingLogin = null;
      store.save();
      log(conn, 'otp_failed_locked', 'admin', 'Too many OTP attempts');
      return json({ error: 'otp_locked' }, 401, res);
    }
    const h = sha256(o.salt + String(body.otp) + o.salt);
    const a = Buffer.from(h, 'hex');
    const b = Buffer.from(o.hash, 'hex');
    const match = a.length === b.length && crypto.timingSafeEqual(a, b);
    if (!match) {
      store.save();
      log(conn, 'otp_wrong', 'admin', 'Wrong OTP attempt ' + o.attempts);
      return json({ error: 'invalid_otp', attemptsLeft: ENV.OTP_MAX_ATTEMPTS - o.attempts }, 401, res);
    }
    o.consumed = true;
    d.pendingLogin = null;
    const ses = createSession(conn);
    store.save();
    log(conn, 'login_ok', 'admin', '2FA verified — session issued');
    return json({ ok: true, token: ses.token, expires: ses.expires, otpEnabled: true }, 200, res);
  }

  if (p === '/api/auth/me') {
    if (!authFrom(req, conn)) return json({ error: 'unauthorized' }, 401, res);
    return json({ ok: true, admin: true }, 200, res);
  }

  if (p === '/api/auth/logout') {
    revokeSession(req);
    log(conn, 'logout', 'admin', 'session revoked');
    return json({ ok: true }, 200, res);
  }

  if (p === '/api/stats' && req.method === 'GET') {
    return json(statsView(store.load()), 200, res);
  }

  if (p === '/api/stats/usage' && req.method === 'POST') {
    const d = store.load();
    const body = await readBody(req);
    const size = String(body.size || 'custom').slice(0, 40);
    d.stats.total = (d.stats.total || 0) + 1;
    d.stats.bySize[size] = (d.stats.bySize[size] || 0) + 1;
    d.stats.days[todayKey()] = (d.stats.days[todayKey()] || 0) + 1;
    d.stats.months[monthKey()] = (d.stats.months[monthKey()] || 0) + 1;
    store.save();
    return json(statsView(d), 200, res);
  }

  if (p === '/api/settings' && req.method === 'GET') {
    return json({ settings: publicSettings(store.load()) }, 200, res);
  }

  if (p === '/api/settings' && req.method === 'POST') {
    if (!authFrom(req, conn)) return json({ error: 'unauthorized' }, 401, res);
    const d = store.load();
    const body = await readBody(req);
    if (body._parseError) return json({ error: 'bad json' }, 400, res);
    const patch = body.settings || body;
    const s = d.settings;
    if (typeof patch.siteName === 'string') s.siteName = patch.siteName.slice(0, 80);
    if (typeof patch.tagline === 'string') s.tagline = patch.tagline.slice(0, 160);
    if (typeof patch.contactEmail === 'string') s.contactEmail = patch.contactEmail.slice(0, 120);
    if (typeof patch.phone === 'string') s.phone = patch.phone.slice(0, 40);
    if (typeof patch.logo === 'string') s.logo = patch.logo.slice(0, 1200);
    if (typeof patch.accent === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(patch.accent)) s.accent = patch.accent;
    if (typeof patch.otpEnabled === 'boolean') s.otpEnabled = patch.otpEnabled;
    if (patch.homeSEO && typeof patch.homeSEO === 'object') s.homeSEO = Object.assign({}, s.homeSEO, patch.homeSEO);
    if (patch.social && typeof patch.social === 'object') s.social = Object.assign({}, s.social, patch.social);
    if (patch.seoDefaults && typeof patch.seoDefaults === 'object') {
      s.seoDefaults = Object.assign({}, s.seoDefaults, patch.seoDefaults);
    }
    if (patch.integrations && typeof patch.integrations === 'object') {
      s.integrations = Object.assign({}, s.integrations, patch.integrations);
    }
    if (patch.tools && typeof patch.tools === 'object') {
      s.tools = Object.assign({}, s.tools, patch.tools);
    }
    store.save();
    log(conn, 'settings_updated', 'admin', Object.keys(patch).join(', '));
    return json({ ok: true, settings: publicSettings(d) }, 200, res);
  }

  if (p === '/api/settings/password' && req.method === 'POST') {
    if (!authFrom(req, conn)) return json({ error: 'unauthorized' }, 401, res);
    const d = store.load();
    const body = await readBody(req);
    if (body._parseError) return json({ error: 'bad json' }, 400, res);
    const current = String(body.current || '');
    const next = String(body.next || '');
    if (next.length < 8 || next.length > 128) {
      return json({ error: 'password_too_short' }, 400, res);
    }
    if (!verifyHash(current, d.adminPassword)) {
      log(conn, 'password_change_failed', 'admin', 'wrong current password');
      return json({ error: 'wrong_current' }, 401, res);
    }
    d.adminPassword = makeHash(next);
    store.save();
    log(conn, 'password_changed', 'admin', 'admin password rotated (hashed with scrypt)');
    return json({ ok: true }, 200, res);
  }

  if (p === '/api/activity' && req.method === 'GET') {
    if (!authFrom(req, conn)) return json({ error: 'unauthorized' }, 401, res);
    return json({ activity: store.load().activity.slice(0, 300) }, 200, res);
  }

  if (p === '/api/pages' && req.method === 'GET') {
    const d = store.load();
    return json({ overrides: d.pageOverrides, aliases: d.pageAliases }, 200, res);
  }

  if (p === '/api/pages' && req.method === 'POST') {
    if (!authFrom(req, conn)) return json({ error: 'unauthorized' }, 401, res);
    const d = store.load();
    const body = await readBody(req);
    if (body._parseError) return json({ error: 'bad json' }, 400, res);
    const slug = String(body.slug || '').replace(/^\/+|\/+$/g, '').toLowerCase();
    if (!/^[a-z0-9-]+$/.test(slug)) return json({ error: 'bad_slug' }, 400, res);
    const existing = d.pageOverrides[slug] || {};
    const patch = body.patch || body;
    const name = 'overrides';
    if (typeof patch.metaTitle === 'string') existing.metaTitle = patch.metaTitle.slice(0, 200);
    if (typeof patch.metaDescription === 'string') existing.metaDescription = patch.metaDescription.slice(0, 320);
    if (typeof patch.h1 === 'string') existing.h1 = patch.h1.slice(0, 200);
    if (typeof patch.content === 'string') existing.content = patch.content;
    if (typeof patch.enabled === 'boolean') existing.enabled = patch.enabled;
    d.pageOverrides[slug] = existing;
    store.save();
    log(conn, 'page_updated', 'admin', 'slug: /' + slug);
    return json({ ok: true, overrides: d.pageOverrides }, 200, res);
  }

  const pageSlugMatch = p.match(/^\/api\/pages\/([^/]+)\/?$/);
  if (pageSlugMatch && req.method === 'PUT') {
    if (!authFrom(req, conn)) return json({ error: 'unauthorized' }, 401, res);
    const d = store.load();
    const body = await readBody(req);
    if (body._parseError) return json({ error: 'bad json' }, 400, res);
    const oldSlug = decodeURIComponent(pageSlugMatch[1]);
    const old = d.pageOverrides[oldSlug] || {};
    const newSlug = String(body.slug || oldSlug).replace(/^\/+|\/+$/g, '').toLowerCase();
    if (!/^[a-z0-9-]*$/.test(newSlug)) return json({ error: 'bad_slug' }, 400, res);
    if (newSlug && newSlug !== oldSlug) {
      delete d.pageOverrides[oldSlug];
      // keep old URL working via alias
      d.pageAliases[oldSlug] = newSlug;
      const merged = Object.assign({}, old, body.patch || body);
      delete merged.slug;
      d.pageOverrides[newSlug] = merged;
      store.save();
      log(conn, 'page_renamed', 'admin', oldSlug + ' -> ' + newSlug + ' (alias kept)');
      return json({ ok: true, overrides: d.pageOverrides, aliases: d.pageAliases }, 200, res);
    }
    for (const key of ['metaTitle', 'metaDescription', 'h1', 'content']) {
      if (typeof body[key] === 'string') old[key] = body[key].slice(0, key === 'content' ? 20000 : 320);
    }
    if (typeof body.enabled === 'boolean') old.enabled = body.enabled;
    d.pageOverrides[oldSlug] = old;
    store.save();
    log(conn, 'page_updated', 'admin', 'slug: /' + oldSlug);
    return json({ ok: true, overrides: d.pageOverrides }, 200, res);
  }

  if (pageSlugMatch && req.method === 'DELETE') {
    if (!authFrom(req, conn)) return json({ error: 'unauthorized' }, 401, res);
    const d = store.load();
    const slug = decodeURIComponent(pageSlugMatch[1]);
    delete d.pageOverrides[slug];
    for (const k of Object.keys(d.pageAliases)) {
      if (d.pageAliases[k] === slug) delete d.pageAliases[k];
    }
    store.save();
    log(conn, 'page_reset', 'admin', 'slug: /' + slug);
    return json({ ok: true }, 200, res);
  }

  if (p === '/api/posts' && req.method === 'GET') {
    const d = store.load();
    const admin = !!authFrom(req, conn);
    const posts = d.posts || {};
    const list = Object.values(posts).map((x) => x);
    if (!admin) {
      const out = list.filter((x) => x.status === 'published');
      out.sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
      return json({ posts: out }, 200, res);
    }
    list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    return json({ posts: list }, 200, res);
  }

  if (p === '/api/posts' && req.method === 'POST') {
    if (!authFrom(req, conn)) return json({ error: 'unauthorized' }, 401, res);
    const d = store.load();
    const body = await readBody(req);
    if (body._parseError) return json({ error: 'bad json' }, 400, res);
    const slug = String(body.slug || '').replace(/^\/+|\/+$/g, '').toLowerCase();
    if (!/^[a-z0-9-]+$/.test(slug)) return json({ error: 'bad_slug' }, 400, res);
    if (d.posts[slug]) return json({ error: 'slug_exists' }, 409, res);
    const now = Date.now();
    d.posts[slug] = cleanPost({
      slug,
      title: String(body.title || '').slice(0, 200),
      excerpt: String(body.excerpt || '').slice(0, 400),
      category: String(body.category || 'Guide').slice(0, 80),
      content: String(body.content || '').slice(0, 100000),
      metaTitle: String(body.metaTitle || body.title || '').slice(0, 200),
      metaDescription: String(body.metaDescription || '').slice(0, 320),
      featuredImage: String(body.featuredImage || '').slice(0, 500),
      status: body.status === 'published' ? 'published' : 'draft',
    }, now, now);
    store.save();
    log(conn, 'post_created', 'admin', 'blog: ' + slug + ' (' + d.posts[slug].status + ')');
    return json({ ok: true, posts: Object.values(d.posts) }, 200, res);
  }

  const postSlugMatch = p.match(/^\/api\/posts\/([^/]+)\/?$/);
  if (postSlugMatch && req.method === 'PUT') {
    if (!authFrom(req, conn)) return json({ error: 'unauthorized' }, 401, res);
    const d = store.load();
    const body = await readBody(req);
    if (body._parseError) return json({ error: 'bad json' }, 400, res);
    const oldSlug = decodeURIComponent(postSlugMatch[1]);
    const existing = d.posts[oldSlug];
    if (!existing) return json({ error: 'not_found' }, 404, res);
    let newSlug = oldSlug;
    if (typeof body.slug === 'string') {
      newSlug = body.slug.replace(/^\/+|\/+$/g, '').toLowerCase();
      if (!/^[a-z0-9-]+$/.test(newSlug)) return json({ error: 'bad_slug' }, 400, res);
      if (newSlug !== oldSlug && d.posts[newSlug]) return json({ error: 'slug_exists' }, 409, res);
    }
    const merged = Object.assign({}, existing, body);
    merged.slug = newSlug;
    merged.updatedAt = Date.now();
    if (body.status === 'published' && existing.status !== 'published') {
      merged.publishedAt = merged.publishedAt || Date.now();
    }
    delete d.posts[oldSlug];
    d.posts[newSlug] = cleanPost(merged, existing.createdAt || Date.now(), merged.updatedAt);
    store.save();
    log(conn, 'post_updated', 'admin', 'blog: ' + newSlug + ' (' + d.posts[newSlug].status + ')');
    return json({ ok: true, posts: Object.values(d.posts) }, 200, res);
  }

  if (postSlugMatch && req.method === 'DELETE') {
    if (!authFrom(req, conn)) return json({ error: 'unauthorized' }, 401, res);
    const d = store.load();
    const slug = decodeURIComponent(postSlugMatch[1]);
    if (!d.posts[slug]) return json({ error: 'not_found' }, 404, res);
    delete d.posts[slug];
    store.save();
    log(conn, 'post_deleted', 'admin', 'blog: ' + slug);
    return json({ ok: true }, 200, res);
  }

  if (p === '/api/data/export' && req.method === 'GET') {
    if (!authFrom(req, conn)) return json({ error: 'unauthorized' }, 401, res);
    const d = store.load();
    const copy = {
      version: d.version,
      activity: d.activity,
      stats: d.stats,
      settings: d.settings,
      pageOverrides: d.pageOverrides,
      pageAliases: d.pageAliases,
      posts: d.posts,
      exportedAt: new Date().toISOString(),
    };
    return json(copy, 200, res);
  }

  if (p === '/api/data/import' && req.method === 'POST') {
    if (!authFrom(req, conn)) return json({ error: 'unauthorized' }, 401, res);
    const d = store.load();
    const body = await readBody(req);
    if (body._parseError) return json({ error: 'bad json' }, 400, res);
    const src = body.data || {};
    if (src.settings && typeof src.settings === 'object') d.settings = Object.assign({}, DEFAULT_SETTINGS, src.settings);
    if (src.pageOverrides && typeof src.pageOverrides === 'object') d.pageOverrides = src.pageOverrides;
    if (src.pageAliases && typeof src.pageAliases === 'object') d.pageAliases = src.pageAliases;
    if (src.stats && typeof src.stats === 'object') d.stats = Object.assign({}, d.stats, src.stats);
    if (Array.isArray(src.activity)) d.activity = src.activity;
    if (src.posts && typeof src.posts === 'object') d.posts = src.posts;
    store.save();
    log(conn, 'data_imported', 'admin', 'restored backup');
    return json({ ok: true }, 200, res);
  }

  return json({ error: 'not found' }, 404, res);
});

store.init().then(() => {
  server.listen(PORT, '0.0.0.0', () => {
    const backend = dbBackend();
    console.log('[a4-api] listening on :' + PORT);
    console.log('[a4-api] storage: ' + (backend.isSupabase ? 'supabase/postgres' : 'file: ' + DB_FILE));
    console.log('[a4-api] smtp configured: ' + (!!ENV.SMTP_HOST && !!ENV.SMTP_USER));
    console.log('[a4-api] otp email: ' + (ENV.ADMIN_EMAIL || '(none — set ADMIN_EMAIL)'));
  });
}).catch((err) => {
  console.error('[a4-api] init failed:', err);
  process.exit(1);
});