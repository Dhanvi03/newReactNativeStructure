// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   UseQueryResult,
// } from '@tanstack/react-query';
// import { newsService } from '@src/services/domains/news/news.service';
// import { NewsModel } from '@src/types/models/news.model';
// import { PaginatedList, appendPaginatedData } from '@src/utils/pagination';

// const NEWS_QUERY_KEY = ['news'];

// /**
//  * Hook: Get news with pagination
//  */
// export const useNewsPaginated = (
//   page: number = 1,
//   limit: number = 10
// ): UseQueryResult<PaginatedList<NewsModel>, Error> => {
//   return useQuery({
//     queryKey: [NEWS_QUERY_KEY, page, limit],
//     queryFn: () => newsService.getNewsList(page, limit),
//     staleTime: 5 * 60 * 1000,
//     cacheTime: 10 * 60 * 1000,
//     refetchOnWindowFocus: false,
//   });
// };

// /**
//  * Hook: Search news with pagination
//  */
// export const useSearchNewsPaginated = (
//   query: string,
//   page: number = 1,
//   limit: number = 10
// ): UseQueryResult<PaginatedList<NewsModel>, Error> => {
//   return useQuery({
//     queryKey: [NEWS_QUERY_KEY, 'search', query, page, limit],
//     queryFn: () => newsService.searchNews(query, page, limit),
//     enabled: !!query,
//     staleTime: 5 * 60 * 1000,
//   });
// };

// /**
//  * Hook: Infinite scroll news
//  */
// export const useNewsInfinite = (limit: number = 10) => {
//   const [allNews, setAllNews] = React.useState<NewsModel[]>([]);
//   const [page, setPage] = React.useState(1);
//   const [hasMore, setHasMore] = React.useState(true);

//   const { data, isLoading, isFetchingNextPage, fetchNextPage } = useQuery({
//     queryKey: [NEWS_QUERY_KEY, 'infinite', limit],
//     queryFn: async ({ pageParam = 1 }) => {
//       return newsService.getNewsList(pageParam, limit);
//     },
//     getNextPageParam: (lastPage) =>
//       lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
//     enabled: true,
//   } as any);

//   return {
//     news: allNews,
//     isLoading,
//     isFetchingNextPage,
//     hasMore,
//     fetchNextPage,
//   };
// };
