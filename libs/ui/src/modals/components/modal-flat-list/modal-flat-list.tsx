import React, { useState } from 'react';
import { View, FlatList, FlatListProps } from 'react-native';

import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Input } from '../../../components/input/input';
import { Row } from '../../../components/row/row';
import { TouchableIcon } from '../../../components/touchable-icon/touchable-icon';
import { getItemLayout } from '../../utils/get-item-layout.util';

import { styles } from './modal-flat-list.styles';

const RESET_INPUT_VALUE = '';

interface Props<T> extends Pick<FlatListProps<T>, 'renderItem' | 'data' | 'keyExtractor'> {
  onPressAddIcon: () => void;
  flatListRef: React.RefObject<FlatList<T>>;
  searchValue: string;
  onChangeSearchValue: (text: string) => void;
}

export const ModalFlatList = <T extends unknown>({
  onPressAddIcon,
  flatListRef,
  data,
  renderItem,
  searchValue,
  onChangeSearchValue,
  keyExtractor
}: Props<T>) => {
  const [isShowSearchField, setIsShowSearchField] = useState(false);

  const closeSearchField = () => {
    setIsShowSearchField(false);
    onChangeSearchValue(RESET_INPUT_VALUE);
  };

  return (
    <View style={styles.root}>
      <Row style={styles.search}>
        {isShowSearchField ? (
          <>
            <Input value={searchValue} onChangeText={onChangeSearchValue} style={styles.input} />
            <TouchableIcon name={IconNameEnum.X} onPress={closeSearchField} style={styles.close} />
          </>
        ) : (
          <>
            <TouchableIcon name={IconNameEnum.Search} onPress={() => setIsShowSearchField(true)} />
            <TouchableIcon name={IconNameEnum.Add} onPress={onPressAddIcon} />
          </>
        )}
      </Row>

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
};
