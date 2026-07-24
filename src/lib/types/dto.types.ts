// ============ Auth DTOs ============
export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserDto;
}

export interface UserDto {
  id: number;
  username: string;
  displayName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  bio?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserDto {
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

// ============ Editorial DTOs ============
export interface PublisherDto {
  id: number;
  comicVineId?: number | null;
  name: string;
  description?: string | null;
  country?: string | null;
  foundationDate?: string | null;
  website?: string | null;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePublisherDto {
  name: string;
  description?: string;
  country?: string;
  foundationDate?: string;
  website?: string;
  logoUrl?: string;
  bannerUrl?: string;
}

export type UpdatePublisherDto = Partial<CreatePublisherDto>

export interface CharacterDto {
  id: number;
  comicVineId?: number | null;
  name: string;
  realName?: string | null;
  description?: string | null;
  firstAppearance?: string | null;
  gender?: string | null;
  alignment?: string | null;
  publisherId?: number | null;
  universeId?: number | null;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  publisher?: PublisherDto;
  universe?: UniverseDto;
}

export interface ComicSeriesDto {
  id: number;
  comicVineId?: number | null;
  name: string;
  description?: string | null;
  publisherId?: number | null;
  universeId?: number | null;
  startYear?: number | null;
  endYear?: number | null;
  totalIssues?: number | null;
  imageUrl?: string | null;
  bannerUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  publisher?: PublisherDto;
  universe?: UniverseDto;
}

export interface ComicIssueDto {
  id: number;
  comicVineId?: number | null;
  seriesId: number;
  issueNumber: string;
  title?: string | null;
  synopsis?: string | null;
  coverDate?: string | null;
  releaseDate?: string | null;
  pageCount?: number | null;
  isbn?: string | null;
  upc?: string | null;
  coverUrl?: string | null;
  thumbnailUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  series?: ComicSeriesDto;
}

export interface ComicIssueDetailDto extends ComicIssueDto {
  characters?: CharacterDto[];
  teams?: TeamDto[];
  creators?: CreatorRoleDto[];
  storyArcs?: StoryArcDto[];
  reviews?: ReviewDto[];
  scans?: ScanDto[];
}

export interface TeamDto {
  id: number;
  comicVineId?: number | null;
  name: string;
  description?: string | null;
  publisherId?: number | null;
  universeId?: number | null;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatorDto {
  id: number;
  comicVineId?: number | null;
  name: string;
  realName?: string | null;
  description?: string | null;
  birthDate?: string | null;
  deathDate?: string | null;
  website?: string | null;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatorRoleDto {
  creator: CreatorDto;
  role: string;
}

export interface StoryArcDto {
  id: number;
  comicVineId?: number | null;
  name: string;
  description?: string | null;
  publisherId?: number | null;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StoryArcDetailDto extends StoryArcDto {
  issues?: ComicIssueDto[];
}

export interface UniverseDto {
  id: number;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ============ Review DTOs ============
export interface ReviewDto {
  id: number;
  userId: number;
  issueId: number;
  title: string;
  content?: string | null;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user?: UserDto;
  issue?: ComicIssueDto;
  likeCount?: number;
  commentCount?: number;
  isLikedByUser?: boolean;
}

export interface CreateReviewDto {
  issueId: number;
  title: string;
  content?: string;
  rating: number;
}

export interface CommentDto {
  id: number;
  userId: number;
  reviewId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user?: UserDto;
}

export interface CreateCommentDto {
  content: string;
}

// ============ Collection DTOs ============
export interface UserCollectionDto {
  id: number;
  userId: number;
  name: string;
  description?: string | null;
  isPublic: boolean;
  issueCount: number;
  createdAt: string;
  updatedAt: string;
  user?: UserDto;
}

export interface UserCollectionDetailDto extends UserCollectionDto {
  issues?: CollectionIssueDto[];
}

export interface CollectionIssueDto {
  collectionId: number;
  issueId: number;
  readStatus: ReadStatus;
  rating?: number | null;
  favorite: boolean;
  notes?: string | null;
  addedAt: string;
  issue?: ComicIssueDto;
}

export interface CreateCollectionDto {
  name: string;
  description?: string;
  isPublic?: boolean;
}

export interface UpdateCollectionDto {
  name?: string;
  description?: string;
  isPublic?: boolean;
}

export interface AddIssueToCollectionDto {
  issueId: number;
  readStatus?: ReadStatus;
  rating?: number;
  notes?: string;
}

// ============ Reading Progress DTOs ============
export interface ReadingProgressDto {
  id: number;
  userId: number;
  issueId: number;
  currentPage: number;
  progressPercent: number;
  startedAt: string;
  finishedAt?: string | null;
  updatedAt: string;
  issue?: ComicIssueDto;
}

export interface StartReadingDto {
  issueId: number;
}

export interface UpdateReadingProgressDto {
  currentPage: number;
}

// ============ Scan DTOs ============
export interface ScanGroupDto {
  id: number;
  name: string;
  description?: string | null;
  discord?: string | null;
  telegram?: string | null;
  website?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ScanDto {
  id: number;
  issueId: number;
  scanGroupId?: number | null;
  version?: string | null;
  language: string;
  pages?: number | null;
  fileSize?: number | null;
  format?: string | null;
  quality?: string | null;
  uploaderUserId?: number | null;
  createdAt: string;
  scanGroup?: ScanGroupDto;
  uploader?: UserDto;
  links?: ScanLinkDto[];
}

export interface ScanLinkDto {
  id: number;
  scanId: number;
  url: string;
  linkType: ScanLinkType;
  label?: string | null;
  createdAt: string;
}

export interface CreateScanGroupDto {
  name: string;
  description?: string;
  discord?: string;
  telegram?: string;
  website?: string;
}

export interface CreateScanDto {
  issueId: number;
  scanGroupId?: number;
  version?: string;
  language?: string;
  pages?: number;
  fileSize?: number;
  format?: string;
  quality?: string;
}

// ============ Favorite DTOs ============
export interface FavoriteDto {
  id: number;
  userId: number;
  entityType: EntityType;
  entityId: number;
  createdAt: string;
}

export interface AddFavoriteDto {
  entityType: EntityType;
  entityId: number;
}

// ============ Search DTOs ============
export interface SearchResultDto {
  characters: SearchItemDto[];
  series: SearchItemDto[];
  issues: SearchItemDto[];
  publishers: SearchItemDto[];
  teams: SearchItemDto[];
  creators: SearchItemDto[];
  storyArcs: SearchItemDto[];
}

export interface SearchItemDto {
  id: number;
  type: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  url: string;
}

// ============ Dashboard DTOs ============
export interface DashboardDto {
  stats: DashboardStatsDto;
  publisherStats: PublisherStatsDto[];
}

export interface DashboardStatsDto {
  publishers: number;
  characters: number;
  series: number;
  issues: number;
  scans: number;
  reviews: number;
  users: number;
}

export interface PublisherStatsDto {
  publisherId: number;
  publisherName: string;
  comicCount: number;
  characterCount: number;
}

// ============ Enums ============
export enum UserRole {
  User = 'User',
  Moderator = 'Moderator',
  Admin = 'Admin',
}

export enum ReadStatus {
  Wishlist = 1,
  Reading = 2,
  Read = 3,
  Abandoned = 4,
}

export enum EntityType {
  Character = 1,
  ComicSeries = 2,
  Publisher = 3,
  Team = 4,
  StoryArc = 5,
  ComicIssue = 6,
  Creator = 7,
}

export enum ScanLinkType {
  Download = 1,
  ReadOnline = 2,
  Mirror = 3,
  Torrent = 4,
}

export enum ScanQuality {
  HQ = 'HQ',
  GOOD = 'GOOD',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}
