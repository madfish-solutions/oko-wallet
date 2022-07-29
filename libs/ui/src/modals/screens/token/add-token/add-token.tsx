import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { addNewTokenAction } from '../../../../store/wallet/wallet.actions';
import { useAccountAssetsSelector } from '../../../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../../../utils/token.utils';
import { useTokenFieldsRules } from '../../../hooks/use-validate-add-token-fields.hook copy';
import { TokenContainer } from '../components/token-container/token-container';
import { TokenFormTypes } from '../types/form-types.interface';

const defaultValues: TokenFormTypes = {
  tokenAddress: '',
  tokenId: '',
  symbol: '',
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
    formState: { errors }
  } = useForm<TokenFormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const resetDynamicFields = () => {
    resetField('symbol');
    resetField('decimals');
    resetField('thumbnailUri');
  };

  const watchAddressUrl = watch('tokenAddress');
  const watchSymbol = watch('symbol');

  useEffect(() => {
    if (!isNotEmptyString(watchAddressUrl.trim())) {
      resetDynamicFields();
    }
  }, [watchAddressUrl]);

  const rules = useTokenFieldsRules();

  const onSubmit = (fields: TokenFormTypes) => {
    const currentToken = accountTokens.find(
      token => getTokenSlug(token.tokenAddress, token.tokenId) === getTokenSlug(fields.tokenAddress, fields.tokenId)
    );

    if (isDefined(currentToken)) {
      if (isNotEmptyString(fields.tokenId)) {
        return setError('tokenId', { message: 'Token with this Token ID already exist' });
      }

      return setError('tokenAddress', { message: 'Token with this Address already exist' });
    }

    dispatch(
      addNewTokenAction({
        tokenAddress: fields.tokenAddress,
        name: fields.symbol,
        symbol: fields.symbol,
        thumbnailUri: fields.thumbnailUri,
        decimals: Number(fields.decimals),
        tokenId: fields.tokenId,
        artifactUri: undefined,
        // TODO: Add check to token address
        tezosTokenType: undefined
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
    />
  );
};
