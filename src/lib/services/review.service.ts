import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  ReviewDto,
  CreateReviewDto,
  CommentDto,
  CreateCommentDto,
  PaginatedResponse,
  PaginationParams,
} from '@/lib/types';

class ReviewService {
  async getByIssue(
    issueId: number,
    params: PaginationParams = {}
  ): Promise<PaginatedResponse<ReviewDto>> {
    const response = await httpClient.get<PaginatedResponse<ReviewDto>>(
      API_ENDPOINTS.REVIEWS.BY_ISSUE(issueId),
      { params }
    );
    return response;
  }

  async getByUser(
    userId: number,
    params: PaginationParams = {}
  ): Promise<PaginatedResponse<ReviewDto>> {
    const response = await httpClient.get<PaginatedResponse<ReviewDto>>(
      API_ENDPOINTS.REVIEWS.BY_USER(userId),
      { params }
    );
    return response;
  }

  async getById(id: number): Promise<ReviewDto> {
    const response = await httpClient.get<{ data: ReviewDto }>(
      API_ENDPOINTS.REVIEWS.DETAIL(id)
    );
    return response.data;
  }

  async create(data: CreateReviewDto): Promise<ReviewDto> {
    const response = await httpClient.post<{ data: ReviewDto }>(
      API_ENDPOINTS.REVIEWS.BASE,
      data
    );
    return response.data;
  }

  async update(id: number, data: Partial<CreateReviewDto>): Promise<ReviewDto> {
    const response = await httpClient.put<{ data: ReviewDto }>(
      API_ENDPOINTS.REVIEWS.DETAIL(id),
      data
    );
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.REVIEWS.DETAIL(id));
  }

  async addComment(reviewId: number, data: CreateCommentDto): Promise<CommentDto> {
    const response = await httpClient.post<{ data: CommentDto }>(
      API_ENDPOINTS.REVIEWS.COMMENTS(reviewId),
      data
    );
    return response.data;
  }

  async deleteComment(commentId: number): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.REVIEWS.COMMENT(commentId));
  }

  async toggleLike(reviewId: number): Promise<{ liked: boolean; likeCount: number }> {
    const response = await httpClient.post<{ data: { liked: boolean; likeCount: number } }>(
      API_ENDPOINTS.REVIEWS.LIKE(reviewId)
    );
    return response.data;
  }
}

export const reviewService = new ReviewService();
