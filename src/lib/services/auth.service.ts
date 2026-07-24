import { httpClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  AuthResponseDto,
  UserDto,
  UpdateUserDto,
  ChangePasswordDto,
} from '@/lib/types';

class AuthService {
  async register(data: RegisterDto): Promise<AuthResponseDto> {
    const response = await httpClient.post<{ data: AuthResponseDto }>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  }

  async login(data: LoginDto): Promise<AuthResponseDto> {
    const response = await httpClient.post<{ data: AuthResponseDto }>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return response.data;
  }

  async refresh(data: RefreshTokenDto): Promise<AuthResponseDto> {
    const response = await httpClient.post<{ data: AuthResponseDto }>(
      API_ENDPOINTS.AUTH.REFRESH,
      data
    );
    return response.data;
  }

  async logout(): Promise<void> {
    await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  async getProfile(): Promise<UserDto> {
    const response = await httpClient.get<{ data: UserDto }>(
      API_ENDPOINTS.AUTH.PROFILE
    );
    return response.data;
  }

  async updateProfile(data: UpdateUserDto): Promise<UserDto> {
    const response = await httpClient.put<{ data: UserDto }>(
      API_ENDPOINTS.AUTH.PROFILE,
      data
    );
    return response.data;
  }

  async changePassword(data: ChangePasswordDto): Promise<void> {
    await httpClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  }
}

export const authService = new AuthService();
