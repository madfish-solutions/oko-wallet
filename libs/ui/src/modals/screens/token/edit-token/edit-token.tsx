import { RouteProp, useRoute } from '@react-navigation/native';
import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useAddTokenFieldsRules } from '../../../hooks/use-validate-add-token-fields.hook copy';
import { AddTokenContainer } from '../components/add-token-container/add-token-container';
import { FormTypes } from '../types/form-types.interface';

export const EditToken: FC = () => {
  const {
    params: {
      token: { symbol, tokenAddress, decimals, tokenId, thumbnailUri }
    }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.EditToken>>();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors }
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues: {
      symbol,
      tokenId,
      address: tokenAddress,
      decimals: String(decimals),
      iconUrl: thumbnailUri
    }
  });

  const resetDynamicFields = () => {
    resetField('symbol');
    resetField('decimals');
    resetField('iconUrl');
  };

  const watchAddressUrl = watch('address');
  const warchIconUrl = watch('iconUrl');
  const watchSymbol = watch('symbol');

  useEffect(() => {
    if (warchIconUrl !== thumbnailUri) {
      setValue('symbol', '');
    }
  }, [warchIconUrl, thumbnailUri]);

  useEffect(() => {
    if (!isNotEmptyString(watchAddressUrl.trim())) {
      resetDynamicFields();
    }
  }, [watchAddressUrl]);

  const rules = useAddTokenFieldsRules();

  const onSubmit = (fields: FormTypes) => {
    console.log('Submit', fields);
  };

  return (
    <AddTokenContainer
      screenTitle="Edit token"
      submitTitle="Save"
      onSubmitPress={handleSubmit(onSubmit)}
      control={control}
      symbol={watchSymbol}
      rules={rules}
      errors={errors}
    />
  );
};
