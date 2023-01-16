import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { getDefaultProvider } from 'ethers';
import debounce from 'lodash/debounce';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { CHAINS_JSON, DEBOUNCE_TIME } from '../../../../constants/defaults';
import {
  NETWORK_CHAIN_IDS_BY_NETWORK_TYPE,
  tezosBlockExplorers,
  TezosChainId,
  TEZOS_NETWORKS_LIST
} from '../../../../constants/networks';
import { NetworkTypeEnum } from '../../../../enums/network-type.enum';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useShelter } from '../../../../hooks/use-shelter.hook';
import { useToast } from '../../../../hooks/use-toast.hook';
import { NetworkInterface } from '../../../../interfaces/network.interface';
import { addNewNetworkAction } from '../../../../store/wallet/wallet.actions';
import { useAllNetworksSelector, useSelectedAccountSelector } from '../../../../store/wallet/wallet.selectors';
import { checkIsNetworkTypeKeyExist } from '../../../../utils/check-is-network-type-key-exist';
import { removeTrailingSlash } from '../../../../utils/remove-trailing-slash.util';
import { createTezosToolkit } from '../../../../utils/tezos-toolkit.utils';
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
  const { createHdAccountForNewNetworkType } = useShelter();
  const { showSuccessToast } = useToast();

  const selectedAccount = useSelectedAccountSelector();
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
      if (isNotEmptyString(newRpcUrl.trim())) {
        let currentChainId = null;

        if (TEZOS_NETWORKS_LIST.includes(removeTrailingSlash(newRpcUrl.trim()))) {
          createTezosToolkit(newRpcUrl)
            .rpc.getChainId()
            .then(result => {
              currentChainId = result;
              getTezosNetworkData(result);
            })
            .catch(() => {
              resetDynamicFields();
              setError('rpcUrl', { message: 'Wrong RPC url or something went wrong' });

              return null;
            });
        } else {
          try {
            const provider = getDefaultProvider(newRpcUrl.trim());
            const currentProvider = await provider.getNetwork().catch(() => {
              resetDynamicFields();

              return null;
            });

            if (isDefined(currentProvider)) {
              currentChainId = currentProvider.chainId;
              getEvmNetworkData(currentChainId);
            }
          } catch {
            setError('rpcUrl', { message: 'Wrong RPC url or something went wrong' });
          }
        }

        if (isDefined(currentChainId)) {
          setChainId(currentChainId.toString());
          setValue('chainId', currentChainId.toString());
        }
      }
    }, DEBOUNCE_TIME)
  ).current;

  const getTezosNetworkData = useCallback(async (networkChainId: string) => {
    setNativeTokenInfo({
      tokenName: 'Tezos',
      decimals: 6,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2011.png'
    });
    setValue('tokenSymbol', 'Tezos');
    setValue('blockExplorerUrl', tezosBlockExplorers[networkChainId as TezosChainId] ?? '');
    setValue('chainId', networkChainId);
    setChainId(networkChainId);

    clearErrors('chainId');
    clearErrors('tokenSymbol');
  }, []);

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
    let networkType = NetworkTypeEnum.EVM;

    if (NETWORK_CHAIN_IDS_BY_NETWORK_TYPE[NetworkTypeEnum.Tezos].includes(formValue.chainId)) {
      networkType = NetworkTypeEnum.Tezos;
    }

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
      networkType
    };

    if (!checkIsNetworkTypeKeyExist(selectedAccount, networkType)) {
      createHdAccountForNewNetworkType(selectedAccount, networkType, () => {
        dispatch(addNewNetworkAction(network));
      });
    } else {
      dispatch(addNewNetworkAction(network));
    }

    navigate(ScreensEnum.Wallet);
    showSuccessToast({
      message: 'Success!',
      data: { description: `The network ${name.trim()} was successfully added! ` }
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
