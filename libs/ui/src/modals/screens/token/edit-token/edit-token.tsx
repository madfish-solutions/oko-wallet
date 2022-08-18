import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { editTokenAction } from '../../../../store/wallet/wallet.actions';
import { useTokenFieldsRules } from '../../../hooks/use-validate-add-token-fields.hook';
import { TokenContainer } from '../components/token-container/token-container';
import { TokenFormTypes } from '../types/form-types.interface';

export const EditToken: FC = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const {
    params: {
      token: { name, symbol, tokenAddress, decimals, tokenId, thumbnailUri }
    }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.EditToken>>();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors }
  } = useForm<TokenFormTypes>({
    mode: 'onChange',
    defaultValues: {
      symbol,
      name,
      tokenId: tokenId ?? '',
      tokenAddress,
      decimals: String(decimals),
      thumbnailUri
    }
  });

  const resetDynamicFields = () => {
    resetField('symbol');
    resetField('name');
    resetField('decimals');
    resetField('thumbnailUri');
  };

  const watchAddressUrl = watch('tokenAddress');
  const warchIconUrl = watch('thumbnailUri');
  const watchSymbol = watch('symbol');

  useEffect(() => {
    if (warchIconUrl !== thumbnailUri) {
      setValue('symbol', watchSymbol);
    }
  }, [warchIconUrl, thumbnailUri, watchSymbol]);

  useEffect(() => {
    if (!isNotEmptyString(watchAddressUrl.trim())) {
      resetDynamicFields();
    }
  }, [watchAddressUrl]);

  const rules = useTokenFieldsRules();

  const onSubmit = (fields: TokenFormTypes) => {
    const prevTokenValue = {
      symbol,
      name,
      tokenAddress,
      decimals: String(decimals),
      thumbnailUri,
      ...(isDefined(tokenId) && isNotEmptyString(tokenId) && { tokenId })
    };

    if (JSON.stringify(prevTokenValue) === JSON.stringify(fields)) {
      return goBack();
    }

    dispatch(editTokenAction(fields));
    goBack();
  };

  return (
    <TokenContainer
      screenTitle="Edit token"
      submitTitle="Save"
      onSubmitPress={handleSubmit(onSubmit)}
      control={control}
      symbol={watchSymbol}
      rules={rules}
      errors={errors}
      editable={false}
    />
  );
};
