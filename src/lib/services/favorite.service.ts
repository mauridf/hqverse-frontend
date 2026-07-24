import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { FavoriteDto, AddFavoriteDto, EntityType } from '@/lib/types';

class FavoriteService {
  async getAll(): Promise<FavoriteDto[]> {
    const response = await httpClient.get<{ data: FavoriteDto[] }>(
      API_ENDPOINTS.FAVORITES.BASE
    );
    return response.data;
  }

  async add(data: AddFavoriteDto): Promise<FavoriteDto> {
    const response = await httpClient.post<{ data: FavoriteDto }>(
      API_ENDPOINTS.FAVORITES.BASE,
      data
    );
    return response.data;
  }

  async remove(entityType: EntityType, entityId: number): Promise<void> {
    await httpClient.delete(
      API_ENDPOINTS.FAVORITES.REMOVE(entityType, entityId)
    );
  }

  async check(entityType: EntityType, entityId: number): Promise<boolean> {
    const response = await httpClient.get<{ data: boolean }>(
      API_ENDPOINTS.FAVORITES.CHECK(entityType, entityId)
    );
    return response.data;
  }
}

export const favoriteService = new FavoriteService();
