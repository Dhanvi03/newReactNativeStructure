import { AxiosInstance } from 'axios';
import { CONFIG, environment } from '@src/constants/config';
import NetInfo from '@react-native-community/netinfo';
import { showMessage } from 'react-native-flash-message';
import { encryptText, decryptText } from '@src/utils/api/encryption';
import { reset } from '@src/utils/navigationRef';
import { Screen } from '@src/navigation/screen';

// TODO: If LoaderContext doesn't exist in new structure, we need to create it or point to correct path.
// Based on file list, I don't see context folder in src. I will search for it first.
// If not found, I will comment out loader logic and add TODO to creating it.

/**
 * Setup request interceptor
 */
export const setupRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config) => {

      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        showMessage({
          message: 'No Internet Connection',
          description: 'Please check your network.',
          type: 'danger',
        });
        return Promise.reject(new Error('No internet connection'));
      }

      config.headers['Accept-Language'] = CONFIG.ACCEPT_LANGUAGE;
      config.headers['X-API-Key'] = CONFIG.API_KEY; // Use API_KEY from old structure logic? Old used 'api-key'.
      config.headers['api-key'] = CONFIG.API_KEY; // Adding both for compatibility

      if (config.data) {
        if (environment.isDevelopment) {
          console.log('Original Data:', config.data);
        }
        config.data = encryptText(config.data);
      }

      if (environment.isDevelopment) {
        console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
      }

      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
    }
  );
};

/**
 * Setup response interceptor
 */
export const setupResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => {

      if (environment.isDevelopment) {
        console.log(`✅ ${response.status} ${response.config.url}`);
      }

      if (response.data) {
        response.data = decryptText(response.data);
        if (environment.isDevelopment) {
          console.log('Decrypted Response:', response.data);
        }
      }

      return response;
    },
    async (error) => {

      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      if (environment.isDevelopment) {
        console.error(`❌ ${status} ${error.config?.url} - ${message}`);
      }

      if (status === 401) {
        console.warn('Unauthorized - Please login again');
        showMessage({
          message: 'Session Expired',
          description: 'Please login again.',
          type: 'warning',
        });
        reset(Screen.LOGIN); // Navigate to Login
      }

      if (status === 403) {
        console.warn('Forbidden - You do not have permission');
      }

      return Promise.reject(error);
    }
  );
};

/**
 * Setup all interceptors
 */
export const setupInterceptors = (instance: AxiosInstance) => {
  setupRequestInterceptor(instance);
  setupResponseInterceptor(instance);
};
