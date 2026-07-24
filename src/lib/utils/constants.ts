export const SITE_NAME = 'HQVERSE';
export const SITE_DESCRIPTION = 'A maior comunidade de HQs digitalizadas';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const USER_ROLES = {
  USER: 'User',
  MODERATOR: 'Moderator',
  ADMIN: 'Admin',
} as const;

export const READ_STATUS = {
  WISHLIST: 1,
  READING: 2,
  READ: 3,
  ABANDONED: 4,
} as const;

export const ENTITY_TYPES = {
  CHARACTER: 1,
  COMIC_SERIES: 2,
  PUBLISHER: 3,
  TEAM: 4,
  STORY_ARC: 5,
  COMIC_ISSUE: 6,
  CREATOR: 7,
} as const;

export const SCAN_LINK_TYPES = {
  DOWNLOAD: 1,
  READONLINE: 2,
  MIRROR: 3,
  TORRENT: 4,
} as const;

export const SCAN_QUALITIES = {
  HQ: 'HQ',
  GOOD: 'GOOD',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
} as const;
