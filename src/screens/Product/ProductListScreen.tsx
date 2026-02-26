import React from 'react';
import { FlatList, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { useProductListViewModel } from './useProduct';
import { AppText } from '@src/blueprints';

const ProductListScreen = () => {
  const {
    products,
    styles,
    color,
    handleCreateProduct,
    isCreating,
    refetch,
    handlePressItem,
    loadMore,
    isFetchingNextPage,
    isPending,
  } = useProductListViewModel();


  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handlePressItem(item)}
          >
            <AppText style={styles.title}>{item.name}</AppText>
            <AppText style={styles.description} numberOfLines={2}>
              {item.description}
            </AppText>
          </TouchableOpacity>
        )}

        /* ─── Pagination ────────────────────────────── */
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator color={color.primary} />
            </View>
          ) : null
        }

        /* ─── Pull to refresh ───────────────────────────── */

        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={refetch} />
        }
      />
    </View>
  );
};

export default ProductListScreen;