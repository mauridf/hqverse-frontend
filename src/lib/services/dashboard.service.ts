import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { DashboardDto } from '@/lib/types';

class DashboardService {
  async getStats(): Promise<DashboardDto> {
    return httpClient.get<DashboardDto>(
      API_ENDPOINTS.DASHBOARD.BASE
    );
  }
}

export const dashboardService = new DashboardService();
