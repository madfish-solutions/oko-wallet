import { OnEventFn } from '@rnw-community/shared';
import React from 'react';
import { View, FlatList, FlatListProps, GestureResponderEvent } from 'react-native';

import { getItemLayout } from '../../utils/get-item-layout.util';
import { ModalSearch } from '../modal-search/modal-search';

import { styles } from './modal-flat-list.styles';

interface Props<T extends { name: string }> extends Pick<FlatListProps<T>, 'renderItem' | 'data' | 'keyExtractor'> {
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
  onPressAddIcon,
  setSearchValue,
  keyExtractor,
  selectedItem
}: Props<T>) => (
  <View style={styles.root}>
    <ModalSearch onPressAddIcon={onPressAddIcon} setSearchValue={setSearchValue} selectedItem={selectedItem.name} />

    <FlatList
      ref={flatListRef}
      getItemLayout={getItemLayout}
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  </View>
);
