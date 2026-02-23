import { apiClient } from '@src/services/api/client';
import { USER_ENDPOINTS } from '@src/services/endpoints';
import { UserProfileDTO } from './user.dto';
import { UserAdapter } from './user.adapter';
import { UserModel } from '@src/types/models/user.model';

class UserService {
  async getProfile(): Promise<UserModel> {
    try {
      const response = await apiClient.get<UserProfileDTO>(
        USER_ENDPOINTS.PROFILE
      );
      return UserAdapter.toModel(response.data);
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  async updateProfile(data: any): Promise<UserModel> {
    try {
      const response = await apiClient.put<UserProfileDTO>(
        USER_ENDPOINTS.UPDATE,
        data
      );
      return UserAdapter.toModel(response.data);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  async getSettings(): Promise<any> {
    try {
      const response = await apiClient.get(USER_ENDPOINTS.SETTINGS);
      return response.data;
    } catch (error) {
      console.error('Get settings error:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
