import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, Controller, ControllerRenderProps, FieldValues, FieldPath } from 'react-hook-form';
import { GestureResponderEvent } from 'react-native';

import { EMPTY_STRING } from '../../constants/defaults';
import { ViewStyleProps } from '../../interfaces/style.interface';
import { Column } from '../column/column';
import { EmptySearchIcon } from '../icon/components/empty-search-icon/empty-search-icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { TextInput } from '../text-input/text-input';
import { TouchableIcon } from '../touchable-icon/touchable-icon';

import { styles } from './search-panel.styles';

const SEARCH_FIELD = 'search';

interface Props {
  isEmptyList: boolean;
  setSearchValue: OnEventFn<string>;
  onPressAddIcon?: OnEventFn<GestureResponderEvent>;
  onPressEditIcon?: OnEventFn<GestureResponderEvent>;
  onPressActivityIcon?: OnEventFn<GestureResponderEvent>;
  selectedItemName?: string;
  onSearchClose?: () => void;
  isSearchInitiallyOpened?: boolean;
  style?: ViewStyleProps;
}

const renderTextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  field: ControllerRenderProps<TFieldValues, TName>
) => <TextInput field={field} placeholder="Search" containerStyle={styles.inputContainer} inputStyle={styles.input} />;

export const SearchPanel: React.FC<Props> = ({
  isEmptyList,
  setSearchValue,
  selectedItemName,
  onSearchClose,
  isSearchInitiallyOpened = false,
  onPressAddIcon,
  onPressEditIcon,
  onPressActivityIcon,
  style
}) => {
  const [isShowSearchField, setIsShowSearchField] = useState(isSearchInitiallyOpened);
  const initialSelectedItemName = useRef(selectedItemName);

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
    if (isShowSearchField && !isSearchInitiallyOpened) {
      setFocus(SEARCH_FIELD);
    }
  }, [isShowSearchField]);

  const hideSearchField = useCallback(() => {
    setIsShowSearchField(false);
    resetField(SEARCH_FIELD);

    onSearchClose?.();
  }, [onSearchClose]);

  const showSearchField = () => setIsShowSearchField(true);

  useEffect(() => {
    if (isDefined(selectedItemName) && selectedItemName !== initialSelectedItemName.current) {
      hideSearchField();

      initialSelectedItemName.current = selectedItemName;
    }
  }, [selectedItemName]);

  return (
    <Column style={[styles.root, style]}>
      <Row style={styles.wrapper}>
        {isShowSearchField ? (
          <Row style={styles.searchWrapper}>
            <Controller control={control} name={SEARCH_FIELD} render={({ field }) => renderTextInput(field)} />
            {!isSearchInitiallyOpened && (
              <TouchableIcon name={IconNameEnum.X} onPress={hideSearchField} style={styles.close} />
            )}
          </Row>
        ) : (
          <Row style={styles.iconsWrapper}>
            <TouchableIcon name={IconNameEnum.Search} onPress={showSearchField} />
            <Row>
              {onPressAddIcon && <TouchableIcon name={IconNameEnum.Add} onPress={onPressAddIcon} />}
              {onPressEditIcon && (
                <TouchableIcon style={styles.extraIcon} name={IconNameEnum.Edit} onPress={onPressEditIcon} />
              )}
              {onPressActivityIcon && (
                <TouchableIcon style={styles.extraIcon} name={IconNameEnum.Activity} onPress={onPressActivityIcon} />
              )}
            </Row>
          </Row>
        )}
      </Row>
      {isEmptyList && <EmptySearchIcon style={styles.emptySearchIcon} />}
    </Column>
  );
};
