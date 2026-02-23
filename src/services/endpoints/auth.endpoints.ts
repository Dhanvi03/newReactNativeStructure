import { API_CURRENT_VERSION } from '@src/constants/apVersioni';

//IF THERE IS MULTIPLE VERSIONS, USE API_CURRENT_VERSION
const AUTH = `${API_CURRENT_VERSION}/auth/`;

export const AUTH_ENDPOINTS = {
  LOGIN: `${AUTH}login`,
  UPDATE: (id: string) => `${AUTH}news/${id}`,
} as const;
