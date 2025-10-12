import React from 'react';
import { RefreshControl } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { ListViewProps } from './type';

export const ListView = (props: ListViewProps) => {
  // state
  const {
    data,
    reverted = false,
    onRefresh,
    onLoadMore,
    canRefresh = false,
    canLoadMore = false,
    refreshing = false,
    ...rest
  } = props;

  // function
  const loadMore = () => {
    if (canLoadMore) {
      execFunc(onLoadMore);
    }
  };

  // render
  return (
    <FlashList
      refreshControl={
        canRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      onEndReached={reverted ? undefined : loadMore}
      onStartReached={reverted ? loadMore : undefined}
      data={reverted && data ? [...data].reverse() : data}
      keyExtractor={(_, index) => `list-view-${index}`}
      maintainVisibleContentPosition={{
        autoscrollToBottomThreshold: 0.2,
        disabled: !reverted,
        startRenderingFromBottom: reverted,
      }}
      onEndReachedThreshold={0.5}
      onStartReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...rest}
      onRefresh={undefined}
      refreshing={undefined}
    />
  );
};
