import React from 'react';
import { FlatList, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { useNewsList } from './useNewsList';
import { AppText } from '@src/blueprints';

const NewsListScreen = () => {
  const {
    newsItems,
    isLoading,
    loadMore,
    isFetchingNextPage,
    refresh,
    styles,
    color,
    handlePressItem
  } = useNewsList();

  // Show a full screen loader only on the first load
  if (isLoading && !isFetchingNextPage) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={newsItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handlePressItem(item)}
          >
            <AppText style={styles.title}>{item.title}</AppText>
            <AppText style={styles.description} numberOfLines={2}>
              {item.description}
            </AppText>
          </TouchableOpacity>
        )}
        // Infinite Scroll Logic
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator color={color.primary} />
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
        }
      />
    </View>
  );
};

export default NewsListScreen;