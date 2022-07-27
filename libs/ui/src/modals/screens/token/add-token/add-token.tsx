import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import debounce from 'lodash/debounce';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { DEBOUNCE_TIME } from '../../../../constants/defaults';
import { useAllNetworksSelector } from '../../../../store/wallet/wallet.selectors';
import { getDefaultEvmProvider } from '../../../../utils/get-default-evm-provider.utils';
import { useAddTokenFieldsRules } from '../../../hooks/use-validate-add-token-fields.hook copy';
import { AddTokenContainer } from '../components/add-token-container/add-token-container';
import { FormTypes } from '../types/form-types.interface';

const defaultValues = {
  address: '',
  tokenId: '',
  symbol: '',
  decimals: '',
  iconUrl: ''
};

export const AddNewToken: FC = () => {
  const networks = useAllNetworksSelector();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors }
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const resetDynamicFields = () => {
    resetField('symbol');
    resetField('decimals');
    resetField('iconUrl');
  };

  const watchAddressUrl = watch('address');

  useEffect(() => {
    if (!isNotEmptyString(watchAddressUrl.trim())) {
      resetDynamicFields();
    }
  }, [watchAddressUrl]);

  const getNetworkChainId = useRef(
    debounce(async (newRpcUrl: string) => {
      if (isNotEmptyString(newRpcUrl.trim())) {
        const provider = getDefaultEvmProvider(newRpcUrl.trim());

        const currentNetwork = await provider.getNetwork().catch(() => {
          resetDynamicFields();

          return null;
        });

        if (isDefined(currentNetwork)) {
          const { chainId } = currentNetwork;
          getNetworkData(chainId);
        }
      }
    }, DEBOUNCE_TIME)
  ).current;

  const getNetworkData = useCallback(async (networkChainId: number) => {
    console.log(networkChainId);
  }, []);

  useEffect(() => {
    getNetworkChainId(watchAddressUrl);

    return () => {
      getNetworkChainId.cancel();
    };
  }, [getNetworkChainId, watchAddressUrl]);

  const rules = useAddTokenFieldsRules({
    tokens: networks,
    defaultValues
  });

  const onSubmit = (fields: FormTypes) => {
    console.log('Submit', fields);
  };

  return (
    <AddTokenContainer
      screenTitle="Add new token"
      submitTitle="Add"
      onSubmitPress={handleSubmit(onSubmit)}
      control={control}
      rules={rules}
      errors={errors}
      setValue={setValue}
    />
  );
};
