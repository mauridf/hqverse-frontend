import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  UniverseDto,
  PaginatedResponse,
  PaginationParams,
} from '@/lib/types';

class UniverseService {
  async getAll(params: PaginationParams = {}): Promise<PaginatedResponse<UniverseDto>> {
    const response = await httpClient.get<PaginatedResponse<UniverseDto>>(
      API_ENDPOINTS.UNIVERSES.BASE,
      { params }
    );
    return response;
  }

  async getById(id: number): Promise<UniverseDto> {
    const response = await httpClient.get<{ data: UniverseDto }>(
      API_ENDPOINTS.UNIVERSES.DETAIL(id)
    );
    return response.data;
  }
}

export const universeService = new UniverseService();
