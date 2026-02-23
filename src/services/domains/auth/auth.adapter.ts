import { LoginResponseDTO } from './auth.dto';
import { AuthModel } from '@src/types/models/auth.model';

//remove extra fields from response 
//convert dto to model

export class AuthAdapter {
  static toModel(dto: LoginResponseDTO): AuthModel {
    return {
      id: dto.user.id,
      email: dto.user.email,
      name: dto.user.name,
      token: dto.token,
      refreshToken: dto.refreshToken,
    };
  }
}
