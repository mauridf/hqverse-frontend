import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  ScanDto,
  ScanGroupDto,
  ScanDetailDto,
  CreateScanGroupDto,
  CreateScanDto,
  PaginatedResponse,
  PaginationParams,
} from '@/lib/types';

class ScanService {
  // Scan Groups
  async getGroups(): Promise<ScanGroupDto[]> {
    return httpClient.get<ScanGroupDto[]>(
      API_ENDPOINTS.SCANS.GROUPS
    );
  }

  async getGroupById(id: number): Promise<ScanGroupDto> {
    return httpClient.get<ScanGroupDto>(
      API_ENDPOINTS.SCANS.GROUP_DETAIL(id)
    );
  }

  async createGroup(data: CreateScanGroupDto): Promise<ScanGroupDto> {
    return httpClient.post<ScanGroupDto>(
      API_ENDPOINTS.SCANS.GROUPS,
      data
    );
  }

  // Scans
  async getByIssue(
    issueId: number,
    params: PaginationParams = {}
  ): Promise<PaginatedResponse<ScanDto>> {
    const response = await httpClient.get<PaginatedResponse<ScanDto>>(
      API_ENDPOINTS.SCANS.BY_ISSUE(issueId),
      { params }
    );
    return response;
  }

  async getLatest(params: PaginationParams = {}): Promise<PaginatedResponse<ScanDto>> {
    const response = await httpClient.get<PaginatedResponse<ScanDto>>(
      API_ENDPOINTS.SCANS.LATEST,
      { params }
    );
    return response;
  }

  async search(
    query: string,
    params: PaginationParams = {}
  ): Promise<PaginatedResponse<ScanDto>> {
    const response = await httpClient.get<PaginatedResponse<ScanDto>>(
      API_ENDPOINTS.SCANS.SEARCH,
      { params: { ...params, query } }
    );
    return response;
  }

  async getById(id: number): Promise<ScanDetailDto> {
    return httpClient.get<ScanDetailDto>(
      API_ENDPOINTS.SCANS.DETAIL(id)
    );
  }

  async create(data: CreateScanDto): Promise<ScanDto> {
    return httpClient.post<ScanDto>(
      API_ENDPOINTS.SCANS.BASE,
      data
    );
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.SCANS.DETAIL(id));
  }
}

export const scanService = new ScanService();
