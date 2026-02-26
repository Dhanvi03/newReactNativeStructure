import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '@src/hooks';
import { useCreateProduct, useProductList, useProductListWithPagination } from '@src/hooks/api/useProductList';
import { productListStyles } from './ProductList.style';
import { ProductModel } from '@src/types/models/products.model';

export const useProductListViewModel = () => {
  const navigation = useNavigation<any>();
  const { color } = useAppContext();

  //=========== for no pagination====================
  // const {
  //   data: products,
  //   isPending,
  //   isError,
  //   error,
  //   refetch,
  // } = useProductList({ category: 'cat' ,search:'search', limit: 10});

  //=========== for pagination====================
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useProductListWithPagination(10);

  // ─── Flatten pages into single array ─────────────────────
  // useInfiniteQuery returns { pages: [[...page1], [...page2]] }
  // FlatList needs flat array → merge all pages into one
  const products = data?.pages.flat() ?? [];

  const loadMore = ()=>{
    if(!isFetchingNextPage && hasNextPage){
      fetchNextPage();
    }
  }
  

  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();

  const handlePressItem = (item: ProductModel) => {
    navigation.navigate('ProductDetail', { item });
  };

  const handleCreateProduct = () => {
    createProduct({
      title: 'New Product', price: 100, id:'1', description: 'desc', category: 'cat', image: 'img'
    });
  };

  return {
    products,           
    isCreating,          // ← disable create button while creating
    refetch,             // ← pass to FlatList onRefresh
    handlePressItem,
    handleCreateProduct,
    styles: productListStyles(color),
    color,
    loadMore,
    isFetchingNextPage,
    hasNextPage,
    isPending,
    isError,
    error,
  };
};