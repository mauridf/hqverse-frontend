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

    return httpClient.get<SearchResultDto>(
      API_ENDPOINTS.SEARCH.GLOBAL,
      { params: { query } }
    );
  }
}

export const searchService = new SearchService();
