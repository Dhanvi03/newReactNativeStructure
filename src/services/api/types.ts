import '@tanstack/react-query';

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
}

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  retries?: number;
}

export interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultMeta: {
      showGlobalLoader?: boolean;
    };
  }
}