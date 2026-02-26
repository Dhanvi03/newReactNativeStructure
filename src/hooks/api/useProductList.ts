import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { ProductModel } from '@src/types/models/products.model';
import { CreateProductParam, ProductListParams } from '@src/services/domains/products/products.types';
import { productsService } from '@src/services/domains/products/products.service';
import { navigate } from '@src/utils/navigationRef';
import { Screen } from '@src/navigation/screen';

const PRODUCT_QUERY_KEY = ['product'];

// ═══════════════════════════════════════════════════════════
// OPTION A — No Pagination
// ═══════════════════════════════════════════════════════════

export const useProductList = (params: ProductListParams): UseQueryResult<ProductModel[], Error> => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEY,
    queryFn: () => productsService.getProducts(params),
    meta: { showGlobalLoader: true },
  });
};

export const useCreateProduct = (): UseMutationResult<ProductModel, Error, CreateProductParam, unknown> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateProductParam) => productsService.createProduct(params),
    onSuccess: (data) => {
      // setQueryData — 0 extra API calls, appends to existing cache
      queryClient.setQueryData(PRODUCT_QUERY_KEY, (old: ProductModel[] = []) => [...old, data]);
      navigate(Screen.NOTIFICATION,{});
      // OR if you want fresh data from server:
      // queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY });
    },
    onError: (error) => console.error('Error creating product:', error),
  });
};


// ═══════════════════════════════════════════════════════════
// OPTION B — With Pagination (Infinite Scroll)
// ═══════════════════════════════════════════════════════════

export const useProductListWithPagination = (limit: number) => {
  return useInfiniteQuery({
    queryKey: PRODUCT_QUERY_KEY,
    queryFn: ({ pageParam = 1 }) =>
      productsService.getProducts({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < limit ? undefined : allPages.length + 1;
    },
    meta: { showGlobalLoader: false },
  });
};

export const useCreateProductWithPagination = (): UseMutationResult<ProductModel, Error, CreateProductParam, unknown> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateProductParam) => productsService.createProduct(params),
    onSuccess: () => {
      // invalidateQueries — triggers refetch from page 1
      // setQueryData not safe here — new item position depends on server sorting
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY });
    },
    onError: (error) => console.error('Error creating product:', error),
  });
};