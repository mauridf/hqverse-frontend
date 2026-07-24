import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  ComicSeriesDto,
  PaginatedResponse,
  PaginationParams,
} from '@/lib/types';

class SeriesService {
  async getAll(
    params: PaginationParams & { search?: string; publisherId?: number } = {}
  ): Promise<PaginatedResponse<ComicSeriesDto>> {
    const response = await httpClient.get<PaginatedResponse<ComicSeriesDto>>(
      API_ENDPOINTS.COMIC_SERIES.BASE,
      { params }
    );
    return response;
  }

  async search(query: string, params: PaginationParams = {}): Promise<PaginatedResponse<ComicSeriesDto>> {
    const response = await httpClient.get<PaginatedResponse<ComicSeriesDto>>(
      API_ENDPOINTS.COMIC_SERIES.SEARCH,
      { params: { ...params, query } }
    );
    return response;
  }

  async getById(id: number): Promise<ComicSeriesDto> {
    const response = await httpClient.get<{ data: ComicSeriesDto }>(
      API_ENDPOINTS.COMIC_SERIES.DETAIL(id)
    );
    return response.data;
  }
}

export const seriesService = new SeriesService();