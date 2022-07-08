import React from 'react';
import { View, FlatList, FlatListProps } from 'react-native';

import { getItemLayout } from '../../utils/get-item-layout.util';
import { ModalSearch } from '../modal-search/modal-search';

import { styles } from './modal-flat-list.styles';

interface Props<T extends { name: string }> extends Pick<FlatListProps<T>, 'renderItem' | 'data' | 'keyExtractor'> {
  onPressAddIcon: () => void;
  flatListRef: React.RefObject<FlatList<T>>;
  searchValue?: string;
  setSearchValue: (text: string) => void;
  selectedItem: T;
}

export const ModalFlatList = <T extends { name: string }>({
  onPressAddIcon,
  flatListRef,
  data,
  renderItem,
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
