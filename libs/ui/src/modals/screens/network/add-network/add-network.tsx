import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { getDefaultProvider } from 'ethers';
import debounce from 'lodash/debounce';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NetworkTypeEnum } from 'shared';

import { CHAINS_JSON, DEBOUNCE_TIME } from '../../../../constants/defaults';
import { httpsRegx } from '../../../../constants/regex-validation';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useToast } from '../../../../hooks/use-toast.hook';
import { NetworkInterface } from '../../../../interfaces/network.interface';
import { addNewNetworkAction } from '../../../../store/wallet/wallet.actions';
import { useAllNetworksSelector } from '../../../../store/wallet/wallet.selectors';
import { removeTrailingSlash } from '../../../../utils/remove-trailing-slash.util';
import { useNetworkFieldsRules } from '../../../hooks/use-validate-network-fields.hook';
import { NetworkContainer } from '../components/network-container/network-container';
import { ChainInterface, NativeCurrencyType } from '../types/chains.interface';
import { FormTypes } from '../types/form-types.interface';

const defaultValues = {
  name: '',
  rpcUrl: '',
  chainId: '',
  blockExplorerUrl: '',
  tokenSymbol: ''
};

export const AddNetwork: FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { showSuccessToast } = useToast();

  const networks = useAllNetworksSelector();

  const [chainId, setChainId] = useState<string>('');
  const [nativeTokenInfo, setNativeTokenInfo] = useState<NativeCurrencyType>({
    tokenName: '',
    thumbnailUri: '',
    decimals: 18
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    resetField,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const resetDynamicFields = () => {
    resetField('chainId');
    resetField('tokenSymbol');
    resetField('blockExplorerUrl');
    setChainId('');
  };

  const watchRpcUrl = watch('rpcUrl');

  useEffect(() => {
    if (!isNotEmptyString(watchRpcUrl.trim())) {
      resetDynamicFields();
    }
  }, [watchRpcUrl]);

  const getNetworkChainId = useRef(
    debounce(async (newRpcUrl: string) => {
      const trimmedNewRpcUrl = newRpcUrl.trim();

      if (isNotEmptyString(trimmedNewRpcUrl) && Boolean(httpsRegx.test(trimmedNewRpcUrl))) {
        let currentChainId = null;

        try {
          const provider = getDefaultProvider(trimmedNewRpcUrl);

          const currentProvider = await provider.getNetwork().catch(() => {
            resetDynamicFields();

            return null;
          });

          if (isDefined(currentProvider)) {
            currentChainId = currentProvider.chainId;
            getEvmNetworkData(currentChainId);
          } else {
            setError('rpcUrl', { message: 'Wrong RPC url or something went wrong' });
          }
        } catch {
          setError('rpcUrl', { message: 'Wrong RPC url or something went wrong' });
        }

        if (isDefined(currentChainId)) {
          setChainId(currentChainId.toString());
          setValue('chainId', currentChainId.toString());
        }
      }
    }, DEBOUNCE_TIME)
  ).current;

  const getEvmNetworkData = useCallback(async (networkChainId: number) => {
    const data: ChainInterface[] = await fetch(CHAINS_JSON)
      .then(res => res.json())
      .catch(() => []);

    if (data.length) {
      const currentNetworkByChainId = data.find(network => network.chainId === Number(networkChainId));

      if (isDefined(currentNetworkByChainId)) {
        const { tokenName, symbol, decimals, explorerUrl } = {
          tokenName: currentNetworkByChainId.nativeCurrency.name,
          symbol: currentNetworkByChainId.nativeCurrency.symbol,
          decimals: currentNetworkByChainId.nativeCurrency.decimals,
          explorerUrl: currentNetworkByChainId.explorers?.[0].url ?? ''
        };

        setNativeTokenInfo({ tokenName, decimals });
        setValue('tokenSymbol', symbol);
        setValue('blockExplorerUrl', explorerUrl);
        setChainId(networkChainId.toString());
        setValue('chainId', networkChainId.toString());

        clearErrors('chainId');
        clearErrors('tokenSymbol');
      } else {
        setError('chainId', { message: 'Failed to get chain ID. Is your RPC URL correct?' });
      }
    }
  }, []);

  useEffect(() => {
    getNetworkChainId(watchRpcUrl);

    return () => {
      getNetworkChainId.cancel();
    };
  }, [getNetworkChainId, watchRpcUrl]);

  const rules = useNetworkFieldsRules({
    networks,
    defaultValues,
    chainId
  });

  const onSubmit = (formValue: FormTypes) => {
    const network: NetworkInterface = {
      name: formValue.name.trim(),
      rpcUrl: removeTrailingSlash(formValue.rpcUrl.trim()),
      chainId: formValue.chainId.trim(),
      gasTokenMetadata: {
        name: nativeTokenInfo.tokenName,
        symbol: formValue.tokenSymbol.trim(),
        decimals: nativeTokenInfo.decimals,
        thumbnailUri: nativeTokenInfo.thumbnailUri
      },
      explorerUrl: formValue.blockExplorerUrl?.trim(),
      networkType: NetworkTypeEnum.EVM
    };

    dispatch(addNewNetworkAction(network));
    navigate(ScreensEnum.Wallet);
    showSuccessToast({
      message: 'Success!',
      data: { description: `The network ${formValue.name.trim()} was successfully added! ` }
    });
  };

  return (
    <NetworkContainer
      screenTitle="Add new network"
      submitTitle="Add"
      onSubmitPress={handleSubmit(onSubmit)}
      control={control}
      rules={rules}
      errors={errors}
      setValue={setValue}
    />
  );
};
