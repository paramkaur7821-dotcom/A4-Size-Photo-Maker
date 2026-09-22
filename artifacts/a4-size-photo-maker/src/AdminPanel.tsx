import { useState } from 'react';
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
  type LucideIcon,
} from 'lucide-react';
import { CITY_PAGES, CITY_LINKS, CITY_LABELS } from './cityContent';
import { BLOG_POSTS } from './blogContent';
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
  DEFAULT_ADMIN_PASSWORD,
} from './adminConfig';

type TabId = 'dashboard' | 'cities' | 'blog' | 'footer' | 'settings';

type SeedPost = { slug: string; title: string; excerpt?: string };

const SEED_POSTS = BLOG_POSTS as unknown as SeedPost[];

const NAV: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'cities', label: 'City Pages', icon: MapPin },
  { id: 'blog', label: 'Blog', icon: Newspaper },
  { id: 'footer', label: 'Footer', icon: Eye },
  { id: 'settings', label: 'Settings', icon: Settings },
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
        <input
          className="admin-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          autoFocus
        />
        {error && <div className="admin-error">{error}</div>}
        <button className="admin-btn admin-btn-primary" type="submit">Unlock panel</button>
        <span className="admin-login-hint">Default password: {DEFAULT_ADMIN_PASSWORD}</span>
      </form>
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string | number; tone?: string }) {
  return (
    <div className="admin-stat">
      <span>{label}</span>
      <strong style={tone ? { color: tone } : undefined}>{value}</strong>
    </div>
  );
}

function Dashboard({ go }: { go: (tab: TabId) => void }) {
  const visits = readVisits();
  const cities = Object.keys(CITY_PAGES).length;
  const drafts = loadDrafts().length;

  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <div className="admin-kicker">Overview</div>
          <h1 className="admin-page-title">Dashboard</h1>
        </div>
        <button className="admin-btn" onClick={() => bumpVisit()}>Simulate a visit</button>
      </div>

      <div className="admin-stats">
        <StatCard label="Site visits (this browser)" value={visits} tone="#0ca678" />
        <StatCard label="Haryana city pages live" value={cities} tone="#7c5cff" />
        <StatCard label="Blog games drafts" value={drafts} tone="#e8590c" />
        <StatCard label="Footer label overrides" value={Object.keys(loadLabels()).length} tone="#0c8599" />
      </div>

      <div className="admin-card">
        <h2>Quick actions</h2>
        <div className="admin-actions">
          <button className="admin-btn admin-btn-primary" onClick={() => go('cities')}>Edit city labels</button>
          <button className="admin-btn" onClick={() => go('blog')}>Write a blog draft</button>
          <button className="admin-btn" onClick={() => go('footer')}>Tune footer text</button>
          <button className="admin-btn" onClick={() => go('settings')}>Change admin password</button>
        </div>
      </div>

      <div className="admin-card">
        <h2>City pages at a glance</h2>
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

function CityPagesEditor() {
  const merged = { ...CITY_LABELS, ...loadLabels() };
  const [labels, setLabels] = useState<Record<string, string>>(merged);
  const [saved, setSaved] = useState('');

  const update = (path: string, label: string) => {
    setLabels((prev) => ({ ...prev, [path]: label }));
  };

  const persist = (path: string) => {
    saveLabel(path, labels[path]);
    setSaved(`Saved: ${labels[path]}`);
  };

  return (
    <div className="admin-content">
      <div className="admin-page-head">
        <div>
          <div className="admin-kicker">Haryana · local pages</div>
          <h1 className="admin-page-title">City Pages</h1>
        </div>
        <span className="admin-chip">Live site · {Object.keys(CITY_PAGES).length} pages</span>
      </div>

      {saved && <div className="admin-success">{saved}</div>}

      <div className="admin-card">
        <h2>Footer card labels</h2>
        <p className="admin-muted">Change the text shown on each city card in the footer. Save per city.</p>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>City</th><th>Variant</th><th>Footer label</th><th style={{ width: 110 }}>Action</th></tr>
            </thead>
            <tbody>
              {CITY_LINKS.map((city) => (
                <tr key={city.path}>
                  <td>
                    <span className="admin-swatch" style={{ background: CITY_PAGES[city.path].accent }} />
                    <strong>{city.name}</strong>
                    <span className="admin-muted"> {CITY_PAGES[city.path].district}</span>
                  </td>
                  <td><span className="admin-badge">v{CITY_PAGES[city.path].variant}</span></td>
                  <td>
                    <input
                      className="admin-input"
                      value={labels[city.path] ?? ''}
                      onChange={(e) => update(city.path, e.target.value)}
                    />
                  </td>
                  <td>
                    <button className="admin-btn admin-btn-small admin-btn-primary" onClick={() => persist(city.path)}>
                      <Save size={14} /> Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-card">
        <h2>Open a city page</h2>
        <div className="admin-actions admin-actions-wrap">
          {CITY_LINKS.map((city) => (
            <a className="admin-btn" href={city.path} key={city.path}>
              {city.name} <ExternalLink size={13} />
            </a>
          ))}
        </div>
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
    const next = [
      { id: String(Date.now()), title: title.trim(), slug: slug.trim().replace(/ /g, '-').toLowerCase(), excerpt: excerpt.trim(), body: body.trim(), createdAt: new Date().toISOString() },
      ...drafts,
    ];
    saveDrafts(next);
    setDrafts(next);
    setConfirm(`Draft saved — /blog/${slug.trim().replace(/ /g, '-').toLowerCase()}`);
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
        <span className="admin-chip">{drafts.length} drafts</span>
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
              <button className="admin-btn admin-btn-danger admin-btn-small" onClick={() => removeDraft(d.id)}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h2>Published posts</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Slug</th><th style={{ width: 110 }}>Open</th></tr></thead>
            <tbody>
              {SEED_POSTS.map((p) => (
                <tr key={p.slug}>
                  <td>{p.title}</td>
                  <td className="admin-muted">/blog/{p.slug}</td>
                  <td><a className="admin-btn admin-btn-small" href={`/blog/${p.slug}`}>Visit <ExternalLink size={12} /></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        <h2>Tip</h2>
        <p className="admin-muted">
          City card labels are edited under <strong>City Pages</strong>. Law, Privacy and company links are text cards — turn brand text bigger in Settings if a card looks cramped.
        </p>
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
        {confirmPass && newPassword !== confirmPass && <div className="admin-error">Passwords do not match.</div>}
        <button className="admin-btn" type="submit">Update password</button>
      </form>

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
              <button
                key={item.id}
                className={tab === item.id ? 'admin-nav-item active' : 'admin-nav-item'}
                onClick={() => setTab(item.id)}
              >
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
        {tab === 'dashboard' && <Dashboard go={setTab} />}
        {tab === 'cities' && <CityPagesEditor />}
        {tab === 'blog' && <BlogManager />}
        {tab === 'footer' && <FooterEditor />}
        {tab === 'settings' && <AdminSettings />}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(isAdminLoggedIn);
  return authed ? <AdminShell onLogout={() => { logout(); setAuthed(false); }} /> : <AdminLogin onSuccess={() => setAuthed(true)} />;
}