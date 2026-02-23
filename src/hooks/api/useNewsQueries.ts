import { useInfiniteQuery } from '@tanstack/react-query';
import { newsService } from '@src/services/domains/news/news.service';

export const useNewsInfinite = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['news', 'infinite', limit],
    queryFn: ({ pageParam = 1 }) => newsService.getNewsList(pageParam, limit),
    // Adjust this based on how your PaginatedList structure looks:
    getNextPageParam: (lastPage) => 
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    initialPageParam: 1,
  });
};