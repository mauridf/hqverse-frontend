import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  CharacterDto,
  PaginatedResponse,
  PaginationParams,
} from '@/lib/types';

class CharacterService {
  async getAll(
    params: PaginationParams & { search?: string; publisherId?: number } = {}
  ): Promise<PaginatedResponse<CharacterDto>> {
    const response = await httpClient.get<PaginatedResponse<CharacterDto>>(
      API_ENDPOINTS.CHARACTERS.BASE,
      { params }
    );
    return response;
  }

  async search(query: string, params: PaginationParams = {}): Promise<PaginatedResponse<CharacterDto>> {
    const response = await httpClient.get<PaginatedResponse<CharacterDto>>(
      API_ENDPOINTS.CHARACTERS.SEARCH,
      { params: { ...params, query } }
    );
    return response;
  }

  async getById(id: number): Promise<CharacterDto> {
    const response = await httpClient.get<{ data: CharacterDto }>(
      API_ENDPOINTS.CHARACTERS.DETAIL(id)
    );
    return response.data;
  }
}

export const characterService = new CharacterService();