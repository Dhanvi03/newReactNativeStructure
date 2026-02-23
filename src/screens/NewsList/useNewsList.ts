import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useNewsInfinite } from '@src/hooks/api/useNewsQueries';
import { useAppContext } from '@src/hooks';
import { newsListStyles } from './NewsList.style';

export const useNewsList = () => {
  const navigation = useNavigation<any>();
  const { color } = useAppContext();
  
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isLoading, 
    isFetchingNextPage,
    refetch 
  } = useNewsInfinite(10);

  // Flatten the array: [[page 1 items], [page 2 items]] -> [all items]
  const newsItems = useMemo(() => 
    data?.pages.flatMap((page) => page.data) ?? [], 
  [data]);

  const handlePressItem = (item: any) => {
    navigation.navigate('NewsDetail', { item });
  };

  return {
    newsItems,
    isLoading,
    isFetchingNextPage,
    loadMore: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    refresh: refetch,
    handlePressItem,
    styles: newsListStyles(color),
    color
  };
};