import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useGetTokenMetadata } from '../../../../hooks/use-get-token-metadata.hook';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import {
  addNewTokenAction,
  changeTokenVisibilityAction,
  editTokenAction
} from '../../../../store/wallet/wallet.actions';
import { useAccountAssetsSelector } from '../../../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../../../utils/token.utils';
import { useTokenFieldsRules } from '../../../hooks/use-validate-add-token-fields.hook';
import { TokenContainer } from '../components/token-container/token-container';
import { TokenFormTypes } from '../types/form-types.interface';

const defaultValues: TokenFormTypes = {
  tokenAddress: '',
  tokenId: '',
  symbol: '',
  name: '',
  decimals: '',
  thumbnailUri: ''
};

export const AddNewToken: FC = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const accountTokens = useAccountAssetsSelector();

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    setError,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<TokenFormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const resetDynamicFields = () => {
    resetField('symbol');
    resetField('name');
    resetField('decimals');
    resetField('thumbnailUri');
  };

  const watchAddressUrl = watch('tokenAddress');
  const watchTokenId = watch('tokenId');
  const watchSymbol = watch('symbol');

  const onLoadMetadata = useCallback((loadedMetadata: TokenFormTypes) => {
    setValue('symbol', loadedMetadata.symbol);
    setValue('decimals', loadedMetadata.decimals);
    setValue('name', loadedMetadata.name);

    clearErrors();
  }, []);

  const { getTokenMetadata, isLoadingMetadata } = useGetTokenMetadata(onLoadMetadata);

  useEffect(() => {
    if (!isNotEmptyString(watchAddressUrl.trim())) {
      resetDynamicFields();
    } else {
      getTokenMetadata(watchAddressUrl);
    }
  }, [watchAddressUrl]);

  useEffect(() => {
    clearErrors('tokenAddress');
  }, [watchTokenId]);

  const rules = useTokenFieldsRules();

  const onSubmit = (fields: TokenFormTypes) => {
    const currentToken = accountTokens.find(
      token => getTokenSlug(token.tokenAddress, token.tokenId) === getTokenSlug(fields.tokenAddress, fields.tokenId)
    );

    if (isDefined(currentToken) && currentToken.isVisible) {
      if (isNotEmptyString(fields.tokenId)) {
        return setError('tokenId', { message: 'Token with this Token ID already exist' });
      }

      return setError('tokenAddress', { message: 'Token with this Address already exist' });
    }

    if (isDefined(currentToken) && !currentToken.isVisible) {
      dispatch(editTokenAction(fields));
      dispatch(changeTokenVisibilityAction(currentToken));

      return goBack();
    }

    dispatch(
      addNewTokenAction({
        tokenAddress: fields.tokenAddress,
        name: fields.name,
        symbol: fields.symbol,
        thumbnailUri: fields.thumbnailUri,
        decimals: Number(fields.decimals),
        ...(isDefined(fields.tokenId) && isNotEmptyString(fields.tokenId) && { tokenId: fields.tokenId })
      })
    );

    goBack();
  };

  return (
    <TokenContainer
      screenTitle="Add new token"
      submitTitle="Add"
      onSubmitPress={handleSubmit(onSubmit)}
      control={control}
      symbol={watchSymbol}
      rules={rules}
      errors={errors}
      isLoadingMetadata={isLoadingMetadata}
    />
  );
};
