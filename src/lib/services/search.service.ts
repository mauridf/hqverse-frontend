import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { SearchResultDto } from '@/lib/types';

class SearchService {
  async globalSearch(query: string): Promise<SearchResultDto> {
    if (query.length < 2) {
      return {
        characters: [],
        series: [],
        issues: [],
        publishers: [],
        teams: [],
        creators: [],
        storyArcs: [],
      };
    }

    const response = await httpClient.get<{ data: SearchResultDto }>(
      API_ENDPOINTS.SEARCH.GLOBAL,
      { params: { query } }
    );
    return response.data;
  }
}

export const searchService = new SearchService();
