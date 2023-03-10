import { isDefined, OnEventFn } from '@rnw-community/shared';
import React from 'react';
import { View, FlatList, FlatListProps, GestureResponderEvent } from 'react-native';

import { Button } from '../button/button';
import { ButtonThemesEnum } from '../button/enums';
import { SearchPanel } from '../search-panel/search-panel';

import { useFlatListRef } from './hooks/use-flat-list-ref.hook';
import { styles } from './selector.styles';
import { getItemLayout as getItemLayoutBase } from './utils/get-item-layout.util';

interface Props<T extends object> extends Pick<FlatListProps<T>, 'renderItem' | 'keyExtractor' | 'getItemLayout'> {
  selectedItemName: string;
  onPressAddIcon?: OnEventFn<GestureResponderEvent>;
  onPressSettingsIcon?: OnEventFn<GestureResponderEvent>;
  onCancelPress?: OnEventFn<GestureResponderEvent>;
  setSearchValue: OnEventFn<string>;
  data: T[];
  selectedIndex: number;
  isSearchInitiallyOpened?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  isEmptyList?: boolean;
}

export const Selector = <T extends object>({
  data,
  renderItem,
  onPressAddIcon,
  onPressSettingsIcon,
  onCancelPress,
  setSearchValue,
  keyExtractor,
  selectedItemName,
  selectedIndex,
  isSearchInitiallyOpened,
  isLoading = false,
  isEmptyList = !data.length,
  placeholder,
  getItemLayout = getItemLayoutBase
}: Props<T>) => {
  const { flatListRef } = useFlatListRef({ data, selectedIndex });

  return (
    <View style={styles.root}>
      <SearchPanel
        onPressAddIcon={onPressAddIcon}
        onPressSettingsIcon={onPressSettingsIcon}
        setSearchValue={setSearchValue}
        selectedItemName={selectedItemName}
        isSearchInitiallyOpened={isSearchInitiallyOpened}
        isEmptyList={isEmptyList && !isLoading}
        placeholder={placeholder}
      />

      <FlatList
        ref={flatListRef}
        getItemLayout={getItemLayout}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />

      {isDefined(onCancelPress) && (
        <View style={styles.button}>
          <Button title="Cancel" onPress={onCancelPress} theme={ButtonThemesEnum.Primary} />
        </View>
      )}
    </View>
  );
};
