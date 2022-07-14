import { OnEventFn } from '@rnw-community/shared';
import React from 'react';
import { View, FlatList, FlatListProps, GestureResponderEvent } from 'react-native';

import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { getCustomSize } from '../../../styles/format-size';
import { ModalSearch } from '../modal-search/modal-search';

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
    <ModalSearch onPressAddIcon={onPressAddIcon} setSearchValue={setSearchValue} selectedItem={selectedItem.name} />

    <FlatList
      ref={flatListRef}
      getItemLayout={getItemLayout}
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={<Icon name={IconNameEnum.EmptySearch} size={getCustomSize(20)} iconStyle={styles.icon} />}
    />
  </View>
);
