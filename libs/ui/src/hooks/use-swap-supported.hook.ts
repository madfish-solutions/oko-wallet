import { supportedSwapChainIds } from '../api/1inch/constants';
import { useSelectedNetworkSelector } from '../store/wallet/wallet.selectors';

export const useSwapSupported = () => {
  const { chainId } = useSelectedNetworkSelector();

  return supportedSwapChainIds.includes(chainId);
};
