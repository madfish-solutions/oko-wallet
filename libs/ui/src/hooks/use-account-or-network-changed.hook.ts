import { OnEventFn } from '@rnw-community/shared';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ScreensEnum } from '../enums/sreens.enum';
import { useSelectedAccountPublicKeyHashSelector, useSelectedNetworkSelector } from '../store/wallet/wallet.selectors';

import { useNavigation } from './use-navigation.hook';

export const useAccountOrNetworkChanged = (onChangeCallback: OnEventFn<void>) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const network = useSelectedNetworkSelector();
  const { goBack, navigate } = useNavigation();

  const initialPublicKeyHash = useRef(publicKeyHash);
  const initialNetwork = useRef(network);

  const [isAccountOrNetworkChanged, setIsAccountOrNetworkChanged] = useState(false);

  useEffect(() => {
    if (
      publicKeyHash !== initialPublicKeyHash.current ||
      network.rpcUrl !== initialNetwork.current.rpcUrl ||
      network.chainId !== initialNetwork.current.chainId
    ) {
      onChangeCallback();

      initialNetwork.current = network;
      initialPublicKeyHash.current = publicKeyHash;

      setIsAccountOrNetworkChanged(true);
    }
  }, [publicKeyHash, network.rpcUrl, network.chainId]);

  return useCallback(
    () => (isAccountOrNetworkChanged ? navigate(ScreensEnum.Wallet) : goBack()),
    [isAccountOrNetworkChanged]
  );
};
