import React, { FC } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';

import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { TouchableIcon } from '../../../components/touchable-icon/touchable-icon';
import { getItemLayout } from '../../utils/get-item-layout.util';

import { styles } from './modal-flat-list.styles';

interface Props {
  onPressAddIcon: () => void;
  flatListRef: React.RefObject<FlatList<unknown>>;
  data: any[];
  renderItem: ({ item, index }: ListRenderItemInfo<any>) => JSX.Element;
}

export const ModalFlatList: FC<Props> = ({ onPressAddIcon, flatListRef, data, renderItem }) => (
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
