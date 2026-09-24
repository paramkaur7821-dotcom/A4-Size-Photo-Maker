import { Component, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  LayoutDashboard,
  Newspaper,
  Settings,
  LogOut,
  LockKeyhole,
  Save,
  Plus,
  Trash2,
  ExternalLink,
  RefreshCcw,
  Palette,
  Mail,
  Eye,
  Check,
  ShieldCheck,
  Globe,
  PenLine,
  Boxes,
  BookOpenText,
  Clock,
  TrendingUp,
  KeyRound,
  Download,
  Upload,
  Activity,
  Image as ImageIcon,
  Phone,
  Share2,
  Link2,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { CITY_PAGES, CITY_LINKS, CITY_LABELS } from './cityContent';
import { BLOG_POSTS, BLOG_ARTICLE_PAGES, BLOG_INDEX_PAGE, ABOUT_PAGE, CONTACT_PAGE } from './blogContent';
import { ALL_SEO_PAGES } from './seoContent';
import {
  loadSettings,
  saveSettings as saveLocalSettings,
  loadLabels,
  saveLabel,
  loadDrafts,
  saveDrafts,
  readVisits,
  readVisitLog,
} from './adminConfig';
import {
  loginPassword,
  verifyOtp,
  resendOtp,
  me,
  logoutRemote,
  saveSettings as saveRemoteSettings,
  savePage,
  changePassword,
  savePost,
  createPost,
  deletePost,
  exportData,
  importData,
  getToken,
  clearToken,
  type RemoteSettings,
  type PageOverride,
  type ActivityEntry,
  type BlogPost as ApiBlogPost,
} from './lib/adminApi';
import { useAdminState, refresh, setRemoteState } from './adminStore';

type TabId = 'dashboard' | 'blog' | 'settings';

type ManagedPage = {
  key: string;
  kind: 'city' | 'seo' | 'blog' | 'app';
  title: string;
  desc: string;
};

const APP_PAGES_META: Record<string, { title: string; desc: string }> = {
  '/blog': { title: 'Photo size guides', desc: 'Photo size guides and print tutorials' },
  '/about-us': { title: 'About FitMyPhotoA4', desc: 'About the free A4 photo sheet maker' },
  '/contact-us': { title: 'Contact FitMyPhotoA4', desc: 'Get in touch with the team' },
};

function buildManagedPages(overrides: Record<string, PageOverride>, aliases: Record<string, string>): ManagedPage[] {
  const list: ManagedPage[] = [];
  const effectivePath = (key: string) => aliases[key] || key;
  for (const path of Object.keys(CITY_PAGES)) {
    const city = CITY_PAGES[path];
    const override = overrides[effectivePath(path)];
    list.push({
      key: path,
      kind: 'city',
      title: override?.h1 || city.heroTitle || city.name,
      desc: `${effectivePath(path)} · ${city.district}`,
    });
  }
  for (const path of Object.keys(ALL_SEO_PAGES)) {
    const page = ALL_SEO_PAGES[path];
    const override = overrides[effectivePath(path)];
    list.push({
      key: path,
      kind: 'seo',
      title: override?.h1 || page.title,
      desc: effectivePath(path),
    });
  }
  for (const path of Object.keys(BLOG_ARTICLE_PAGES)) {
    const page = BLOG_ARTICLE_PAGES[path];
    const override = overrides[effectivePath(path)];
    list.push({
      key: path,
      kind: 'blog',
      title: override?.h1 || page.title || path,
      desc: effectivePath(path),
    });
  }
  for (const path of ['/blog', '/about-us', '/contact-us']) {
    const meta = APP_PAGES_META[path];
    const sourceTitle = path === '/blog' ? BLOG_INDEX_PAGE.title : path === '/about-us' ? ABOUT_PAGE.title : CONTACT_PAGE.title;
    const override = overrides[effectivePath(path)];
    list.push({
      key: path,
      kind: 'app',
      title: override?.h1 || sourceTitle || meta.title,
      desc: effectivePath(path),
    });
  }
  return list;
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [step, setStep] = useState<'password' | 'otp'>('password');
  const [password, setPassword] = useState('');
  const [loginToken, setLoginToken] = useState('');
  const [otp, setOtp] = useState('');
  const [otpDebug, setOtpDebug] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((c) => Math.max(0, c - 1000)), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [cooldown]);

  const submitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const data = await loginPassword(password);
      if (data?.needOtp) {
        setLoginToken(data.loginToken);
        setOtpDebug(data.otpDebug || '');
        setStep('otp');
      }
    } catch (err: any) {
      const d = err?.data;
      if (d?.error === 'locked') {
        setError(`Too many attempts. Try again in ${Math.round((d.retryAfterMs || 900000) / 60000)} minutes.`);
      } else if (d?.error === 'wrong_password') {
        setError(`Wrong password — ${d.attemptsLeft ?? 0} attempts left.`);
      } else {
        setError('Could not reach the login server. Try again.');
      }
    } finally {
      setBusy(false);
    }
  };

  const submitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const data = await verifyOtp(loginToken, otp.trim());
      if (data?.token) {
        await refresh();
        onSuccess();
      } else if (data?.error) {
        setError(data.error === 'invalid_otp' ? `Wrong code — ${data.attemptsLeft ?? 0} attempts left.` : 'Code rejected.');
      }
    } catch (err: any) {
      const d = err?.data;
      setError(d?.error === 'invalid_otp' ? `Wrong code — ${d.attemptsLeft ?? 0} attempts left.` : 'Could not verify the code.');
    } finally {
      setBusy(false);
    }
  };

  const sendNewOtp = async () => {
    setError('');
    try {
      const data = await resendOtp(loginToken);
      if (data?.otpDebug) setOtpDebug(data.otpDebug);
      setCooldown(60);
    } catch (err: any) {
      if (err?.data?.error === 'resend_cooldown') {
        setCooldown(Math.ceil((err.data.retryAfterMs || 60000) / 1000));
      }
      setError('Could not resend yet.');
    }
  };

  return (
    <div className="admin admin-login">
      {step === 'password' ? (
        <form className="admin-login-card" onSubmit={submitPassword}>
          <div className="admin-login-lock"><LockKeyhole size={26} /></div>
          <h1>FitMyPhotoA4 Admin</h1>
          <p>Enter the admin password. Login is secured and rate-limited server-side.</p>
          <input className="admin-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" autoFocus />
          {error && <div className="admin-error">{error}</div>}
          <button className="admin-btn admin-btn-primary" type="submit" disabled={busy}>{busy ? 'Checking…' : 'Continue'}</button>
          <span className="admin-login-hint">5 wrong attempts lock the account for 15 minutes.</span>
        </form>
      ) : (
        <form className="admin-login-card" onSubmit={submitOtp}>
          <div className="admin-login-lock"><KeyRound size={26} /></div>
          <h1>Enter 2FA code</h1>
          <p>A 6-digit One Time Password was sent to your email.</p>
          <input className="admin-input admin-otp-input" type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="000000" autoFocus />
          {error && <div className="admin-error">{error}</div>}
          {otpDebug && (
            <div className="admin-otp-debug">
              <strong>SMTP not configured — test code:</strong> <code>{otpDebug}</code>
            </div>
          )}
          <button className="admin-btn admin-btn-primary" type="submit" disabled={busy}>{busy ? 'Verifying…' : 'Unlock panel'}</button>
          <div className="admin-login-actions">
            <button className="admin-btn admin-btn-small" type="button" onClick={sendNewOtp} disabled={cooldown > 0}>
              Resend code{cooldown > 0 ? ` (${cooldown}s)` : ''}
            </button>
            <button className="admin-btn admin-btn-small" type="button" onClick={() => setStep('password')}>Back</button>
          </div>
        </form>
      )}
    </div>
  );
}

