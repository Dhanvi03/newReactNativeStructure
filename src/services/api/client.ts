import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { CONFIG } from '@src/constants/config';
import { setupInterceptors } from './interceptors';
import { retryRequest } from '@src/utils/api/retry';

class APIClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: CONFIG.API_URL,
      timeout: CONFIG.TIMEOUT,
      headers: { 'Content-Type': 'application/json' },
    });
    setupInterceptors(this.instance);
  }

  // ─── Core — all methods funnel through here ───────────────
  private async request<T = any>(
    method: Method,
    url: string,
    options?: {
      data?: any;
      params?: any;
      config?: AxiosRequestConfig;
      retry?: boolean;
    }
  ): Promise<AxiosResponse<T>> {
    const { data, params, config, retry } = options || {};
    const requestConfig: AxiosRequestConfig = { method, url, data, params, ...config };
    const requestFn = () => this.instance.request<T>(requestConfig);
    return retry ? retryRequest(requestFn, 2) : requestFn();
  }

  // ─── Public Methods ───────────────────────────────────────
  get<T = any>(url: string, options?: { params?: any; config?: AxiosRequestConfig; retry?: boolean }): Promise<AxiosResponse<T>> {
    return this.request<T>('GET', url, options);
  }

  post<T = any>(url: string, data?: any, options?: { params?: any; config?: AxiosRequestConfig }): Promise<AxiosResponse<T>> {
    return this.request<T>('POST', url, { data, ...options });
  }

  put<T = any>(url: string, data?: any, options?: { params?: any; config?: AxiosRequestConfig }): Promise<AxiosResponse<T>> {
    return this.request<T>('PUT', url, { data, ...options });
  }

  patch<T = any>(url: string, data?: any, options?: { params?: any; config?: AxiosRequestConfig }): Promise<AxiosResponse<T>> {
    return this.request<T>('PATCH', url, { data, ...options });
  }

  delete<T = any>(url: string, options?: { params?: any; config?: AxiosRequestConfig }): Promise<AxiosResponse<T>> {
    return this.request<T>('DELETE', url, options);
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new APIClient();