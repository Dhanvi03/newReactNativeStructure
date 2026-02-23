import { UserProfileDTO } from './user.dto';
import { UserModel } from '@src/types/models/user.model';

export class UserAdapter {
  static toModel(dto: UserProfileDTO): UserModel {
    return {
      id: dto.id,
      email: dto.email,
      name: dto.name,
      avatarUrl: dto.avatar_url,
      createdAt: new Date(dto.created_at * 1000),
    };
  }
}
