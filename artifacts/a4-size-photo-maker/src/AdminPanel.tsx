import { Component, useState } from 'react';
import type { ReactNode } from 'react';
import {
  LayoutDashboard,
  MapPin,
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
  BarChart3,
  Boxes,
  Globe,
  PenLine,
  LayoutGrid,
  BookOpenText,
  Workflow,
  FileText,
  Clock,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { CITY_PAGES, CITY_LINKS, CITY_LABELS } from './cityContent';
import { BLOG_POSTS } from './blogContent';
import { ALL_SEO_PAGES } from './seoContent';
import {
  loadSettings,
  saveSettings,
  loadLabels,
  saveLabel,
  loadDrafts,
  saveDrafts,
  isAdminLoggedIn,
  login,
  logout,
  bumpVisit,
  readVisits,
  readVisitLog,
  DEFAULT_ADMIN_PASSWORD,
} from './adminConfig';

type TabId = 'dashboard' | 'analytics' | 'tools' | 'cities' | 'blog' | 'pages' | 'footer' | 'settings';

type SeedPost = { slug: string; title: string; excerpt?: string };

const SEED_POSTS = BLOG_POSTS as unknown as SeedPost[];

const NAV: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'tools', label: 'Tools', icon: Boxes },
  { id: 'cities', label: 'City Pages', icon: MapPin },
  { id: 'blog', label: 'Blog', icon: Newspaper },
  { id: 'pages', label: 'SEO Pages', icon: LayoutGrid },
  { id: 'footer', label: 'Footer', icon: Eye },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const TOOL_CARDS: { title: string; desc: string; href: string; icon: LucideIcon }[] = [
  { title: 'Passport Photo Maker', desc: '35 × 45 mm passport-size sheet for office, exam and PSK files.', href: '/passport-photo-size-maker', icon: FileText },
  { title: 'PAN Card Photo Maker', desc: '25 × 35 mm PAN Card and voter-size prints on A4.', href: '/pan-card-photo-maker', icon: FileText },
  { title: 'Voter ID Photo Maker', desc: '25 × 35 mm sheet built for Voter ID and licence forms.', href: '/voter-id-photo-maker', icon: FileText },
  { title: 'Free A4 Sheet Maker', desc: 'Upload once, lay out any custom size, download a printable A4 PDF.', href: '/#tool', icon: Workflow },
  { title: 'How It Works', desc: 'The 3-minute walkthrough from upload to print counter.', href: '/how-it-works', icon: BookOpenText },
  { title: 'FAQ', desc: 'Sizes, printing and passport-centre questions answered.', href: '/faq', icon: Globe },
];

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      onSuccess();
    } else {
      setError('Wrong password — try again.');
    }
  };

  return (
    <div className="admin admin-login">
      <form className="admin-login-card" onSubmit={submit}>
        <div className="admin-login-lock"><LockKeyhole size={26} /></div>
        <h1>FitMyPhotoA4 Admin</h1>
        <p>Enter the admin password to open the panel.</p>
        <input className="admin-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" autoFocus />
        {error && <div className="admin-error">{error}</div>}
        <button className="admin-btn admin-btn-primary" type="submit">Unlock panel</button>
        <span className="admin-login-hint">Default password: {DEFAULT_ADMIN_PASSWORD}</span>
      </form>
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

function QuickCard({ title, desc, action, onClick, icon: Icon }: { title: string; desc: string; action: string; onClick: () => void; icon: LucideIcon }) {
  return (
    <button className="admin-quick" onClick={onClick}>
      <span className="admin-quick-icon"><Icon size={18} /></span>
      <strong>{title}</strong>
      <span className="admin-muted">{desc}</span>
      <span className="admin-quick-action">{action} →</span>
    </button>
  );
}

function Dashboard({ go }: { go: (tab: TabId) => void }) {
  const visits = readVisits();
  const cities = Object.keys(CITY_PAGES).length;
  const drafts = loadDrafts().length;
  const labels = Object.keys(loadLabels()).length;
  const log = readVisitLog();
  const today = log.filter((l) => Date.now() - l.ts < 86400000).length;

  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <div className="admin-kicker">Overview</div>
          <h1 className="admin-page-title">Dashboard</h1>
        </div>
        <button className="admin-btn" onClick={() => bumpVisit('/admin')}>Log a test visit</button>
      </div>

      <div className="admin-stats">
        <StatCard label="Total visits" value={visits} tone="#0ca678" icon={TrendingUp} />
        <StatCard label="Visits today" value={today} tone="#7c5cff" icon={Clock} />
        <StatCard label="City pages live" value={cities} tone="#e8590c" icon={MapPin} />
        <StatCard label="Blog drafts" value={drafts} tone="#0c8599" icon={PenLine} />
        <StatCard label="Footer labels" value={labels} tone="#f76707" icon={Boxes} />
        <StatCard label="SEO pages" value={Object.keys(ALL_SEO_PAGES).length} tone="#2b8a3e" icon={LayoutGrid} />
      </div>

      <div>
        <div className="admin-kicker" style={{ marginBottom: 12 }}>Quick actions</div>
        <div className="admin-quick-grid">
          <QuickCard title="City pages" desc="Edit the footer card labels for all 10 Haryana cities." action="Open editor" onClick={() => go('cities')} icon={MapPin} />
          <QuickCard title="Write a blog post" desc="Draft a new guide with title, slug and body." action="New draft" onClick={() => go('blog')} icon={PenLine} />
          <QuickCard title="Footer editor" desc="Change brand name, tagline and city-card visibility." action="Open footer" onClick={() => go('footer')} icon={Eye} />
          <QuickCard title="Analytics" desc="See the visit log and most-viewed city pages." action="View stats" onClick={() => go('analytics')} icon={BarChart3} />
          <QuickCard title="Settings" desc="Site identity, accent colour and admin password." action="Open settings" onClick={() => go('settings')} icon={Settings} />
          <QuickCard title="SEO pages" desc="Browse the static info, tool and guide pages." action="Browse pages" onClick={() => go('pages')} icon={LayoutGrid} />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <h2>City pages at a glance</h2>
          <a className="admin-btn admin-btn-small" href="/">View live site <ExternalLink size={13} /></a>
        </div>
        <div className="admin-citybar">
          {Object.values(CITY_PAGES).map((c) => (
            <div className="admin-citybar-item" key={c.path} title={`${c.name} · variant ${c.variant}`}>
              <span className="admin-bar" style={{ height: `${40 + (c.variant % 5) * 18}px`, background: c.accent }} />
              <span>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Analytics() {
  const log = readVisitLog();
  const counts: Record<string, number> = {};
  for (const l of log) counts[l.path] = (counts[l.path] || 0) + 1;
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const max = Math.max(1, ...top.map((t) => t[1]));
  const cityHits = Object.entries(counts).filter(([p]) => CITY_PAGES[p]).reduce((a, kv) => a + kv[1], 0);

  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <div className="admin-kicker">Reports</div>
          <h1 className="admin-page-title">Analytics</h1>
        </div>
        <span className="admin-chip"><Clock size={12} /> Last {log.length} visits logged</span>
      </div>

      <div className="admin-stats">
        <StatCard label="Total visits" value={readVisits()} tone="#0ca678" icon={TrendingUp} />
        <StatCard label="City page hits" value={cityHits} tone="#7c5cff" icon={MapPin} />
        <StatCard label="Unique routes hit" value={Object.keys(counts).length} tone="#e8590c" icon={Globe} />
        <StatCard label="Log entries" value={log.length} tone="#0c8599" icon={Clock} />
      </div>

      {log.length === 0 && <div className="admin-card"><h2>No data yet</h2><p className="admin-muted">Visit a few pages — or press "Log a test visit" on the dashboard — and the charts appear here.</p></div>}

      {top.length > 0 && (
        <div className="admin-card">
          <h2>Most viewed routes</h2>
          <div className="admin-bars">
            {top.map(([path, n]) => (
              <div className="admin-bars-row" key={path}>
                <span className="admin-bars-label">{path === '/' ? 'Home / Maker' : path}</span>
                <span className="admin-bars-track">
                  <span className="admin-bars-fill" style={{ width: `${Math.max(6, (n / max) * 100)}%` }} />
                </span>
                <span className="admin-bars-count">{n}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {log.length > 0 && (
        <div className="admin-card">
          <h2>Visit log</h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Route</th><th style={{ width: 220 }}>Time</th></tr></thead>
              <tbody>
                {log.slice(0, 25).map((l, i) => (
                  <tr key={l.ts + '-' + i}>
                    <td>{l.path === '/' ? 'Home / Maker' : l.path}</td>
                    <td className="admin-muted">{new Date(l.ts).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolsManager() {
  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <div className="admin-kicker">Featured tools</div>
          <h1 className="admin-page-title">Photo tools</h1>
        </div>
        <span className="admin-chip"><Boxes size={12} /> Live on site</span>
      </div>

      <div className="admin-tool-grid">
        {TOOL_CARDS.map((t) => {
          const Icon = t.icon;
          return (
            <a className="admin-tool-card" href={t.href} key={t.title}>
              <span className="admin-tool-icon"><Icon size={20} /></span>
              <span className="admin-tool-title">{t.title}</span>
              <span className="admin-muted">{t.desc}</span>
              <span className="admin-tool-open">Open tool →</span>
            </a>
          );
        })}
      </div>

      <div className="admin-card">
        <h2>Routing status</h2>
        <div className="admin-list">
          <div className="admin-list-row"><div><strong>Vercel</strong><span className="admin-muted">https://a4-size-photo-maker.vercel.app — primary</span></div><span className="admin-badge ok">Ready</span></div>
          <div className="admin-list-row"><div><strong>Render</strong><span className="admin-muted">https://a4-size-photo-maker.onrender.com — static mirror</span></div><span className="admin-badge ok">Ready</span></div>
          <div className="admin-list-row"><div><strong>Admin route</strong><span className="admin-muted">/admin — this panel</span></div><span className="admin-badge ok">Open</span></div>
        </div>
      </div>
    </div>
  );
}

function CityPagesEditor() {
  const merged = { ...CITY_LABELS, ...loadLabels() };
  const [labels, setLabels] = useState<Record<string, string>>(merged);
  const [editing, setEditing] = useState<string | null>(null);
  const [saved, setSaved] = useState('');

  const update = (path: string, label: string) => setLabels((prev) => ({ ...prev, [path]: label }));

  const persist = (path: string) => {
    saveLabel(path, labels[path]);
    setEditing(null);
    setSaved(`Saved label for ${CITY_PAGES[path].name}: ${labels[path]}`);
  };

  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <div className="admin-kicker">Haryana · local pages</div>
          <h1 className="admin-page-title">City Pages</h1>
        </div>
        <span className="admin-chip"><MapPin size={12} /> {Object.keys(CITY_PAGES).length} pages live</span>
      </div>

      {saved && <div className="admin-success">{saved}</div>}

      <div className="admin-city-grid">
        {CITY_LINKS.map((city) => {
          const info = CITY_PAGES[city.path];
          return (
            <div className="admin-city-card" key={city.path} style={{ borderTopColor: info.accent }}>
              <div className="admin-city-card-top">
                <span className="admin-swatch-lg" style={{ background: info.accent }} />
                <div>
                  <strong>{info.name}</strong>
                  <span className="admin-muted">{info.district} district</span>
                </div>
                <span className="admin-badge">v{info.variant}</span>
              </div>
              <div className="admin-city-card-label">
                <span className="admin-muted">Footer label</span>
                {editing === city.path ? (
                  <>
                    <input className="admin-input" value={labels[city.path] ?? ''} onChange={(e) => update(city.path, e.target.value)} />
                    <div className="admin-city-card-actions">
                      <button className="admin-btn admin-btn-small admin-btn-primary" onClick={() => persist(city.path)}><Save size={13} /> Save</button>
                      <button className="admin-btn admin-btn-small" onClick={() => setEditing(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="admin-city-label-text">{labels[city.path] ?? city.name}</span>
                    <div className="admin-city-card-actions">
                      <button className="admin-btn admin-btn-small" onClick={() => setEditing(city.path)}><PenLine size={13} /> Edit</button>
                      <a className="admin-btn admin-btn-small" href={city.path}>Visit <ExternalLink size={12} /></a>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BlogManager() {
  const [drafts, setDrafts] = useState(loadDrafts);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [confirm, setConfirm] = useState('');

  const addDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;
    const cleanSlug = slug.trim().replace(/ /g, '-').toLowerCase();
    const next = [
      { id: String(Date.now()), title: title.trim(), slug: cleanSlug, excerpt: excerpt.trim(), body: body.trim(), createdAt: new Date().toISOString() },
      ...drafts,
    ];
    saveDrafts(next);
    setDrafts(next);
    setConfirm(`Draft saved — /blog/${cleanSlug}`);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setBody('');
  };

  const removeDraft = (id: string) => {
    const next = drafts.filter((d) => d.id !== id);
    saveDrafts(next);
    setDrafts(next);
  };

  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <div className="admin-kicker">Content</div>
          <h1 className="admin-page-title">Blog</h1>
        </div>
        <span className="admin-chip"><Newspaper size={12} /> {drafts.length} drafts</span>
      </div>

      <div className="admin-card">
        <h2>Write a new draft</h2>
        {confirm && <div className="admin-success">{confirm}</div>}
        <form className="admin-form" onSubmit={addDraft}>
          <label>Title<input className="admin-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Passport size photo for bank forms" /></label>
          <label>Slug (URL)<input className="admin-input" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="passport-size-photo-bank-forms" /></label>
          <label>Excerpt<textarea className="admin-input admin-textarea" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} placeholder="One-line summary for the blog card" /></label>
          <label>Body<textarea className="admin-input admin-textarea" value={body} onChange={(e) => setBody(e.target.value)} rows={6} placeholder="Full post content…" /></label>
          <button className="admin-btn admin-btn-primary" type="submit"><Plus size={15} /> Save draft</button>
        </form>
      </div>

      <div className="admin-card">
        <h2>My drafts</h2>
        {drafts.length === 0 && <p className="admin-muted">No drafts yet — write your first above.</p>}
        <div className="admin-list">
          {drafts.map((d) => (
            <div className="admin-list-row" key={d.id}>
              <div>
                <strong>{d.title}</strong>
                <span className="admin-muted">/blog/{d.slug} · {new Date(d.createdAt).toLocaleDateString()}</span>
              </div>
              <button className="admin-btn admin-btn-danger admin-btn-small" onClick={() => removeDraft(d.id)}><Trash2 size={14} /> Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h2>Published posts</h2>
        <div className="admin-post-grid">
          {SEED_POSTS.map((p) => (
            <a className="admin-post-card" href={`/blog/${p.slug}`} key={p.slug}>
              <BookOpenText size={17} />
              <strong>{p.title}</strong>
              <span className="admin-muted">{p.excerpt || '/blog/' + p.slug}</span>
              <span className="admin-tool-open">Read post →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function PagesBrowser() {
  const pages = Object.values(ALL_SEO_PAGES);
  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <div className="admin-kicker">Static content</div>
          <h1 className="admin-page-title">SEO Pages</h1>
        </div>
        <span className="admin-chip"><LayoutGrid size={12} /> {pages.length} pages</span>
      </div>
      <p className="admin-muted">Tool pages, guides, legal pages and the main FAQ — all live, all indexable.</p>
      <div className="admin-post-grid">
        {pages.map((p) => (
          <a className="admin-post-card" href={p.path} key={p.path}>
            <FileText size={17} />
            <strong>{p.title}</strong>
            <span className="admin-muted">{p.path}</span>
            <span className="admin-tool-open">View page →</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function FooterEditor() {
  const settings = loadSettings();
  const [siteName, setSiteName] = useState(settings.siteName ?? 'FitMyPhotoA4');
  const [brandLine, setBrandLine] = useState(settings.brandLine ?? 'A quiet tool for the print counter.');
  const [tagline, setTagline] = useState(
    settings.tagline ??
      'Measured passport, PAN, voter ID and licence photo sheets built for A4 printing — everything stays in your browser, and you print one sheet at your nearest shop.'
  );
  const [showCities, setShowCities] = useState(settings.showCities ?? true);
  const [saved, setSaved] = useState('');

  const persist = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings({ ...loadSettings(), siteName: siteName || settings.siteName || 'FitMyPhotoA4', brandLine, tagline, showCities });
    setSaved('Footer settings saved — live on the next page visit.');
  };

  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <div className="admin-kicker">Footer</div>
          <h1 className="admin-page-title">Footer editor</h1>
        </div>
        <span className="admin-chip">Zoom-safe · big text</span>
      </div>

      {saved && <div className="admin-success">{saved}</div>}

      <form className="admin-card admin-form" onSubmit={persist}>
        <h2>Brand & tagline</h2>
        <label>Brand name<input className="admin-input" value={siteName} onChange={(e) => setSiteName(e.target.value)} /></label>
        <label>Brand line<input className="admin-input" value={brandLine} onChange={(e) => setBrandLine(e.target.value)} /></label>
        <label>Tagline (big serif paragraph)<textarea className="admin-input admin-textarea" value={tagline} onChange={(e) => setTagline(e.target.value)} rows={3} /></label>
        <label className="admin-check">
          <input type="checkbox" checked={showCities} onChange={(e) => setShowCities(e.target.checked)} />
          Show the "Haryana · local pages" city cards
        </label>
        <button className="admin-btn admin-btn-primary" type="submit"><Save size={15} /> Save footer settings</button>
      </form>

      <div className="admin-card">
        <h2>Preview</h2>
        <div className="admin-preview">
          <strong>{siteName || 'FitMyPhotoA4'}</strong>
          <span>{brandLine || 'A quiet tool for the print counter.'}</span>
          <p>{tagline}</p>
        </div>
      </div>

      <div className="admin-card">
        <h2>Tip</h2>
        <p className="admin-muted">City card labels are edited under <strong>City Pages</strong>. Company and Legal links are small text cards.</p>
      </div>
    </div>
  );
}

function AdminSettings() {
  const settings = loadSettings();
  const [siteName, setSiteName] = useState(settings.siteName ?? 'FitMyPhotoA4');
  const [contactEmail, setContactEmail] = useState(settings.contactEmail ?? '');
  const [accent, setAccent] = useState(settings.accent ?? '#7c5cff');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [saved, setSaved] = useState('');

  const persistSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const current = loadSettings();
    saveSettings({ ...current, siteName, contactEmail, accent, password: current.password || DEFAULT_ADMIN_PASSWORD });
    setSaved('Settings saved.');
  };

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setSaved('Password too short — use at least 6 characters.');
      return;
    }
    if (confirmPass !== newPassword) {
      setSaved('Passwords do not match.');
      return;
    }
    const current = loadSettings();
    saveSettings({ ...current, password: newPassword });
    setNewPassword('');
    setConfirmPass('');
    setSaved('Admin password updated.');
  };

  const resetAll = () => {
    window.localStorage.clear();
    setSaved('Demo data cleared — reload the page.');
  };

  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <div className="admin-kicker">Preferences & security</div>
          <h1 className="admin-page-title">Settings</h1>
        </div>
        <span className="admin-chip"><ShieldCheck size={13} /> Local to this browser</span>
      </div>

      {saved && <div className="admin-success">{saved}</div>}

      <div className="admin-settings-grid">
        <form className="admin-card admin-form" onSubmit={persistSettings}>
          <h2>Site identity</h2>
          <label>Site name<input className="admin-input" value={siteName} onChange={(e) => setSiteName(e.target.value)} /></label>
          <label>
            Contact email <Mail size={12} style={{ verticalAlign: 'middle' }} />
            <input className="admin-input" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="hello@fitmyphotoa4.com" />
          </label>
          <label>
            Accent colour <Palette size={12} style={{ verticalAlign: 'middle' }} />
            <input className="admin-input" value={accent} onChange={(e) => setAccent(e.target.value)} placeholder="#7c5cff" />
          </label>
          <button className="admin-btn admin-btn-primary" type="submit"><Save size={15} /> Save settings</button>
        </form>

        <form className="admin-card admin-form" onSubmit={changePassword}>
          <h2>Change admin password</h2>
          <label>New password<input className="admin-input" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></label>
          <label>Confirm password<input className="admin-input" type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} /></label>
          <button className="admin-btn" type="submit">Update password</button>
        </form>
      </div>

      <div className="admin-card">
        <h2>Danger zone</h2>
        <button className="admin-btn admin-btn-danger" onClick={resetAll}><RefreshCcw size={14} /> Reset all demo data</button>
        <p className="admin-muted">Clears visits, labels, drafts and settings for this browser. City pages keep working from the source code.</p>
      </div>
    </div>
  );
}

function AdminShell({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<TabId>('dashboard');

  return (
    <div className="admin">
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
          <span className="admin-chip"><ShieldCheck size={12} /> Authenticated</span>
        </div>
        <AdminErrorBoundary>
          {tab === 'dashboard' && <Dashboard go={setTab} />}
          {tab === 'analytics' && <Analytics />}
          {tab === 'tools' && <ToolsManager />}
          {tab === 'cities' && <CityPagesEditor />}
          {tab === 'blog' && <BlogManager />}
          {tab === 'pages' && <PagesBrowser />}
          {tab === 'footer' && <FooterEditor />}
          {tab === 'settings' && <AdminSettings />}
        </AdminErrorBoundary>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(isAdminLoggedIn);
  return authed ? <AdminShell onLogout={() => { logout(); setAuthed(false); }} /> : <AdminLogin onSuccess={() => setAuthed(true)} />;
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