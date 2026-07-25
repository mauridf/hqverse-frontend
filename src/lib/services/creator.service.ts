import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  CreatorDto,
  PaginatedResponse,
  PaginationParams,
} from '@/lib/types';

class CreatorService {
  async getAll(
    params: PaginationParams & { search?: string } = {}
  ): Promise<PaginatedResponse<CreatorDto>> {
    const response = await httpClient.get<PaginatedResponse<CreatorDto>>(
      API_ENDPOINTS.CREATORS.BASE,
      { params }
    );
    return response;
  }

  async search(query: string, params: PaginationParams = {}): Promise<PaginatedResponse<CreatorDto>> {
    const response = await httpClient.get<PaginatedResponse<CreatorDto>>(
      API_ENDPOINTS.CREATORS.SEARCH,
      { params: { ...params, query } }
    );
    return response;
  }

  async getById(id: number): Promise<CreatorDto> {
    return httpClient.get<CreatorDto>(
      API_ENDPOINTS.CREATORS.DETAIL(id)
    );
  }
}

export const creatorService = new CreatorService();
