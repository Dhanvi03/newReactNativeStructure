import { apiClient, AUTH_ENDPOINTS } from '@src/services';
import { LoginResponseDTO } from './auth.dto';
import { AuthAdapter } from './auth.adapter';
import { AuthModel } from '@src/types/models/auth.model';
import { LoginRequest } from './auth.types';

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthModel> {
    try {
      const response = await apiClient.post<LoginResponseDTO>(
        AUTH_ENDPOINTS.LOGIN,
        credentials
      );
      return AuthAdapter.toModel(response.data);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }


  // async logout(): Promise<void> {
  //   try {
  //     await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //     throw error;
  //   }
  // }

  // async refresh(token: string): Promise<any> {
  //   try {
  //     const response = await apiClient.post(AUTH_ENDPOINTS.REFRESH, { token });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Refresh token error:', error);
  //     throw error;
  //   }
  // }
}

export const authService = new AuthService();
