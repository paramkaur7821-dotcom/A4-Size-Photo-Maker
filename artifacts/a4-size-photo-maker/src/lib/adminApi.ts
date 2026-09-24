export type ToolKey = 'passport' | 'pan' | 'voter' | 'stamp' | 'custom';

export type RemoteSettings = {
  siteName: string;
  tagline: string;
  contactEmail: string;
  accent: string;
  otpEnabled: boolean;
  seoDefaults: { titleTemplate: string; metaDescription: string; keywords: string };
  integrations: { gaId: string; searchConsole: string; adsenseScript: string };
  tools: Record<ToolKey, boolean>;
  brandLine?: string;
  showCities?: boolean;
  phone?: string;
  logo?: string;
  social?: Record<string, string>;
  homeSEO?: { metaTitle?: string; metaDescription?: string } | null;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
  status: 'draft' | 'published';
  createdAt: number;
  updatedAt: number;
  publishedAt: number;
};

export type PageOverride = {
  metaTitle?: string;
  metaDescription?: string;
  h1?: string;
  content?: string;
  slug?: string;
  enabled?: boolean;
};

export type PagesPayload = {
  overrides: Record<string, PageOverride>;
  aliases: Record<string, string>;
};

export type ActivityEntry = {
  ts: number;
  action: string;
  actor: string;
  detail: string;
  ip?: string;
};

export type UsageStats = {
  today: number;
  month: number;
  total: number;
  bySize: Record<string, number>;
};

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) || 'https://a4-size-photo-maker-api.onrender.com';
export const TOKEN_KEY = 'fmp_admin_token';
const CACHE_SETTINGS = 'fmp_api_settings';
const CACHE_PAGES = 'fmp_api_pages';
const CACHE_POSTS = 'fmp_api_posts';

export const DEFAULT_REMOTE_SETTINGS: RemoteSettings = {
  siteName: 'FitMyPhotoA4',
  tagline: '',
  contactEmail: '',
  accent: '#7c5cff',
  otpEnabled: true,
  seoDefaults: { titleTemplate: '{page} | PhotoSheet Pro', metaDescription: '', keywords: '' },
  integrations: { gaId: '', searchConsole: '', adsenseScript: '' },
  tools: { passport: true, pan: true, voter: true, stamp: true, custom: true },
};

function readCache<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeCache(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function getToken(): string {
  try {
    return window.localStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setToken(token: string) {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* ignore */
  }
}

export function clearToken() {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

async function request(path: string, options: { method?: string; body?: unknown; token?: string; timeoutMs?: number } = {}): Promise<any> {
  const { method = 'GET', body, token, timeoutMs = 15000 } = options;
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    const text = await response.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }
    if (!response.ok) {
      const error: any = new Error(data?.error || `HTTP ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }
    return data;
  } finally {
    window.clearTimeout(timer);
  }
}

export async function loginPassword(password: string) {
  return request('/api/auth/login', { method: 'POST', body: { password } });
}

export async function verifyOtp(loginToken: string, otp: string) {
  const data = await request('/api/auth/verify', { method: 'POST', body: { loginToken, otp } });
  if (data?.token) setToken(data.token);
  return data;
}

export async function resendOtp(loginToken: string) {
  return request('/api/auth/otp/resend', { method: 'POST', body: { loginToken } });
}

export async function me(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;
  try {
    const data = await request('/api/auth/me', { token });
    return !!data?.ok;
  } catch {
    return false;
  }
}

export async function logoutRemote() {
  const token = getToken();
  if (!token) return;
  try {
    await request('/api/auth/logout', { method: 'POST', body: {}, token });
  } catch {
    /* ignore */
  }
  clearToken();
}

export async function fetchSettings(): Promise<RemoteSettings> {
  try {
    const data = await request('/api/settings');
    const settings: RemoteSettings = data?.settings;
    if (settings) {
      writeCache(CACHE_SETTINGS, settings);
      return settings;
    }
  } catch {
    /* offline */
  }
  return readCache<RemoteSettings>(CACHE_SETTINGS) || { ...DEFAULT_REMOTE_SETTINGS };
}

export async function saveSettings(patch: Partial<RemoteSettings>, token: string): Promise<RemoteSettings> {
  const data = await request('/api/settings', { method: 'POST', body: patch, token });
  if (data?.settings) writeCache(CACHE_SETTINGS, data.settings);
  return data?.settings || {};
}

export async function fetchPages(): Promise<PagesPayload> {
  try {
    const data = await request('/api/pages');
    const pages: PagesPayload = { overrides: data?.overrides || {}, aliases: data?.aliases || {} };
    writeCache(CACHE_PAGES, pages);
    return pages;
  } catch {
    return readCache<PagesPayload>(CACHE_PAGES) || { overrides: {}, aliases: {} };
  }
}

export async function savePage(path: string, override: PageOverride, token: string): Promise<PagesPayload> {
  const data = await request(`/api/pages/${encodeURIComponent(path)}`, { method: 'PUT', body: override, token });
  const pages: PagesPayload = { overrides: data?.overrides || {}, aliases: data?.aliases || {} };
  writeCache(CACHE_PAGES, pages);
  return pages;
}

export async function changePassword(current: string, next: string, token: string) {
  return request('/api/settings/password', { method: 'POST', body: { current, next }, token });
}

export async function fetchActivity(token: string): Promise<ActivityEntry[] | null> {
  try {
    const data = await request('/api/activity', { token });
    return data?.activity || null;
  } catch {
    return null;
  }
}

export async function fetchStats(): Promise<UsageStats> {
  try {
    const data = await request('/api/stats');
    if (data) return { today: data.today || 0, month: data.month || 0, total: data.total || 0, bySize: data.bySize || {} };
  } catch {
    /* offline */
  }
  return { today: 0, month: 0, total: 0, bySize: {} };
}

export function bumpUsage(size: string = 'custom') {
  request('/api/stats/usage', { method: 'POST', body: { size }, timeoutMs: 6000 }).catch(() => undefined);
}

export async function exportData(token: string) {
  const data = await request('/api/data/export', { token });
  return data;
}

export async function importData(payload: unknown, token: string) {
  return request('/api/data/import', { method: 'POST', body: payload, token });
}

export type PostPayload = Partial<Omit<BlogPost, 'slug'>> & { slug?: string };

export async function fetchPosts(token?: string): Promise<BlogPost[]> {
  try {
    const data = token ? await request('/api/posts', { token }) : await request('/api/posts');
    const posts: BlogPost[] = data?.posts || [];
    if (posts.length) writeCache(CACHE_POSTS, posts);
    return posts;
  } catch {
    return readCache<BlogPost[]>(CACHE_POSTS) || [];
  }
}

export async function savePost(slug: string, patch: PostPayload, token: string): Promise<BlogPost[]> {
  const data = await request(`/api/posts/${encodeURIComponent(slug)}`, { method: 'PUT', body: patch, token });
  const posts: BlogPost[] = data?.posts || [];
  writeCache(CACHE_POSTS, posts);
  return posts;
}

export async function createPost(patch: PostPayload, token: string): Promise<BlogPost[]> {
  const data = await request('/api/posts', { method: 'POST', body: patch, token });
  const posts: BlogPost[] = data?.posts || [];
  writeCache(CACHE_POSTS, posts);
  return posts;
}

export async function deletePost(slug: string, token: string): Promise<boolean> {
  await request(`/api/posts/${encodeURIComponent(slug)}`, { method: 'DELETE', token });
  writeCache(CACHE_POSTS, readCache<BlogPost[]>(CACHE_POSTS)?.filter((x) => x.slug !== slug) || []);
  return true;
}