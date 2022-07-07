import React from 'react';
import { View, FlatList, FlatListProps } from 'react-native';

import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { TouchableIcon } from '../../../components/touchable-icon/touchable-icon';
import { getItemLayout } from '../../utils/get-item-layout.util';

import { styles } from './modal-flat-list.styles';

interface Props<T> extends Pick<FlatListProps<T>, 'renderItem' | 'data'> {
  onPressAddIcon: () => void;
  flatListRef: React.RefObject<FlatList<T>>;
}

export const ModalFlatList = <T extends unknown>({ onPressAddIcon, flatListRef, data, renderItem }: Props<T>) => (
  <View style={styles.root}>
    <Row style={styles.search}>
      <TouchableIcon name={IconNameEnum.Search} />
      <TouchableIcon name={IconNameEnum.Add} onPress={onPressAddIcon} />
    </Row>

    <FlatList
      ref={flatListRef}
      getItemLayout={getItemLayout}
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  </View>
);
