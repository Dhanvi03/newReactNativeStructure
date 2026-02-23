//These types represents the respose structure of the api (backend structure)

export interface LoginResponseDTO {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
