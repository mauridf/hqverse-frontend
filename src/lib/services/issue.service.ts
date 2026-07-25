import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  ComicIssueDto,
  ComicIssueDetailDto,
  PaginatedResponse,
  PaginationParams,
} from '@/lib/types';

class IssueService {
  async getAll(
    params: PaginationParams & { seriesId?: number } = {}
  ): Promise<PaginatedResponse<ComicIssueDto>> {
    const response = await httpClient.get<PaginatedResponse<ComicIssueDto>>(
      API_ENDPOINTS.COMIC_ISSUES.BASE,
      { params }
    );
    return response;
  }

  async getById(id: number): Promise<ComicIssueDetailDto> {
    return httpClient.get<ComicIssueDetailDto>(
      API_ENDPOINTS.COMIC_ISSUES.DETAIL(id)
    );
  }

  async getBySeries(
    seriesId: number,
    params: PaginationParams = {}
  ): Promise<PaginatedResponse<ComicIssueDto>> {
    const response = await httpClient.get<PaginatedResponse<ComicIssueDto>>(
      API_ENDPOINTS.COMIC_ISSUES.BY_SERIES(seriesId),
      { params }
    );
    return response;
  }
}

export const issueService = new IssueService();
