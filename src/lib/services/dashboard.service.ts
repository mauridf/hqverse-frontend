import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { DashboardDto } from '@/lib/types';

class DashboardService {
  async getStats(): Promise<DashboardDto> {
    const response = await httpClient.get<{ data: DashboardDto }>(
      API_ENDPOINTS.DASHBOARD.BASE
    );
    return response.data;
  }
}

export const dashboardService = new DashboardService();
