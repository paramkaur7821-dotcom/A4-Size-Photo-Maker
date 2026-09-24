import { useSyncExternalStore } from 'react';
import {
  fetchSettings,
  fetchPages,
  fetchStats,
  fetchPosts,
  fetchActivity,
  getToken,
  DEFAULT_REMOTE_SETTINGS,
  type RemoteSettings,
  type PagesPayload,
  type UsageStats,
  type ActivityEntry,
  type BlogPost,
} from './lib/adminApi';
import { loadLabels } from './adminConfig';

export type AdminState = {
  settings: RemoteSettings;
  overrides: Record<string, import('./lib/adminApi').PageOverride>;
  aliases: Record<string, string>;
  activity: ActivityEntry[];
  stats: UsageStats;
  posts: BlogPost[];
  apiOn: boolean;
  initialized: boolean;
};

let state: AdminState = {
  settings: { ...DEFAULT_REMOTE_SETTINGS },
  overrides: {},
  aliases: {},
  activity: [],
  stats: { today: 0, month: 0, total: 0, bySize: {} },
  posts: [],
  apiOn: true,
  initialized: false,
};

const listeners = new Set<() => void>();

function emit() {
  state = { ...state, settings: { ...state.settings }, overrides: { ...state.overrides }, aliases: { ...state.aliases } };
  listeners.forEach((l) => l());
}

export function useAdminState(): AdminState {
  return useSyncExternalStore(
    (cb) => {
      if (!state.initialized) {
        requestAnimationFrame(() => refresh());
      }
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
  );
}

export function getAdminSnapshot(): AdminState {
  return state;
}

export async function refresh() {
  const token = getToken();
  try {
    const [settings, pages, stats, posts, activity] = await Promise.all([
      fetchSettings(),
      fetchPages(),
      fetchStats(),
      fetchPosts(token || undefined),
      token ? fetchActivity(token) : Promise.resolve(null),
    ]);
    state = {
      ...state,
      settings,
      overrides: (pages as PagesPayload).overrides || {},
      aliases: (pages as PagesPayload).aliases || {},
      stats,
      posts: posts || state.posts,
      activity: activity || state.activity,
      apiOn: true,
      initialized: true,
    };
    emit();
  } catch {
    state = { ...state, apiOn: false, initialized: true };
    emit();
  }
}

export function setRemoteState(next: {
  settings?: RemoteSettings;
  overrides?: Record<string, import('./lib/adminApi').PageOverride>;
  aliases?: Record<string, string>;
  activity?: ActivityEntry[];
  stats?: UsageStats;
  posts?: BlogPost[];
}) {
  state = {
    ...state,
    settings: next.settings ?? state.settings,
    overrides: next.overrides ?? state.overrides,
    aliases: next.aliases ?? state.aliases,
    activity: next.activity ?? state.activity,
    stats: next.stats ?? state.stats,
    posts: next.posts ?? state.posts,
  };
  emit();
}

export function effectiveLabels(): Record<string, string> {
  return { ...loadLabels() };
}