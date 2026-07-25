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
    return httpClient.get<PublisherDto>(
      API_ENDPOINTS.PUBLISHERS.DETAIL(id)
    );
  }

  async create(data: CreatePublisherDto): Promise<PublisherDto> {
    return httpClient.post<PublisherDto>(
      API_ENDPOINTS.PUBLISHERS.BASE,
      data
    );
  }

  async update(id: number, data: UpdatePublisherDto): Promise<PublisherDto> {
    return httpClient.put<PublisherDto>(
      API_ENDPOINTS.PUBLISHERS.DETAIL(id),
      data
    );
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.PUBLISHERS.DETAIL(id));
  }
}

export const publisherService = new PublisherService();