function StatCard({ label, value, tone, icon }: { label: string; value: string | number; tone?: string; icon?: LucideIcon }) {
  const Icon = icon;
  return (
    <div className="admin-stat">
      <div className="admin-stat-top">
        <span>{label}</span>
        {Icon && <Icon size={15} style={{ color: tone ?? 'currentColor' }} />}
      </div>
      <strong style={tone ? { color: tone } : undefined}>{value}</strong>
    </div>
  );
}

function MapPin2({ size = 15, color }: { size?: string | number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const TOOL_KEYS: { key: 'passport' | 'pan' | 'voter' | 'stamp' | 'custom'; title: string; desc: string }[] = [
  { key: 'passport', title: 'Passport Photo Maker', desc: '35 × 45 mm passport-size sheet.' },
  { key: 'pan', title: 'PAN Card Photo Maker', desc: '25 × 35 mm PAN Card sheet.' },
  { key: 'voter', title: 'Voter ID Photo Maker', desc: '25 × 35 mm Voter ID sheet.' },
  { key: 'stamp', title: 'Stamp-size Photo', desc: '20 × 25 mm stamp-size sheet.' },
  { key: 'custom', title: 'Free A4 Sheet Maker', desc: 'Any custom size on one A4 PDF.' },
];

function ToolsCard() {
  const store = useAdminState();
  const token = getToken();
  const [busy, setBusy] = useState('');
  const tools = { ...{ passport: true, pan: true, voter: true, stamp: true, custom: true }, ...(store.settings.tools || {}) };
  const total = Object.values(tools).filter(Boolean).length;

  const toggle = async (key: 'passport' | 'pan' | 'voter' | 'stamp' | 'custom') => {
    if (!token) return;
    setBusy(key);
    try {
      const next = { ...tools, [key]: !tools[key] };
      const settings = await saveRemoteSettings({ tools: next }, token);
      setRemoteState({ settings });
    } catch {
      /* ignore */
    } finally {
      setBusy('');
    }
  };

  return (
    <div className="admin-list">
      {TOOL_KEYS.map((t) => (
        <div className="admin-list-row" key={t.key}>
          <div>
            <strong>{t.title}</strong>
            <span className="admin-muted">{t.desc}</span>
          </div>
          <label className="admin-switch">
            <input type="checkbox" checked={!!tools[t.key]} onChange={() => toggle(t.key)} disabled={busy === t.key} />
            <span className="admin-switch-track" aria-hidden="true" />
          </label>
        </div>
      ))}
    </div>
  );
}

function Dashboard({ go }: { go: (tab: TabId) => void }) {
  const store = useAdminState();
  const log = readVisitLog();
  const todayVisits = log.filter((l) => Date.now() - l.ts < 86400000).length;
  const sizeEntries = Object.entries(store.stats.bySize || {}).sort((a, b) => b[1] - a[1]);
  const recent = store.activity.slice(0, 8);
  const hasGa = !!(store.settings.integrations?.gaId);
  const activeTools = { ...{ passport: true, pan: true, voter: true, stamp: true, custom: true }, ...(store.settings.tools || {}) };
  const total = Object.values(activeTools).filter(Boolean).length;

  const counts: Record<string, number> = {};
  for (const l of log) counts[l.path] = (counts[l.path] || 0) + 1;
  const topRoutes = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxRoute = Math.max(1, ...topRoutes.map((t) => t[1]));

  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <div className="admin-kicker">Overview</div>
          <h1 className="admin-page-title">Dashboard</h1>
        </div>
        <div>
          <button className="admin-btn admin-btn-small" onClick={refresh}><RefreshCcw size={13} /> Refresh</button>
          {!store.apiOn && <span className="admin-chip">Offline — cached data</span>}
        </div>
      </div>

      <div className="admin-stats">
        <StatCard label="Sheets today" value={store.stats.today} tone="#0ca678" icon={TrendingUp} />
        <StatCard label="This month" value={store.stats.month} tone="#7c5cff" icon={Clock} />
        <StatCard label="All time" value={store.stats.total} tone="#e8590c" icon={BarChart3} />
        <StatCard label="Visits today" value={todayVisits} tone="#0c8599" icon={Clock} />
      </div>

      <div className="admin-settings-grid" style={{ alignItems: 'start' }}>
        <div className="admin-card">
          <div className="admin-card-head">
            <h2 style={{ margin: 0 }}>Generated sheets by size</h2>
          </div>
          {sizeEntries.length === 0 ? (
            <p className="admin-muted" style={{ marginTop: 12 }}>No sheets generated yet — share the site!</p>
          ) : (
            <div className="admin-bars" style={{ marginTop: 14 }}>
              {sizeEntries.slice(0, 8).map(([size, n]) => (
                <div className="admin-bars-row" key={size}>
                  <span className="admin-bars-label">{size}</span>
                  <span className="admin-bars-track">
                    <span className="admin-bars-fill" style={{ width: `${Math.max(6, (n / Math.max(1, sizeEntries[0][1])) * 100)}%` }} />
                  </span>
                  <span className="admin-bars-count">{n}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            <h2 style={{ margin: 0 }}>Traffic summary</h2>
            {hasGa ? <span className="admin-chip" style={{ background: 'hsl(145 65% 90%)', color: 'hsl(152 69% 25%)' }}><Globe size={12} /> GA linked</span> : null}
          </div>
          {hasGa ? (
            <div className="admin-success" style={{ marginTop: 12 }}>
              Google Analytics is connected (<code>{store.settings.integrations?.gaId}</code>). Live traffic reports appear in the GA dashboard.
            </div>
          ) : (
            <>
              <p className="admin-muted" style={{ marginTop: 10 }}>
                No Google Analytics code yet. Adding one in Settings unlocks live traffic — for now this is the on-site visit log:
              </p>
              <div className="admin-bars" style={{ marginTop: 12 }}>
                {topRoutes.length === 0 && <p className="admin-muted">No visits recorded on this browser yet.</p>}
                {topRoutes.map(([path, n]) => (
                  <div className="admin-bars-row" key={path}>
                    <span className="admin-bars-label">{path === '/' ? 'Home / Maker' : path}</span>
                    <span className="admin-bars-track">
                      <span className="admin-bars-fill" style={{ width: `${Math.max(6, (n / maxRoute) * 100)}%` }} />
                    </span>
                    <span className="admin-bars-count">{n}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="admin-settings-grid" style={{ alignItems: 'start' }}>
        <div className="admin-card">
          <div className="admin-card-head">
            <h2 style={{ margin: 0 }}>Recent admin activity</h2>
            <span className="admin-chip"><Activity size={12} /> server-side</span>
          </div>
          {recent.length === 0 ? (
            <p className="admin-muted" style={{ marginTop: 12 }}>No activity recorded yet.</p>
          ) : (
            <div className="admin-list" style={{ marginTop: 12 }}>
              {recent.map((a, i) => (
                <div className="admin-list-row" key={a.ts + '-' + i}>
                  <div>
                    <strong>{a.action.replace(/_/g, ' ')}</strong>
                    <span className="admin-muted">{a.detail} · {new Date(a.ts).toLocaleString()}</span>
                  </div>
                  <span className="admin-badge ok">{a.actor}</span>
                </div>
              ))}
            </div>
          )}
          {recent.length >= 8 && (
            <button className="admin-btn admin-btn-small" style={{ marginTop: 12 }} onClick={() => go('settings')}>View full activity log →</button>
          )}
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            <h2 style={{ margin: 0 }}>Photo tools on/off</h2>
            <span className="admin-chip"><Boxes size={12} /> {total}/{TOOL_KEYS.length} on</span>
          </div>
          <div style={{ marginTop: 12 }}>
            <ToolsCard />
          </div>
        </div>
      </div>
    </div>
  );
}

type PostDraft = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
  tags: string;
  faq: { q: string; a: string }[];
  status: 'draft' | 'published';
};

const EMPTY_POST: PostDraft = {
  slug: '',
  title: '',
  excerpt: '',
  category: 'Guide',
  author: '',
  content: '',
  metaTitle: '',
  metaDescription: '',
  featuredImage: '',
  tags: '',
  faq: [],
  status: 'draft',
};

function BlogEditor({ editing, post, onSaved, onCancelled }: { editing: boolean; post: PostDraft; onSaved: (p: PostDraft) => Promise<void> | void; onCancelled: () => void }) {
  const [fields, setFields] = useState<PostDraft>(post);
  const [busy, setBusy] = useState(''); 
  const [message, setMessage] = useState('');
  const [msgTone, setMsgTone] = useState<'ok' | 'err'>('ok');

  const set = (key: keyof PostDraft, value: string) => {
    setFields((f) => {
      const next = { ...f, [key]: value } as PostDraft;
      if (key === 'title') {
        const base = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
        if (!f.slug || f.slug === slugify(f.title)) next.slug = base;
      }
      if (key === 'metaTitle' && !value) next.metaTitle = value;
      return next;
    });
  };

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

  const addFaq = () => setFields((f) => ({ ...f, faq: [...f.faq, { q: '', a: '' }] }));
  const setFaq = (i: number, key: 'q' | 'a', value: string) =>
    setFields((f) => ({ ...f, faq: f.faq.map((x, xi) => (xi === i ? { ...x, [key]: value } : x)) }));
  const removeFaq = (i: number) => setFields((f) => ({ ...f, faq: f.faq.filter((_, xi) => xi !== i) }));

  const save = async (status: 'draft' | 'published') => {
    if (!fields.title.trim() || !fields.slug.trim()) {
      setMsgTone('err');
      setMessage('Title and URL slug are required.');
      return;
    }
    const patch: PostDraft = { ...fields, status };
    setBusy(status);
    setMessage('');
    try {
      await onSaved(patch);
      setMsgTone('ok');
      setMessage('Saved.');
    } catch (err: any) {
      setMsgTone('err');
      setMessage(err?.data?.error === 'slug_exists' ? 'That slug already exists — choose another one.' : 'Save failed. Check you are logged in.');
    } finally {
      setBusy('');
    }
  };

  return (
    <form className="admin-form admin-blog-editor" onSubmit={(e) => { e.preventDefault(); save(fields.status); }}>
      <div className="admin-blog-editor-main">
        <label>Title<input className="admin-input" value={fields.title} onChange={(e) => set('title', e.target.value)} placeholder="Passport size photo for bank forms" /></label>
        <label>URL slug<input className="admin-input" value={fields.slug} onChange={(e) => set('slug', slugify(e.target.value))} placeholder="passport-size-photo-bank-forms" /></label>
        <label>
          Content <span className="admin-muted">(write HTML — &lt;h2&gt;…&lt;/h2&gt; &lt;p&gt;…&lt;/p&gt;)</span>
          <textarea className="admin-input admin-textarea" value={fields.content} onChange={(e) => set('content', e.target.value)} rows={14} placeholder={'<h2>Heading</h2>\n<p>Body text…</p>'} />
        </label>
        <label>Excerpt / short description<textarea className="admin-input admin-textarea" value={fields.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={3} placeholder="One-line summary shown on the blog card" /></label>
      </div>

      <div className="admin-blog-editor-side">
        <div className="admin-blog-editor-actions">
          <button className="admin-btn" type="button" disabled={!!busy} onClick={() => save('draft')}><Save size={14} /> {busy === 'draft' ? 'Saving…' : 'Save draft'}</button>
          <button className="admin-btn admin-btn-primary" type="button" disabled={!!busy} onClick={() => save('published')}><Check size={14} /> {busy === 'published' ? 'Saving…' : 'Publish'}</button>
        </div>
        <label>Category<input className="admin-input" value={fields.category} onChange={(e) => set('category', e.target.value)} placeholder="Guide / Passport guide / News" /></label>
        <label>Author<input className="admin-input" value={fields.author} onChange={(e) => set('author', e.target.value)} placeholder="Author name" /></label>
        <label>
          Cover image
          <div className="admin-logo-picker">
            {fields.featuredImage ? <img src={fields.featuredImage} alt="cover preview" className="admin-logo-thumb" style={{ height: 90, width: 120, objectFit: 'cover' }} /> : <ImageIcon size={18} />}
            <input className="admin-input" value={fields.featuredImage} onChange={(e) => set('featuredImage', e.target.value)} placeholder="https://…/cover.jpg" />
          </div>
        </label>
        <label>Tags<input className="admin-input" value={fields.tags} onChange={(e) => set('tags', e.target.value)} placeholder="passport, photo, guides (comma separated)" /></label>

        <div className="admin-card admin-blog-faq">
          <div className="admin-card-head">
            <h2 style={{ margin: 0, fontSize: 15 }}>FAQ</h2>
            <button className="admin-btn admin-btn-small" type="button" onClick={addFaq}><Plus size={13} /> Add</button>
          </div>
          {fields.faq.length === 0 && <p className="admin-muted">Add question & answer pairs (optional).</p>}
          {fields.faq.map((f, i) => (
            <div key={i} className="admin-faq-row">
              <div className="admin-form-grid">
                <input className="admin-input" value={f.q} onChange={(e) => setFaq(i, 'q', e.target.value)} placeholder="Question" />
                <button className="admin-btn admin-btn-danger admin-btn-small" type="button" onClick={() => removeFaq(i)}><Trash2 size={13} /></button>
              </div>
              <textarea className="admin-input admin-textarea" value={f.a} onChange={(e) => setFaq(i, 'a', e.target.value)} rows={2} placeholder="Answer" />
            </div>
          ))}
        </div>

        <div className="admin-card admin-blog-faq">
          <div className="admin-card-head">
            <h2 style={{ margin: 0, fontSize: 15 }}>SEO overview</h2>
            <Eye size={14} />
          </div>
          <label>Meta title<input className="admin-input" value={fields.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} placeholder="Leave empty to use the title" /></label>
          <label>Meta description<textarea className="admin-input admin-textarea" value={fields.metaDescription} onChange={(e) => set('metaDescription', e.target.value)} rows={3} placeholder="150–160 character search snippet" /></label>
        </div>

        <div className="admin-blog-editor-actions">
          {editing && <button className="admin-btn" type="button" onClick={onCancelled}><RefreshCcw size={13} /> Cancel</button>}
        </div>
      </div>

      {message && <div className={msgTone === 'ok' ? 'admin-success' : 'admin-error'} style={{ gridColumn: '1 / -1' }}>{message}</div>}
    </form>
  );
}

function BlogTab() {
  const store = useAdminState();
  const token = getToken();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<PostDraft | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [confirmDelete, setConfirmDelete] = useState('');

  const apiPosts = store.posts || [];
  const drafts = apiPosts.filter((p) => p.status === 'draft');
  const published = apiPosts.filter((p) => p.status === 'published');
  const visible = statusFilter === 'all' ? apiPosts : apiPosts.filter((p) => p.status === statusFilter);

  const applyPosts = (posts: ApiBlogPost[]) => setRemoteState({ posts });

  const saveLocalDraft = (p: PostDraft) => {
    const d = loadDrafts();
    const existing = [...d].find((x) => x.slug === p.slug);
    const item = { id: existing?.id || String(Date.now()), title: p.title, slug: p.slug, excerpt: p.excerpt, body: p.content, createdAt: existing?.createdAt || new Date().toISOString() };
    const next = existing ? d.map((x) => (x.slug === p.slug ? item : x)) : [item, ...d];
    saveDrafts(next);
  };

  const persist = async (p: PostDraft) => {
    const patch = {
      title: p.title.trim(),
      slug: p.slug,
      excerpt: p.excerpt.trim(),
      category: p.category.trim() || 'Guide',
      author: p.author.trim(),
      content: p.content,
      metaTitle: p.metaTitle.trim() || p.title.trim(),
      metaDescription: p.metaDescription.trim(),
      featuredImage: p.featuredImage.trim(),
      tags: (p.tags || '').split(',').map((t) => t.trim()).filter(Boolean),
      faq: p.faq || [],
      status: p.status,
    };
    const existing = apiPosts.find((x) => x.slug === p.slug);
    let posts: ApiBlogPost[];
    if (existing) {
      posts = await savePost(p.slug, patch, token);
    } else {
      posts = await createPost(patch, token);
    }
    applyPosts(posts);
    saveLocalDraft(p);
    setEditorOpen(false);
    setEditing(null);
  };

  const setStatus = async (slug: string, status: 'draft' | 'published') => {
    const p = apiPosts.find((x) => x.slug === slug);
    if (!p) return;
    const posts = await savePost(slug, { status }, token);
    applyPosts(posts);
  };

  const removePost = async (slug: string) => {
    await deletePost(slug, token);
    applyPosts(store.posts.filter((x) => x.slug !== slug));
  };

  const openNew = () => {
    setEditing(null);
    setEditorOpen(true);
  };
  const openEdit = (p: ApiBlogPost) => {
    setEditing({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      author: p.author || '',
      content: p.content,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      featuredImage: p.featuredImage,
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
      faq: p.faq || [],
      status: p.status,
    });
    setEditorOpen(true);
  };

  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <div className="admin-kicker">Content</div>
          <h1 className="admin-page-title">Blog</h1>
          <span className="admin-muted">{published.length} published · {drafts.length} drafts · posts are stored on the API server and show on the public /blog page.</span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div className="admin-seg">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <button key={f} className={statusFilter === f ? 'admin-seg-item active' : 'admin-seg-item'} onClick={() => setStatusFilter(f)}>
                {f === 'all' ? 'All' : f[0].toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          {!editorOpen && <button className="admin-btn admin-btn-primary" onClick={openNew}><Plus size={15} /> New post</button>}
        </div>
      </div>

      {editorOpen && (
        <div className="admin-card">
          <div className="admin-card-head">
            <h2 style={{ margin: 0 }}>{editing ? `Edit: ${editing.title}` : 'Write a new post'}</h2>
            <PenLine size={16} />
          </div>
          <BlogEditor
            editing={!!editing}
            post={editing || EMPTY_POST}
            onSaved={persist}
            onCancelled={() => {
              setEditorOpen(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      <div className="admin-card">
        <div className="admin-card-head">
          <h2 style={{ margin: 0 }}>Posts</h2>
          <span className="admin-chip"><Newspaper size={12} /> {visible.length}</span>
        </div>
        {visible.length === 0 && <p className="admin-muted" style={{ marginTop: 14 }}>No posts here yet — create one above. (Built-in guides are listed below.)</p>}
        <div className="admin-list" style={{ marginTop: 4 }}>
          {visible.map((p) => (
            <div className="admin-list-row" key={p.slug}>
              <div>
                <strong>{p.title}</strong>
                <span className="admin-muted">
                  /blog/{p.slug} · {p.category} · {new Date(p.updatedAt).toLocaleDateString()} ·{' '}
                  <span className={p.status === 'published' ? 'admin-badge ok' : 'admin-badge'}>{p.status}</span>
                  {p.author ? ` · by ${p.author}` : ''}
                </span>
              </div>
              <div className="admin-city-card-actions" style={{ flexWrap: 'nowrap' }}>
                {p.status === 'published'
                  ? <button className="admin-btn admin-btn-small" onClick={() => setStatus(p.slug, 'draft')}>Unpublish</button>
                  : <button className="admin-btn admin-btn-small" onClick={() => setStatus(p.slug, 'published')}>Publish</button>}
                <button className="admin-btn admin-btn-small" onClick={() => openEdit(p)}><PenLine size={13} /> Edit</button>
                {p.status === 'published' && <a className="admin-btn admin-btn-small" href={`/blog/${p.slug}`} target="_blank" rel="noreferrer"><ExternalLink size={13} /></a>}
                <button className="admin-btn admin-btn-danger admin-btn-small" onClick={() => { if (confirmDelete === p.slug) { removePost(p.slug); setConfirmDelete(''); } else { setConfirmDelete(p.slug); setTimeout(() => setConfirmDelete(''), 2500); } }}>
                  <Trash2 size={13} /> {confirmDelete === p.slug ? 'Confirm?' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h2>Built-in guides (read-only)</h2>
        <p className="admin-muted">These article pages come with the site code. Edit them in Settings → Pages & content if needed.</p>
        <div className="admin-post-grid">
          {BLOG_POSTS.map((p) => (
            <a className="admin-post-card" href={p.path} target="_blank" rel="noreferrer" key={p.path}>
              <BookOpenText size={17} />
              <strong>{p.title}</strong>
              <span className="admin-muted">{p.category} · {p.readTime}</span>
              <span className="admin-tool-open">Read →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageEditorRow({
  page,
  overrides,
  aliases,
  token,
  onSaved,
}: {
  page: ManagedPage;
  overrides: Record<string, PageOverride>;
  aliases: Record<string, string>;
  token: string;
  onSaved: (pages: { overrides: Record<string, PageOverride>; aliases: Record<string, string> }) => void;
}) {
  const effective = aliases[page.key] || page.key;
  const existing = overrides[effective] || {};
  const [open, setOpen] = useState(false);
  const [metaTitle, setMetaTitle] = useState(existing.metaTitle ?? '');
  const [metaDescription, setMetaDescription] = useState(existing.metaDescription ?? '');
  const [h1, setH1] = useState(existing.h1 ?? '');
  const [slug, setSlug] = useState(effective);
  const [content, setContent] = useState(existing.content ?? '');
  const [enabled, setEnabled] = useState(existing.enabled !== false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'error'>('idle');

  const startEdit = () => {
    setOpen(true);
    setMetaTitle(existing.metaTitle ?? '');
    setMetaDescription(existing.metaDescription ?? '');
    setH1(existing.h1 ?? '');
    setSlug(effective);
    setContent(existing.content ?? '');
    setEnabled(existing.enabled !== false);
  };

  const persist = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const cleanSlug = slug.trim().replace(/^\/+|\/+$/g, '').replace(/\s+/g, '-').toLowerCase();
      const p = await savePage(
        effective,
        { metaTitle: metaTitle.trim(), metaDescription: metaDescription.trim(), h1: h1.trim(), content, enabled, slug: cleanSlug || undefined },
        token,
      );
      onSaved(p);
      setMessage('Saved — changes are live.');
      setStatus('idle');
    } catch {
      setMessage('Save failed — check that you are logged in.');
      setStatus('error');
    } finally {
      setBusy(false);
    }
  };

  const clearOverride = async () => {
    setBusy(true);
    try {
      const p = await savePage(effective, { metaTitle: '', metaDescription: '', h1: '', content: '', enabled: true }, token);
      onSaved(p);
      setMessage('Reset to defaults.');
    } catch {
      setMessage('Reset failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-page-row">
      <div className="admin-page-row-head">
        <div>
          <strong>{metaTitle || page.title}</strong>
          <span className="admin-muted">{page.desc}</span>
          {aliases[page.key] && <span className="admin-chip">redirects: {page.key} → {aliases[page.key]}</span>}
          {existing.enabled === false && <span className="admin-chip" style={{ background: '#ffe3e3' }}>disabled</span>}
        </div>
        <div className="admin-city-card-actions">
          <button className="admin-btn admin-btn-small" onClick={() => (open ? setOpen(false) : startEdit())}>{open ? 'Close' : 'Edit'} <PenLine size={12} /></button>
          <a className="admin-btn admin-btn-small" href={effective}>Visit <ExternalLink size={12} /></a>
        </div>
      </div>
      {open && (
        <form className="admin-page-form admin-form" onSubmit={persist}>
          <div className="admin-form-grid">
            <label>Meta title<input className="admin-input" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder={page.title} /></label>
            <label>URL slug<input className="admin-input" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder={page.key} /></label>
          </div>
          <label>Meta description<textarea className="admin-input admin-textarea" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={2} placeholder="150–160 character search snippet" /></label>
          <label>H1 heading<input className="admin-input" value={h1} onChange={(e) => setH1(e.target.value)} placeholder={page.title} /></label>
          <label>Body content (optional override)<textarea className="admin-input admin-textarea" value={content} onChange={(e) => setContent(e.target.value)} rows={6} placeholder="Leave empty to keep the built-in page content. Use plain HTML: <h2>…</h2> <p>…</p>" /></label>
          <label className="admin-check">
            <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
            Page is visible in links
          </label>
          {slug !== effective && (
            <div className="admin-rename-note">Old URL <code>{page.key}</code> will keep working as a redirect to <code>/{slug}</code>.</div>
          )}
          {message && <div className={status === 'error' ? 'admin-error' : 'admin-success'}>{message}</div>}
          <div className="admin-city-card-actions">
            <button className="admin-btn admin-btn-primary admin-btn-small" type="submit" disabled={busy}><Save size={13} /> {busy ? 'Saving…' : 'Save page'}</button>
            <button className="admin-btn admin-btn-small" type="button" onClick={clearOverride} disabled={busy}><RefreshCcw size={13} /> Reset to default</button>
          </div>
        </form>
      )}
    </div>
  );
}

function PagesSection() {
  const store = useAdminState();
  const token = getToken();
  const pages = useMemo(() => buildManagedPages(store.overrides, store.aliases), [store.overrides, store.aliases]);
  const [query, setQuery] = useState('');
  const filtered = query.trim() ? pages.filter((p) => `${p.title} ${p.desc}`.toLowerCase().includes(query.toLowerCase())) : pages;

  const applyPages = (payload: { overrides: Record<string, PageOverride>; aliases: Record<string, string> }) => {
    setRemoteState({ overrides: payload.overrides, aliases: payload.aliases });
  };

  return (
    <div className="admin-card" style={{ padding: 0 }}>
      <div className="admin-page-head" style={{ padding: 20 }}>
        <div>
          <h2 style={{ margin: 0 }}>Pages & content</h2>
          <p className="admin-muted" style={{ marginTop: 4 }}>City pages, SEO pages, blog articles and app pages — title, meta description, URL slug, H1 and content in one place.</p>
        </div>
        <button className="admin-btn admin-btn-small" onClick={() => setQuery('')}>Clear search</button>
      </div>
      <div className="admin-searchbar" style={{ padding: '0 20px 16px' }}>
        <input className="admin-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pages by title or path…" />
      </div>
      <div>
        {filtered.map((p) => (
          <PageEditorRow key={p.key} page={p} overrides={store.overrides} aliases={store.aliases} token={token} onSaved={applyPages} />
        ))}
        {filtered.length === 0 && <p className="admin-muted" style={{ padding: 20 }}>No pages match “{query}”.</p>}
      </div>
    </div>
  );
}

function SettingsTab() {
  const store = useAdminState();
  const token = getToken();
  const s = store.settings;
  const [siteName, setSiteName] = useState(s.siteName ?? 'FitMyPhotoA4');
  const [brandLine, setBrandLine] = useState(s.brandLine ?? 'A quiet tool for the print counter.');
  const [tagline, setTagline] = useState(s.tagline ?? '');
  const [contactEmail, setContactEmail] = useState(s.contactEmail ?? '');
  const [phone, setPhone] = useState(s.phone ?? '');
  const [logo, setLogo] = useState(s.logo ?? '');
  const [accent, setAccent] = useState(s.accent ?? '#7c5cff');
  const [showCities, setShowCities] = useState(s.showCities !== false);
  const [titleTemplate, setTitleTemplate] = useState(s.seoDefaults?.titleTemplate ?? '{page} | PhotoSheet Pro');
  const [keywords, setKeywords] = useState(s.seoDefaults?.keywords ?? '');
  const [homeMetaTitle, setHomeMetaTitle] = useState(s.homeSEO?.metaTitle ?? '');
  const [homeMetaDesc, setHomeMetaDesc] = useState(s.homeSEO?.metaDescription ?? '');
  const [gaId, setGaId] = useState(s.integrations?.gaId ?? '');
  const [searchConsole, setSearchConsole] = useState(s.integrations?.searchConsole ?? '');
  const [adsenseScript, setAdsenseScript] = useState(s.integrations?.adsenseScript ?? '');
  const [social, setSocial] = useState<Record<string, string>>(s.social || {});
  const [saved, setSaved] = useState('');
  const [msgTone, setMsgTone] = useState<'ok' | 'err'>('ok');
  const [busy, setBusy] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSiteName(s.siteName ?? 'FitMyPhotoA4');
    setBrandLine(s.brandLine ?? 'A quiet tool for the print counter.');
    setTagline(s.tagline ?? '');
    setContactEmail(s.contactEmail ?? '');
    setPhone(s.phone ?? '');
    setLogo(s.logo ?? '');
    setShowCities(s.showCities !== false);
    setTitleTemplate(s.seoDefaults?.titleTemplate ?? '{page} | PhotoSheet Pro');
    setKeywords(s.seoDefaults?.keywords ?? '');
    setHomeMetaTitle(s.homeSEO?.metaTitle ?? '');
    setHomeMetaDesc(s.homeSEO?.metaDescription ?? '');
    setGaId(s.integrations?.gaId ?? '');
    setSearchConsole(s.integrations?.searchConsole ?? '');
    setAdsenseScript(s.integrations?.adsenseScript ?? '');
    setSocial(s.social || {});
  }, [s]);

  const resetAccent = () => setAccent('#7c5cff');

  const applyPatch = async (patch: Partial<RemoteSettings>, done: string) => {
    setBusy(true);
    setSaved('');
    try {
      if (token) {
        const remote = await saveRemoteSettings(patch, token);
        setRemoteState({ settings: remote });
        setMsgTone('ok');
        setSaved(done);
      } else {
        saveLocalSettings({ ...loadSettings(), ...patch });
        setMsgTone('ok');
        setSaved('Saved locally (API offline).');
      }
    } catch {
      setMsgTone('err');
      setSaved('Save failed.');
    } finally {
      setBusy(false);
    }
  };

  const saveContact = (e: React.FormEvent) => {
    e.preventDefault();
    applyPatch({ contactEmail, phone }, 'Contact info saved to the API server.');
  };

  const saveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    applyPatch({ social }, 'Social links saved to the API server.');
  };

  const saveIntegrations = (e: React.FormEvent) => {
    e.preventDefault();
    applyPatch({ integrations: { gaId, searchConsole, adsenseScript } }, 'Analytics & Search Console saved.');
  };

  const saveSiteSeo = (e: React.FormEvent) => {
    e.preventDefault();
    applyPatch(
      {
        siteName: siteName || 'FitMyPhotoA4',
        tagline,
        seoDefaults: { titleTemplate, metaDescription: homeMetaDesc, keywords },
        homeSEO: { metaTitle: homeMetaTitle, metaDescription: homeMetaDesc },
      },
      'Site SEO saved to the API server.',
    );
  };

  const onLogoUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result || '');
      if (url && url.length < 1000000) {
        setLogo(url);
      } else if (url) {
        setMsgTone('err');
        setSaved('Logo file is too large — use an image under ~1 MB.');
      }
    };
    reader.readAsDataURL(file);
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 8) {
      setMsgTone('err');
      setSaved('New password must be at least 8 characters.');
      return;
    }
    if (newPass !== confirmPass) {
      setMsgTone('err');
      setSaved('New password and confirmation do not match.');
      return;
    }
    setBusy(true);
    setSaved('');
    try {
      await changePassword(currentPass, newPass, token || getToken());
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setMsgTone('ok');
      setSaved('Password changed — stored as a scrypt hash on the server.');
    } catch (err: any) {
      setMsgTone('err');
      setSaved(err?.data?.error === 'wrong_current' ? 'Current password is wrong.' : 'Password change failed.');
    } finally {
      setBusy(false);
    }
  };

  const doExport = async () => {
    if (!token) return;
    try {
      const data = await exportData(token);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `photo-maker-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setMsgTone('ok');
      setSaved('Backup downloaded. Keep it safe — Render free disk is cleared on restart.');
    } catch {
      setMsgTone('err');
      setSaved('Export failed.');
    }
  };

  const doImport = async (file: File) => {
    if (!token) return;
    try {
      const payload = JSON.parse(await file.text());
      await importData(payload, token);
      await refresh();
      setMsgTone('ok');
      setSaved('Backup restored.');
    } catch {
      setMsgTone('err');
      setSaved('Import failed — check the file.');
    }
  };

  const resetLocal = () => {
    window.localStorage.clear();
    clearToken();
    setMsgTone('ok');
    setSaved('Local data cleared — reload the page.');
  };

  const setSocialField = (key: string, value: string) => {
    setSocial((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <div className="admin-kicker">Preferences & security</div>
          <h1 className="admin-page-title">Settings</h1>
        </div>
        <span className="admin-chip"><ShieldCheck size={13} /> scrypt hashing · 2FA OTP</span>
      </div>

      {saved && <div className={msgTone === 'ok' ? 'admin-success' : 'admin-error'}>{saved}</div>}

      <div className="admin-settings-grid" style={{ alignItems: 'start' }}>
        <div className="admin-card">
          <div className="admin-card-head">
            <h2 style={{ margin: 0 }}>Site information</h2>
            <Palette size={15} />
          </div>
          <label>Site name<input className="admin-input" value={siteName} onChange={(e) => setSiteName(e.target.value)} /></label>
          <label>Brand line<input className="admin-input" value={brandLine} onChange={(e) => setBrandLine(e.target.value)} /></label>
          <label>Tagline<textarea className="admin-input admin-textarea" value={tagline} onChange={(e) => setTagline(e.target.value)} rows={2} /></label>
          <div className="admin-form-grid">
            <label>
              Accent colour
              <input className="admin-input" value={accent} onChange={resetAccent} placeholder="#7c5cff" readOnly style={{ background: accent, color: '#fff', fontWeight: 800 }} />
            </label>
            <label>
              Logo
              <span className="admin-logo-picker">
                {logo ? <img className="admin-logo-thumb" src={logo} alt="logo preview" /> : <ImageIcon size={16} />}
                <span>
                  <button className="admin-btn admin-btn-small" type="button" onClick={() => logoInputRef.current?.click()}>{logo ? 'Replace' : 'Upload logo'}</button>
                  {logo && <button className="admin-btn admin-btn-small" type="button" onClick={() => setLogo('')}>Remove</button>}
                </span>
                <input ref={logoInputRef} type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={(e) => onLogoUpload(e.target.files?.[0])} />
              </span>
            </label>
          </div>
          <label className="admin-check">
            <input type="checkbox" checked={showCities} onChange={(e) => setShowCities(e.target.checked)} />
            Show the "Haryana · local pages" city cards in the footer
          </label>
          <button className="admin-btn admin-btn-primary" onClick={() => applyPatch({ siteName: siteName || 'FitMyPhotoA4', brandLine, tagline, logo, accent, showCities }, 'Site information saved.')} disabled={busy}><Save size={15} /> Save changes</button>
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            <h2 style={{ margin: 0 }}>Contact info</h2>
            <Mail size={15} />
          </div>
          <p className="admin-muted">Shown in the site footer so visitors can reach you.</p>
          <label>
            Support email
            <input className="admin-input" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="support@yourdomain.com" />
          </label>
          <label>
            Phone
            <input className="admin-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 …" />
          </label>
          <button className="admin-btn admin-btn-primary" onClick={saveContact} disabled={busy}><Save size={15} /> Save changes</button>
        </div>
      </div>

      <div className="admin-settings-grid" style={{ alignItems: 'start' }}>
        <form className="admin-card admin-form" onSubmit={updatePassword}>
          <div className="admin-card-head">
            <h2 style={{ margin: 0 }}>Account & security</h2>
            <KeyRound size={15} />
          </div>
          <p className="admin-muted">The admin password is hashed with scrypt + a random salt on the server.</p>
          <label>Current password<input className="admin-input" type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} /></label>
          <label>New password<input className="admin-input" type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} /></label>
          <label>Confirm new password<input className="admin-input" type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} /></label>
          <button className="admin-btn admin-btn-primary" type="submit" disabled={busy}>Change password</button>
        </form>

        <form className="admin-card admin-form" onSubmit={saveSocial}>
          <div className="admin-card-head">
            <h2 style={{ margin: 0 }}>Social links</h2>
            <Share2 size={15} />
          </div>
          <label>Instagram URL<input className="admin-input" value={social.instagram || ''} onChange={(e) => setSocialField('instagram', e.target.value)} placeholder="https://instagram.com/…" /></label>
          <label>Twitter / X URL<input className="admin-input" value={social.twitter || ''} onChange={(e) => setSocialField('twitter', e.target.value)} placeholder="https://x.com/…" /></label>
          <label>YouTube URL<input className="admin-input" value={social.youtube || ''} onChange={(e) => setSocialField('youtube', e.target.value)} placeholder="https://youtube.com/@…" /></label>
          <label>Facebook URL<input className="admin-input" value={social.facebook || ''} onChange={(e) => setSocialField('facebook', e.target.value)} placeholder="https://facebook.com/…" /></label>
          <label>WhatsApp URL<input className="admin-input" value={social.whatsapp || ''} onChange={(e) => setSocialField('whatsapp', e.target.value)} placeholder="https://wa.me/91…" /></label>
          <button className="admin-btn admin-btn-primary" type="submit" disabled={busy}><Save size={15} /> Save changes</button>
        </form>
      </div>

      <div className="admin-settings-grid" style={{ alignItems: 'start' }}>
        <form className="admin-card admin-form" onSubmit={saveIntegrations}>
          <div className="admin-card-head">
            <h2 style={{ margin: 0 }}>Analytics & Search Console</h2>
            <BarChart3 size={15} />
          </div>
          <label>Google Analytics ID<Globe size={12} style={{ verticalAlign: 'middle' }} /><input className="admin-input" value={gaId} onChange={(e) => setGaId(e.target.value)} placeholder="G-XXXXXXX" /></label>
          <label>Google Search Console<textarea className="admin-input admin-textarea" value={searchConsole} onChange={(e) => setSearchConsole(e.target.value)} rows={2} placeholder="Ownership verification meta tag or HTML snippet" /></label>
          <label>AdSense / ads script (HTML)<textarea className="admin-input admin-textarea" value={adsenseScript} onChange={(e) => setAdsenseScript(e.target.value)} rows={3} placeholder="<script async src=…></script>" /></label>
          <button className="admin-btn admin-btn-primary" type="submit" disabled={busy}><Save size={15} /> Save changes</button>
        </form>

        <form className="admin-card admin-form" onSubmit={saveSiteSeo}>
          <div className="admin-card-head">
            <h2 style={{ margin: 0 }}>Site SEO</h2>
            <TrendingUp size={15} />
          </div>
          <label>Site title<input className="admin-input" value={siteName} onChange={(e) => setSiteName(e.target.value)} /></label>
          <label>Default meta description<textarea className="admin-input admin-textarea" value={homeMetaDesc} onChange={(e) => setHomeMetaDesc(e.target.value)} rows={3} placeholder="Default search snippet used across the site." /></label>
          <label>Homepage meta title<input className="admin-input" value={homeMetaTitle} onChange={(e) => setHomeMetaTitle(e.target.value)} placeholder="FitMyPhotoA4 — Professional A4 Photo Sheet Maker" /></label>
          <label>Title template <span className="admin-muted">(use {'{page}'} as placeholder)</span><input className="admin-input" value={titleTemplate} onChange={(e) => setTitleTemplate(e.target.value)} /></label>
          <label>Default keywords<input className="admin-input" value={keywords} onChange={(e) => setKeywords(e.target.value)} /></label>
          <button className="admin-btn admin-btn-primary" type="submit" disabled={busy}><Save size={15} /> Save changes</button>
        </form>
      </div>

      <PagesSection />

      <div className="admin-card">
        <div className="admin-card-head">
          <h2 style={{ margin: 0 }}>Footer city labels</h2>
          <Eye size={16} />
        </div>
        <div className="admin-footer-labels">
          {CITY_LINKS.map((city) => (
            <label key={city.path}>{CITY_PAGES[city.path]?.name}<input className="admin-input" defaultValue={loadLabels()[city.path] ?? CITY_LABELS[city.path] ?? CITY_PAGES[city.path]?.name} onBlur={(e) => { saveLabel(city.path, e.target.value); setMsgTone('ok'); setSaved(`Saved ${CITY_PAGES[city.path]?.name} label.`); }} /></label>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h2>Backup & data</h2>
        <p className="admin-muted">Render's free web service disk is temporary. Export a backup regularly and restore it after an instance restart.</p>
        <div className="admin-city-card-actions">
          <button className="admin-btn" onClick={doExport}><Download size={14} /> Export backup</button>
          <label className="admin-btn"><Upload size={14} /> Import backup<input type="file" accept="application/json,.json" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) doImport(f); }} /></label>
        </div>
      </div>

      <div className="admin-card">
        <h2>Activity log (server-side)</h2>
        <div className="admin-list">
          {store.activity.length === 0 && <p className="admin-muted">No logged events yet — logins, OTP verifications and edits appear here.</p>}
          {store.activity.slice(0, 30).map((a: ActivityEntry, i) => (
            <div className="admin-list-row" key={a.ts + '-' + i}>
              <div>
                <strong>{a.action.replace(/_/g, ' ')}</strong>
                <span className="admin-muted">{a.detail} · {new Date(a.ts).toLocaleString()}</span>
              </div>
              <span className="admin-badge ok">{a.actor}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h2>Danger zone</h2>
        <button className="admin-btn admin-btn-danger" onClick={resetLocal}><RefreshCcw size={14} /> Clear browser data & sign out</button>
        <p className="admin-muted">Clears visits, drafts and cached admin data for this browser only. Content on the API server stays unchanged.</p>
      </div>
    </div>
  );
}

function AdminShell({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<TabId>('dashboard');
  const store = useAdminState();

  const NAV: { id: TabId; label: string; icon: LucideIcon }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'blog', label: 'Blog', icon: Newspaper },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="admin admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-logo-mark">A4</span>
          <div>
            <strong>FitMyPhoto</strong>
            <span>Admin panel</span>
          </div>
        </div>
        <nav className="admin-nav">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} className={tab === item.id ? 'admin-nav-item active' : 'admin-nav-item'} onClick={() => setTab(item.id)}>
                <Icon size={17} />
                <span>{item.label}</span>
                {tab === item.id && <Check size={14} className="admin-nav-check" />}
              </button>
            );
          })}
        </nav>
        <div className="admin-sidebar-foot">
          <a className="admin-btn" href="/">View site <ExternalLink size={13} /></a>
          <button className="admin-btn admin-btn-danger" onClick={onLogout}><LogOut size={15} /> Log out</button>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <span className="admin-kicker">fitmyphotoa4.com · admin</span>
          <div>
            <span className="admin-chip"><ShieldCheck size={12} /> {store.apiOn ? 'API online' : 'Offline mode'}</span>
          </div>
        </div>
        <AdminErrorBoundary>
          {tab === 'dashboard' && <Dashboard go={setTab} />}
          {tab === 'blog' && <BlogTab />}
          {tab === 'settings' && <SettingsTab />}
        </AdminErrorBoundary>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => {
    let mounted = true;
    me().then((ok) => {
      if (mounted) setAuthed(ok);
    });
    return () => {
      mounted = false;
    };
  }, []);
  if (authed === null) return <div className="admin admin-login"><div className="admin-login-card"><p>Checking session…</p></div></div>;
  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }
  return (
    <AdminShell
      onLogout={async () => {
        await logoutRemote();
        refresh();
        setAuthed(false);
      }}
    />
  );
}

class AdminErrorBoundary extends Component<{ children: ReactNode }, { ok: boolean }> {
  state = { ok: true };
  static getDerivedStateFromError() {
    return { ok: false };
  }
  render() {
    if (!this.state.ok) {
      return (
        <div className="admin-content" style={{ textAlign: 'center', padding: 60 }}>
          <h2>Something went wrong in this section</h2>
          <p>Refresh the page to continue.</p>
          <button className="admin-btn admin-btn-primary" onClick={() => { this.setState({ ok: true }); }}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}