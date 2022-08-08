import { OnEventFn } from '@rnw-community/shared';
import React from 'react';
import { View, FlatList, FlatListProps, GestureResponderEvent } from 'react-native';

import { EmptySearchIcon } from '../../../components/icon/components/empty-search-icon/empty-search-icon';
import { SearchPanel } from '../../../components/search-panel/search-panel';

import { styles } from './modal-flat-list.styles';

interface Props<T extends { name: string }>
  extends Pick<FlatListProps<T>, 'renderItem' | 'data' | 'keyExtractor' | 'getItemLayout'> {
  flatListRef: React.RefObject<FlatList<T>>;
  searchValue?: string;
  selectedItem: T;
  onPressAddIcon: OnEventFn<GestureResponderEvent>;
  setSearchValue: OnEventFn<string>;
}

export const ModalFlatList = <T extends { name: string }>({
  flatListRef,
  data,
  renderItem,
  getItemLayout,
  onPressAddIcon,
  setSearchValue,
  keyExtractor,
  selectedItem
}: Props<T>) => (
  <View style={styles.root}>
    <SearchPanel onPressAddIcon={onPressAddIcon} setSearchValue={setSearchValue} selectedItem={selectedItem.name} />

    <FlatList
      ref={flatListRef}
      getItemLayout={getItemLayout}
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={<EmptySearchIcon />}
    />
  </View>
);
