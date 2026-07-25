import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { FavoriteDto, AddFavoriteDto, EntityType } from '@/lib/types';

class FavoriteService {
  async getAll(): Promise<FavoriteDto[]> {
    return httpClient.get<FavoriteDto[]>(
      API_ENDPOINTS.FAVORITES.BASE
    );
  }

  async add(data: AddFavoriteDto): Promise<FavoriteDto> {
    return httpClient.post<FavoriteDto>(
      API_ENDPOINTS.FAVORITES.BASE,
      data
    );
  }

  async remove(entityType: EntityType, entityId: number): Promise<void> {
    await httpClient.delete(
      API_ENDPOINTS.FAVORITES.REMOVE(entityType, entityId)
    );
  }

  async check(entityType: EntityType, entityId: number): Promise<boolean> {
    return httpClient.get<boolean>(
      API_ENDPOINTS.FAVORITES.CHECK(entityType, entityId)
    );
  }
}

export const favoriteService = new FavoriteService();
