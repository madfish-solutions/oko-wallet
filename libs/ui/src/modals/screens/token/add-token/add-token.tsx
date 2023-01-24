import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { ethers } from 'ethers';
import debounce from 'lodash/debounce';
import React, { FC, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { EVM_TOKEN_METADATA_ABI } from '../../../../constants/abi/evm-tokens-metadata-abi';
import { DEBOUNCE_TIME } from '../../../../constants/defaults';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import {
  addNewTokenAction,
  changeTokenVisibilityAction,
  editTokenAction
} from '../../../../store/wallet/wallet.actions';
import { useAccountAssetsSelector, useSelectedNetworkSelector } from '../../../../store/wallet/wallet.selectors';
import { getCurrentToken } from '../../../../utils/get-current-token.util';
import { getDefaultEvmProvider } from '../../../../utils/get-default-evm-provider.utils';
import { isEvmAddressValid } from '../../../../utils/is-evm-address-valid.util';
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
  const { rpcUrl } = useSelectedNetworkSelector();

  const accountTokens = useAccountAssetsSelector();

  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
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

  useEffect(() => {
    if (!isNotEmptyString(watchAddressUrl.trim())) {
      resetDynamicFields();
    }
  }, [watchAddressUrl]);

  useEffect(() => {
    clearErrors('tokenAddress');
  }, [watchTokenId]);

  const rules = useTokenFieldsRules();

  const getEvmTokenMetadata = useRef(
    debounce(async (address: string) => {
      if (isNotEmptyString(address)) {
        const provider = getDefaultEvmProvider(rpcUrl);

        const contract = new ethers.Contract(address, EVM_TOKEN_METADATA_ABI, provider);
        const [name, symbol, decimals] = await Promise.all([
          contract.name().catch(() => {
            resetField('name');
          }),
          contract.symbol().catch(() => {
            resetField('symbol');
          }),
          contract.decimals().catch(() => {
            setValue('decimals', '0');
          })
        ]).finally(() => {
          setIsLoadingMetadata(false);
        });

        setValue('symbol', symbol);
        setValue('decimals', decimals.toString());
        setValue('name', name);
        clearErrors();
      }
    }, DEBOUNCE_TIME)
  ).current;

  useEffect(() => {
    if (isEvmAddressValid(watchAddressUrl)) {
      getEvmTokenMetadata(watchAddressUrl);
      setIsLoadingMetadata(true);
    }

    return () => {
      getEvmTokenMetadata.cancel();
    };
  }, [getEvmTokenMetadata, watchAddressUrl]);

  const onSubmit = (fields: TokenFormTypes) => {
    const currentToken = getCurrentToken(accountTokens, getTokenSlug(fields.tokenAddress, fields.tokenId));

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
