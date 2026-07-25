export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string | null;
}

export interface PaginatedResponse<T = unknown> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
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
  page?: number;
  pageSize?: number;
}

export interface SearchParams extends PaginationParams {
  query?: string;
}

export interface ApiError extends Error {
  statusCode?: number;
  response?: ErrorResponse;
}
