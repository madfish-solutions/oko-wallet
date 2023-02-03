import { useMemo } from 'react';

import { SUPPORTED_SWAP_CHAIN_IDS } from '../api/1inch/constants';
import { useSelectedNetworkSelector } from '../store/wallet/wallet.selectors';

export const useSwapSupported = () => {
  const { chainId } = useSelectedNetworkSelector();

  return useMemo(() => SUPPORTED_SWAP_CHAIN_IDS.includes(chainId), [chainId]);
};
