import { useState, useCallback } from 'react';
import { PaginationState } from '@src/utils/pagination';

export const usePaginationState = (initialPage: number = 1, initialLimit: number = 10) => {
  const [state, setState] = useState<PaginationState>({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
    isLoading: false,
    error: null,
  });

  const goToPage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, page }));
  }, []);

  const goToNextPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      page: prev.page < prev.totalPages ? prev.page + 1 : prev.page,
    }));
  }, []);

  const goToPreviousPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      page: prev.page > 1 ? prev.page - 1 : prev.page,
    }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setState((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  const reset = useCallback(() => {
    setState({
      page: initialPage,
      limit: initialLimit,
      total: 0,
      totalPages: 0,
      isLoading: false,
      error: null,
    });
  }, [initialPage, initialLimit]);

  return {
    ...state,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    setLimit,
    reset,
    setState,
  };
};
