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
    return httpClient.post<AuthResponseDto>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
  }

  async login(data: LoginDto): Promise<AuthResponseDto> {
    return httpClient.post<AuthResponseDto>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
  }

  async refresh(data: RefreshTokenDto): Promise<AuthResponseDto> {
    return httpClient.post<AuthResponseDto>(
      API_ENDPOINTS.AUTH.REFRESH,
      data
    );
  }

  async logout(): Promise<void> {
    await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  async getProfile(): Promise<UserDto> {
    return httpClient.get<UserDto>(API_ENDPOINTS.AUTH.PROFILE);
  }

  async updateProfile(data: UpdateUserDto): Promise<UserDto> {
    return httpClient.put<UserDto>(API_ENDPOINTS.AUTH.PROFILE, data);
  }

  async changePassword(data: ChangePasswordDto): Promise<void> {
    await httpClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  }
}

export const authService = new AuthService();
