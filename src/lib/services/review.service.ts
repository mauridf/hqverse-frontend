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
    return httpClient.get<ReviewDto>(
      API_ENDPOINTS.REVIEWS.DETAIL(id)
    );
  }

  async create(data: CreateReviewDto): Promise<ReviewDto> {
    return httpClient.post<ReviewDto>(
      API_ENDPOINTS.REVIEWS.BASE,
      data
    );
  }

  async update(id: number, data: Partial<CreateReviewDto>): Promise<ReviewDto> {
    return httpClient.put<ReviewDto>(
      API_ENDPOINTS.REVIEWS.DETAIL(id),
      data
    );
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.REVIEWS.DETAIL(id));
  }

  async addComment(reviewId: number, data: CreateCommentDto): Promise<CommentDto> {
    return httpClient.post<CommentDto>(
      API_ENDPOINTS.REVIEWS.COMMENTS(reviewId),
      data
    );
  }

  async deleteComment(commentId: number): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.REVIEWS.COMMENT(commentId));
  }

  async toggleLike(reviewId: number): Promise<{ liked: boolean; likeCount: number }> {
    return httpClient.post<{ liked: boolean; likeCount: number }>(
      API_ENDPOINTS.REVIEWS.LIKE(reviewId)
    );
  }
}

export const reviewService = new ReviewService();
