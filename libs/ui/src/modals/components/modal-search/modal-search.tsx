import { OnEventFn } from '@rnw-community/shared';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller, FieldValues, ControllerRenderProps } from 'react-hook-form';
import { GestureResponderEvent } from 'react-native';

import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { TextInput } from '../../../components/text-input/text-input';
import { TouchableIcon } from '../../../components/touchable-icon/touchable-icon';
import { EMPTY_STRING } from '../../../constants/defaults';

import { styles } from './modal-search.styles';

const SEARCH_FIELD = 'search';

type UseControllerReturn<TFieldValues extends FieldValues = FieldValues> = {
  field: ControllerRenderProps<TFieldValues>;
};

interface Props {
  setSearchValue: OnEventFn<string>;
  onPressAddIcon: OnEventFn<GestureResponderEvent>;
  selectedItem: string;
}

export const ModalSearch: React.FC<Props> = ({ setSearchValue, onPressAddIcon, selectedItem }) => {
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

  const hideSearchField = useCallback(() => {
    setIsShowSearchField(false);
    resetField(SEARCH_FIELD);
  }, []);

  const showSearchField = () => setIsShowSearchField(true);

  useEffect(() => {
    hideSearchField();
  }, [selectedItem, hideSearchField]);

  const renderTextInput = ({ field: { onChange, ref, value } }: UseControllerReturn) => (
    <TextInput ref={ref} value={value} onChangeText={onChange} placeholder="Search" />
  );

  return (
    <Row style={styles.root}>
      {isShowSearchField ? (
        <>
          <Controller control={control} name={SEARCH_FIELD} render={renderTextInput} />
          <TouchableIcon name={IconNameEnum.X} onPress={hideSearchField} style={styles.close} />
        </>
      ) : (
        <>
          <TouchableIcon name={IconNameEnum.Search} onPress={showSearchField} />
          <TouchableIcon name={IconNameEnum.Add} onPress={onPressAddIcon} />
        </>
      )}
    </Row>
  );
};
