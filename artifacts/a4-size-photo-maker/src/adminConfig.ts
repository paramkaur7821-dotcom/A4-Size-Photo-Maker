const KEY_SETTINGS = 'fmp_admin_settings';
const KEY_LABELS = 'fmp_admin_city_labels';
const KEY_DRAFTS = 'fmp_admin_drafts';
const KEY_SESSION = 'fmp_admin_session';
const KEY_VISITS = 'fmp_visits';
const KEY_LOG = 'fmp_visit_log';

export const DEFAULT_ADMIN_PASSWORD = 'fitmyphoto2026';

export type AdminSettings = {
  siteName: string;
  brandLine: string;
  tagline: string;
  contactEmail: string;
  showCities: boolean;
  accent: string;
  password: string;
};

export type CityLabelDraft = {
  path: string;
  label: string;
};

export type BlogDraft = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  createdAt: string;
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeRemove(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function loadSettings(): Partial<AdminSettings> {
  return read<Partial<AdminSettings>>(KEY_SETTINGS, {});
}

export function saveSettings(settings: Partial<AdminSettings>) {
  write(KEY_SETTINGS, settings);
}

export function loadLabels(): Record<string, string> {
  return read<Record<string, string>>(KEY_LABELS, {});
}

export function saveLabel(path: string, label: string) {
  const labels = loadLabels();
  labels[path] = label;
  write(KEY_LABELS, labels);
}

export function loadDrafts(): BlogDraft[] {
  return read<BlogDraft[]>(KEY_DRAFTS, []);
}

export function saveDrafts(drafts: BlogDraft[]) {
  write(KEY_DRAFTS, drafts);
}

export function loadPassword(): string {
  const s = loadSettings();
  return s.password || DEFAULT_ADMIN_PASSWORD;
}

export function isAdminLoggedIn(): boolean {
  return safeGet(KEY_SESSION) === '1';
}

export function login(password: string): boolean {
  if (password !== loadPassword()) return false;
  write(KEY_SESSION, '1');
  return true;
}

export function logout() {
  safeRemove(KEY_SESSION);
}

export type VisitLog = { path: string; ts: number };

export function bumpVisit(path: string = '/'): number {
  try {
    const n = Number(safeGet(KEY_VISITS) || '0') + 1;
    write(KEY_VISITS, n);
    const log = read<VisitLog[]>(KEY_LOG, []);
    log.unshift({ path, ts: Date.now() });
    if (log.length > 80) log.length = 80;
    write(KEY_LOG, log);
    return n;
  } catch {
    return 0;
  }
}

export function readVisits(): number {
  return Number(window.localStorage.getItem(KEY_VISITS) || '0');
}

export function readVisitLog(): VisitLog[] {
  return read<VisitLog[]>(KEY_LOG, []);
}
