import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from 'axios';
import { toast } from 'react-hot-toast';
import type { ErrorResponse, ApiResponse } from '@/lib/types/api.types';

class HttpClient {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: string | null) => void;
    reject: (reason?: unknown) => void;
  }> = [];
  private accessToken: string | null = null;
  private refreshTokenValue: string | null = null;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

    this.instance = axios.create({
      baseURL: `${baseURL}/api`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.loadTokensFromStorage();
    this.setupInterceptors();
  }

  private loadTokensFromStorage(): void {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
      this.refreshTokenValue = localStorage.getItem('refreshToken');
    }
  }

  private setupInterceptors(): void {
    // Request Interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add Authorization header if token exists
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }

        // Add Correlation ID
        const correlationId = this.generateCorrelationId();
        config.headers['X-Correlation-Id'] = correlationId;

        // Add source parameter for debugging
        config.headers['X-Source'] = 'web';

        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Response Interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log successful requests in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
        }
        return response;
      },
      async (error: AxiosError<ErrorResponse>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle network errors
        if (!error.response) {
          toast.error('Erro de conexão com o servidor. Verifique sua internet.');
          return Promise.reject(error);
        }

        // Handle 401 Unauthorized - try to refresh token
        if (
          error.response.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url?.includes('/auth/refresh') &&
          !originalRequest.url?.includes('/auth/login') &&
          !originalRequest.url?.includes('/auth/register')
        ) {
          if (this.isRefreshing) {
            // Queue the request while refreshing
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.instance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const newToken = await this.refreshAccessToken();
            this.setAccessToken(newToken);

            // Process queued requests
            this.failedQueue.forEach(({ resolve }) => resolve(newToken));
            this.failedQueue = [];

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            // Clear tokens and redirect to login
            this.clearTokens();
            this.failedQueue.forEach(({ reject }) => reject(refreshError));
            this.failedQueue = [];

            // Redirect to login page
            if (typeof window !== 'undefined') {
              toast.error('Sua sessão expirou. Faça login novamente.');
              // Small delay to ensure toast is shown
              setTimeout(() => {
                window.location.href = '/login';
              }, 1000);
            }

            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Handle other errors
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post<ApiResponse<{ accessToken: string; refreshToken?: string }>>(
        `${this.instance.defaults.baseURL}/auth/refresh`,
        { refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      // Update refresh token if a new one is provided
      if (newRefreshToken) {
        this.setRefreshToken(newRefreshToken);
      }

      return accessToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  }

  private handleError(error: AxiosError<ErrorResponse>): void {
    const { response, config } = error;

    if (!response) {
      toast.error('Erro de conexão com o servidor');
      return;
    }

    const { status, data } = response;

    // Check for rate limiting
    if (status === 429) {
      toast.error('Muitas requisições. Aguarde um momento e tente novamente.');
      return;
    }

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[API Error] ${config?.method?.toUpperCase()} ${config?.url} - ${status}`, data);
    }

    // Show error message based on status code
    const message = data?.message || 'Ocorreu um erro inesperado';

    switch (status) {
      case 400:
        toast.error(message);
        break;
      case 401:
        // Already handled in interceptor
        break;
      case 403:
        toast.error('Você não tem permissão para realizar esta ação');
        break;
      case 404:
        toast.error('Recurso não encontrado');
        break;
      case 409:
        toast.error(message || 'Conflito de dados');
        break;
      case 422:
        // Handle validation errors with details
        if (data?.errors) {
          const errorMessages = Object.values(data.errors).flat();
          const firstError = errorMessages[0];
          toast.error(firstError || 'Dados inválidos');
        } else {
          toast.error(message);
        }
        break;
      case 500:
        toast.error('Erro interno do servidor. Tente novamente mais tarde.');
        break;
      default:
        toast.error(message);
    }
  }

  private generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  // Token management methods
  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
  }

  private setAccessToken(token: string): void {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  }

  private setRefreshToken(token: string): void {
    this.refreshTokenValue = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('refreshToken', token);
    }
  }

  private clearTokens(): void {
    this.accessToken = null;
    this.refreshTokenValue = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  // Public methods for auth management
  public setAuthTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  public clearAuthTokens(): void {
    this.clearTokens();
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  // HTTP methods
  public get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(url, config).then((res: AxiosResponse<T>) => res.data);
  }

  public post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post<T>(url, data, config).then((res: AxiosResponse<T>) => res.data);
  }

  public put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put<T>(url, data, config).then((res: AxiosResponse<T>) => res.data);
  }

  public patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch<T>(url, data, config).then((res: AxiosResponse<T>) => res.data);
  }

  public delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete<T>(url, config).then((res: AxiosResponse<T>) => res.data);
  }

  // Manual refresh method for external use
  public async manualRefreshToken(): Promise<string> {
    return this.refreshAccessToken();
  }
}

// Singleton instance
export const httpClient = new HttpClient();

// Export types
export type { AxiosRequestConfig, AxiosError };
