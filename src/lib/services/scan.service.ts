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
    const response = await httpClient.get<{ data: ScanGroupDto[] }>(
      API_ENDPOINTS.SCANS.GROUPS
    );
    return response.data;
  }

  async getGroupById(id: number): Promise<ScanGroupDto> {
    const response = await httpClient.get<{ data: ScanGroupDto }>(
      API_ENDPOINTS.SCANS.GROUP_DETAIL(id)
    );
    return response.data;
  }

  async createGroup(data: CreateScanGroupDto): Promise<ScanGroupDto> {
    const response = await httpClient.post<{ data: ScanGroupDto }>(
      API_ENDPOINTS.SCANS.GROUPS,
      data
    );
    return response.data;
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
    const response = await httpClient.get<{ data: ScanDetailDto }>(
      API_ENDPOINTS.SCANS.DETAIL(id)
    );
    return response.data;
  }

  async create(data: CreateScanDto): Promise<ScanDto> {
    const response = await httpClient.post<{ data: ScanDto }>(
      API_ENDPOINTS.SCANS.BASE,
      data
    );
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.SCANS.DETAIL(id));
  }
}

export const scanService = new ScanService();
