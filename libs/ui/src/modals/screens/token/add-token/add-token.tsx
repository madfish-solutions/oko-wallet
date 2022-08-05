import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { ethers } from 'ethers';
import debounce from 'lodash/debounce';
import React, { FC, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { DEBOUNCE_TIME } from '../../../../constants/defaults';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { addNewTokenAction } from '../../../../store/wallet/wallet.actions';
import { useAccountAssetsSelector, useSelectedNetworkSelector } from '../../../../store/wallet/wallet.selectors';
import { getDefaultEvmProvider } from '../../../../utils/get-default-evm-provider.utils';
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
  const { rpcUrl } = useSelectedNetworkSelector();

  const accountTokens = useAccountAssetsSelector();

  const [tokenName, setTokenName] = useState('Token name');
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
    resetField('decimals');
    resetField('thumbnailUri');
  };

  const watchAddressUrl = watch('tokenAddress');
  const watchTokenId = watch('tokenId');
  const watchSymbol = watch('symbol');

  useEffect(() => {
    if (!isNotEmptyString(watchAddressUrl.trim())) {
      resetDynamicFields();
    }
  }, [watchAddressUrl]);

  useEffect(() => {
    clearErrors('tokenAddress');
  }, [watchTokenId]);

  const rules = useTokenFieldsRules();

  // get token metadata
  const getTokenMetadata = useRef(
    debounce(async (address: string) => {
      const abi = [
        'function name() view returns (string name)',
        'function symbol() view returns (string symbol)',
        'function decimals() view returns (uint8 decimals)'
      ];

      if (isNotEmptyString(address)) {
        const provider = getDefaultEvmProvider(rpcUrl);

        const contract = new ethers.Contract(address, abi, provider);
        const [name, symbol, decimals] = await Promise.all([
          contract.name().catch(() => {
            setTokenName('');
          }),
          contract.symbol().catch(() => {
            resetField('symbol');
          }),
          contract.decimals().catch(() => {
            resetField('decimals');
          })
        ]);

        setValue('symbol', symbol);
        setValue('decimals', decimals.toString());
        setTokenName(name);
      }
    }, DEBOUNCE_TIME)
  ).current;

  useEffect(() => {
    getTokenMetadata(watchAddressUrl);

    return () => {
      getTokenMetadata.cancel();
    };
  }, [getTokenMetadata, watchAddressUrl]);

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
        name: tokenName,
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
    />
  );
};
