import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  StoryArcDto,
  StoryArcDetailDto,
  PaginatedResponse,
  PaginationParams,
} from '@/lib/types';

class StoryArcService {
  async getAll(
    params: PaginationParams & { search?: string } = {}
  ): Promise<PaginatedResponse<StoryArcDto>> {
    const response = await httpClient.get<PaginatedResponse<StoryArcDto>>(
      API_ENDPOINTS.STORY_ARCS.BASE,
      { params }
    );
    return response;
  }

  async search(query: string, params: PaginationParams = {}): Promise<PaginatedResponse<StoryArcDto>> {
    const response = await httpClient.get<PaginatedResponse<StoryArcDto>>(
      API_ENDPOINTS.STORY_ARCS.SEARCH,
      { params: { ...params, query } }
    );
    return response;
  }

  async getById(id: number): Promise<StoryArcDetailDto> {
    return httpClient.get<StoryArcDetailDto>(
      API_ENDPOINTS.STORY_ARCS.DETAIL(id)
    );
  }
}

export const storyArcService = new StoryArcService();
