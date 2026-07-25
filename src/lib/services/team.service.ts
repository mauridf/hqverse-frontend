import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  TeamDto,
  PaginatedResponse,
  PaginationParams,
} from '@/lib/types';

class TeamService {
  async getAll(
    params: PaginationParams & { search?: string } = {}
  ): Promise<PaginatedResponse<TeamDto>> {
    const response = await httpClient.get<PaginatedResponse<TeamDto>>(
      API_ENDPOINTS.TEAMS.BASE,
      { params }
    );
    return response;
  }

  async search(query: string, params: PaginationParams = {}): Promise<PaginatedResponse<TeamDto>> {
    const response = await httpClient.get<PaginatedResponse<TeamDto>>(
      API_ENDPOINTS.TEAMS.SEARCH,
      { params: { ...params, query } }
    );
    return response;
  }

  async getById(id: number): Promise<TeamDto> {
    return httpClient.get<TeamDto>(
      API_ENDPOINTS.TEAMS.DETAIL(id)
    );
  }
}

export const teamService = new TeamService();