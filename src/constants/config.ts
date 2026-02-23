import { API_URL, ENV, SECRET_KEY_API, IV, API_KEY_VALUE, ACCEPT_LANGUAGE } from '@env';

export const CONFIG = {
  API_URL: API_URL || 'https://api.example.com',
  ENV: ENV || 'development',
  SECRET_KEY: SECRET_KEY_API || 'your-secret-key',
  TIMEOUT: 10000,
  IV: IV || 'your-iv',
  API_KEY: API_KEY_VALUE || 'your-api-key',
  ACCEPT_LANGUAGE: ACCEPT_LANGUAGE || 'en',
} as const;


export const environment = {
  isDevelopment: ENV === 'development',
  isProduction: ENV === 'production',
  isDev: ENV === 'development',
  isProd: ENV === 'production',
} as const;
