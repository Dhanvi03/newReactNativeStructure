import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CONFIG } from '@src/constants/config';
import { setupInterceptors } from './interceptors';
import { retryRequest } from '@src/utils/api/retry';

class APIClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: CONFIG.API_URL,
      timeout: CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setupInterceptors(this.instance);
  }

  async get<T = any>(
    url: string,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return retryRequest(() => this.instance.get<T>(url, config), 2);
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  async delete<T = any>(
    url: string,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new APIClient();
