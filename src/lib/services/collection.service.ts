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
    const response = await httpClient.get<{ data: UserCollectionDetailDto }>(
      API_ENDPOINTS.COLLECTIONS.DETAIL(id)
    );
    return response.data;
  }

  async create(data: CreateCollectionDto): Promise<UserCollectionDto> {
    const response = await httpClient.post<{ data: UserCollectionDto }>(
      API_ENDPOINTS.COLLECTIONS.BASE,
      data
    );
    return response.data;
  }

  async update(id: number, data: UpdateCollectionDto): Promise<UserCollectionDto> {
    const response = await httpClient.put<{ data: UserCollectionDto }>(
      API_ENDPOINTS.COLLECTIONS.DETAIL(id),
      data
    );
    return response.data;
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
    const response = await httpClient.post<{ data: ReadingProgressDto }>(
      API_ENDPOINTS.COLLECTIONS.READING_START,
      data
    );
    return response.data;
  }

  async updateReadingProgress(
    issueId: number,
    data: UpdateReadingProgressDto
  ): Promise<ReadingProgressDto> {
    const response = await httpClient.put<{ data: ReadingProgressDto }>(
      API_ENDPOINTS.COLLECTIONS.READING_PROGRESS(issueId),
      data
    );
    return response.data;
  }

  async getReadingProgress(issueId: number): Promise<ReadingProgressDto> {
    const response = await httpClient.get<{ data: ReadingProgressDto }>(
      API_ENDPOINTS.COLLECTIONS.READING_PROGRESS(issueId)
    );
    return response.data;
  }

  async getCurrentReadings(): Promise<ReadingProgressDto[]> {
    const response = await httpClient.get<{ data: ReadingProgressDto[] }>(
      API_ENDPOINTS.COLLECTIONS.READING_CURRENT
    );
    return response.data;
  }
}

export const collectionService = new CollectionService();
