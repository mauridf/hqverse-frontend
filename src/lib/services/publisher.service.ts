import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  PublisherDto,
  CreatePublisherDto,
  UpdatePublisherDto,
  PaginatedResponse,
  PaginationParams,
} from '@/lib/types';

class PublisherService {
  async getAll(
    params: PaginationParams & { search?: string } = {}
  ): Promise<PaginatedResponse<PublisherDto>> {
    const response = await httpClient.get<PaginatedResponse<PublisherDto>>(
      API_ENDPOINTS.PUBLISHERS.BASE,
      { params }
    );
    return response;
  }

  async getById(id: number): Promise<PublisherDto> {
    const response = await httpClient.get<{ data: PublisherDto }>(
      API_ENDPOINTS.PUBLISHERS.DETAIL(id)
    );
    return response.data;
  }

  async create(data: CreatePublisherDto): Promise<PublisherDto> {
    const response = await httpClient.post<{ data: PublisherDto }>(
      API_ENDPOINTS.PUBLISHERS.BASE,
      data
    );
    return response.data;
  }

  async update(id: number, data: UpdatePublisherDto): Promise<PublisherDto> {
    const response = await httpClient.put<{ data: PublisherDto }>(
      API_ENDPOINTS.PUBLISHERS.DETAIL(id),
      data
    );
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.PUBLISHERS.DETAIL(id));
  }
}

export const publisherService = new PublisherService();
