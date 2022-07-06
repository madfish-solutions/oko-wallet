import React, { FC } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';

import { getItemLayout } from '../../utils/get-item-layout.util';
import { ModalSearch } from '../modal-search/modal-search';

import { styles } from './moda-flat-list.styles';

interface Props {
  onPressAddIcon: () => void;
  flatListRef: React.RefObject<FlatList<unknown>>;
  data: any[];
  renderItem: ({ item, index }: ListRenderItemInfo<any>) => JSX.Element;
}

export const ModalFlatList: FC<Props> = ({ onPressAddIcon, flatListRef, data, renderItem }) => (
  <View style={styles.root}>
    <ModalSearch onPress={onPressAddIcon} style={styles.search} />
    <FlatList
      ref={flatListRef}
      getItemLayout={getItemLayout}
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  </View>
);
