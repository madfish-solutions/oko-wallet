import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { TextInput } from '../../../components/text-input/text-input';
import { TouchableIcon } from '../../../components/touchable-icon/touchable-icon';
import { EMPTY_STRING } from '../../../constants/defaults';

import { styles } from './modal-search.styles';

const SEARCH_FIELD = 'search';

interface Props {
  setSearchValue: (text: string) => void;
  onPressAddIcon: () => void;
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

  const closeSearchField = useCallback(() => {
    setIsShowSearchField(false);
    resetField(SEARCH_FIELD);
  }, []);

  useEffect(() => {
    closeSearchField();
  }, [selectedItem, closeSearchField]);

  return (
    <Row style={styles.root}>
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
  );
};
