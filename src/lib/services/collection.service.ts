import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  UserCollectionDto,
  UserCollectionDetailDto,
  CreateCollectionDto,
  UpdateCollectionDto,
  AddIssueToCollectionDto,
  CollectionIssueDto,
  ReadingProgressDto,
  StartReadingDto,
  UpdateReadingProgressDto,
  PaginatedResponse,
  PaginationParams,
} from '@/lib/types';

class CollectionService {
  // Collection CRUD
  async getUserCollections(
    userId: number,
    params: PaginationParams = {}
  ): Promise<PaginatedResponse<UserCollectionDto>> {
    const response = await httpClient.get<PaginatedResponse<UserCollectionDto>>(
      API_ENDPOINTS.COLLECTIONS.BY_USER(userId),
      { params }
    );
    return response;
  }

  async getById(id: number): Promise<UserCollectionDetailDto> {
    return httpClient.get<UserCollectionDetailDto>(
      API_ENDPOINTS.COLLECTIONS.DETAIL(id)
    );
  }

  async create(data: CreateCollectionDto): Promise<UserCollectionDto> {
    return httpClient.post<UserCollectionDto>(
      API_ENDPOINTS.COLLECTIONS.BASE,
      data
    );
  }

  async update(id: number, data: UpdateCollectionDto): Promise<UserCollectionDto> {
    return httpClient.put<UserCollectionDto>(
      API_ENDPOINTS.COLLECTIONS.DETAIL(id),
      data
    );
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.COLLECTIONS.DETAIL(id));
  }

  // Collection Issues
  async addIssue(
    collectionId: number,
    data: AddIssueToCollectionDto
  ): Promise<void> {
    await httpClient.post(
      API_ENDPOINTS.COLLECTIONS.ISSUES(collectionId),
      data
    );
  }

  async removeIssue(collectionId: number, issueId: number): Promise<void> {
    await httpClient.delete(
      API_ENDPOINTS.COLLECTIONS.ISSUE_DETAIL(collectionId, issueId)
    );
  }

  async updateIssueStatus(
    collectionId: number,
    issueId: number,
    data: Partial<CollectionIssueDto>
  ): Promise<void> {
    await httpClient.put(
      API_ENDPOINTS.COLLECTIONS.ISSUE_DETAIL(collectionId, issueId),
      data
    );
  }

  // Reading Progress
  async startReading(data: StartReadingDto): Promise<ReadingProgressDto> {
    return httpClient.post<ReadingProgressDto>(
      API_ENDPOINTS.COLLECTIONS.READING_START,
      data
    );
  }

  async updateReadingProgress(
    issueId: number,
    data: UpdateReadingProgressDto
  ): Promise<ReadingProgressDto> {
    return httpClient.put<ReadingProgressDto>(
      API_ENDPOINTS.COLLECTIONS.READING_PROGRESS(issueId),
      data
    );
  }

  async getReadingProgress(issueId: number): Promise<ReadingProgressDto> {
    return httpClient.get<ReadingProgressDto>(
      API_ENDPOINTS.COLLECTIONS.READING_PROGRESS(issueId)
    );
  }

  async getCurrentReadings(): Promise<ReadingProgressDto[]> {
    return httpClient.get<ReadingProgressDto[]>(
      API_ENDPOINTS.COLLECTIONS.READING_CURRENT
    );
  }
}

export const collectionService = new CollectionService();
