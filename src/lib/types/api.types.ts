export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string | null;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export interface PaginationParams {
  pageNumber?: number;
  pageSize?: number;
}

export interface SearchParams extends PaginationParams {
  query?: string;
}

export interface ApiError extends Error {
  statusCode?: number;
  response?: ErrorResponse;
}
