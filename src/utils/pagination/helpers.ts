import { PaginationMeta } from './types';

/**
 * Calculate pagination meta from response data
 */
export const calculatePaginationMeta = (
  page: number,
  limit: number,
  total: number
): PaginationMeta => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};

/**
 * Get next page number
 */
export const getNextPage = (
  currentPage: number,
  totalPages: number
): number | null => {
  return currentPage < totalPages ? currentPage + 1 : null;
};

/**
 * Get previous page number
 */
export const getPreviousPage = (currentPage: number): number | null => {
  return currentPage > 1 ? currentPage - 1 : null;
};

/**
 * Build query string for pagination
 */
export const buildPaginationQuery = (
  page: number,
  limit: number,
  params?: Record<string, any>
): Record<string, any> => {
  return {
    page,
    limit,
    ...params,
  };
};

/**
 * Handle infinite scroll pagination
 * Appends new data to existing list
 */
export const appendPaginatedData = <T,>(
  existingData: T[],
  newData: T[],
  currentPage: number
): T[] => {
  // First page: replace
  if (currentPage === 1) {
    return newData;
  }
  // Other pages: append
  return [...existingData, ...newData];
};

/**
 * Validate pagination parameters
 */
export const validatePaginationParams = (
  page: number,
  limit: number,
  maxLimit: number = 100
): boolean => {
  return page >= 1 && limit >= 1 && limit <= maxLimit;
};
