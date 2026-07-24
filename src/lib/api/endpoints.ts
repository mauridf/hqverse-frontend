export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },

  // Editorial
  PUBLISHERS: {
    BASE: '/publishers',
    DETAIL: (id: number) => `/publishers/${id}`,
  },
  CHARACTERS: {
    BASE: '/characters',
    SEARCH: '/characters/search',
    DETAIL: (id: number) => `/characters/${id}`,
  },
  COMIC_SERIES: {
    BASE: '/comic-series',
    SEARCH: '/comic-series/search',
    DETAIL: (id: number) => `/comic-series/${id}`,
  },
  COMIC_ISSUES: {
    BASE: '/comic-issues',
    DETAIL: (id: number) => `/comic-issues/${id}`,
    BY_SERIES: (seriesId: number) => `/comic-issues/series/${seriesId}`,
  },
  TEAMS: {
    BASE: '/teams',
    SEARCH: '/teams/search',
    DETAIL: (id: number) => `/teams/${id}`,
  },
  CREATORS: {
    BASE: '/creators',
    SEARCH: '/creators/search',
    DETAIL: (id: number) => `/creators/${id}`,
  },
  STORY_ARCS: {
    BASE: '/story-arcs',
    SEARCH: '/story-arcs/search',
    DETAIL: (id: number) => `/story-arcs/${id}`,
  },
  UNIVERSES: {
    BASE: '/universes',
    DETAIL: (id: number) => `/universes/${id}`,
  },

  // Reviews
  REVIEWS: {
    BASE: '/reviews',
    DETAIL: (id: number) => `/reviews/${id}`,
    BY_ISSUE: (issueId: number) => `/reviews/issue/${issueId}`,
    BY_USER: (userId: number) => `/reviews/user/${userId}`,
    COMMENTS: (reviewId: number) => `/reviews/${reviewId}/comments`,
    COMMENT: (commentId: number) => `/reviews/comments/${commentId}`,
    LIKE: (reviewId: number) => `/reviews/${reviewId}/like`,
  },

  // Collections
  COLLECTIONS: {
    BASE: '/collections',
    DETAIL: (id: number) => `/collections/${id}`,
    BY_USER: (userId: number) => `/collections/user/${userId}`,
    ISSUES: (collectionId: number) => `/collections/${collectionId}/issues`,
    ISSUE_DETAIL: (collectionId: number, issueId: number) =>
      `/collections/${collectionId}/issues/${issueId}`,
    READING_START: '/collections/reading/start',
    READING_PROGRESS: (issueId: number) => `/collections/reading/${issueId}`,
    READING_CURRENT: '/collections/reading/current',
  },

  // Scans
  SCANS: {
    BASE: '/scans',
    DETAIL: (id: number) => `/scans/${id}`,
    BY_ISSUE: (issueId: number) => `/scans/issue/${issueId}`,
    LATEST: '/scans/latest',
    SEARCH: '/scans/search',
    GROUPS: '/scans/groups',
    GROUP_DETAIL: (id: number) => `/scans/groups/${id}`,
  },

  // Favorites
  FAVORITES: {
    BASE: '/favorites',
    CHECK: (entityType: number, entityId: number) =>
      `/favorites/${entityType}/${entityId}`,
    REMOVE: (entityType: number, entityId: number) =>
      `/favorites/${entityType}/${entityId}`,
  },

  // Search
  SEARCH: {
    GLOBAL: '/search',
  },

  // Dashboard
  DASHBOARD: {
    BASE: '/dashboard',
  },

  // Comic Vine
  COMIC_VINE: {
    SEARCH: '/comicvine/search',
    SYNC_PUBLISHER: (comicVineId: number) =>
      `/comicvine/sync/publisher/${comicVineId}`,
    SYNC_CHARACTER: (comicVineId: number) =>
      `/comicvine/sync/character/${comicVineId}`,
    SYNC_TEAM: (comicVineId: number) =>
      `/comicvine/sync/team/${comicVineId}`,
    SYNC_CREATOR: (comicVineId: number) =>
      `/comicvine/sync/creator/${comicVineId}`,
    SYNC_VOLUME: (comicVineId: number) =>
      `/comicvine/sync/volume/${comicVineId}`,
    SYNC_ISSUE: (comicVineId: number) =>
      `/comicvine/sync/issue/${comicVineId}`,
    SYNC_STORY_ARC: (comicVineId: number) =>
      `/comicvine/sync/storyarc/${comicVineId}`,
  },

  // Health
  HEALTH: {
    BASE: '/health',
  },
} as const;

export type APIEndpoints = typeof API_ENDPOINTS;
