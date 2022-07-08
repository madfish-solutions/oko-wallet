import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, FlatList, FlatListProps } from 'react-native';

import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { TextInput } from '../../../components/text-input/text-input';
import { TouchableIcon } from '../../../components/touchable-icon/touchable-icon';
import { EMPTY_STRING } from '../../../constants/defaults';
import { getItemLayout } from '../../utils/get-item-layout.util';

import { styles } from './modal-flat-list.styles';

const SEARCH_FIELD = 'search';

interface Props<T> extends Pick<FlatListProps<T>, 'renderItem' | 'data' | 'keyExtractor'> {
  onPressAddIcon: () => void;
  flatListRef: React.RefObject<FlatList<T>>;
  searchValue?: string;
  setSearchValue: (text: string) => void;
  selectedItem: T;
}

export const ModalFlatList = <T extends unknown>({
  onPressAddIcon,
  flatListRef,
  data,
  renderItem,
  setSearchValue,
  keyExtractor,
  selectedItem
}: Props<T>) => {
  const [isShowSearchField, setIsShowSearchField] = useState(false);

  const { control, resetField, watch, setFocus } = useForm({
    mode: 'onChange',
    defaultValues: {
      search: EMPTY_STRING
    }
  });

  const searchValue = watch(SEARCH_FIELD);

  useEffect(() => {
    setSearchValue(searchValue);
  }, [searchValue, setSearchValue]);

  useEffect(() => {
    if (isShowSearchField) {
      setFocus(SEARCH_FIELD);
    }
  }, [isShowSearchField]);

  const closeSearchField = useCallback(() => {
    setIsShowSearchField(false);
    resetField(SEARCH_FIELD);
  }, []);

  useEffect(() => {
    closeSearchField();
  }, [selectedItem, closeSearchField]);

  return (
    <View style={styles.root}>
      <Row style={styles.search}>
        {isShowSearchField ? (
          <>
            <Controller
              control={control}
              name={SEARCH_FIELD}
              render={({ field: { onChange, value, ref } }) => (
                <TextInput ref={ref} value={value} onChangeText={onChange} placeholder="Search" />
              )}
            />
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
