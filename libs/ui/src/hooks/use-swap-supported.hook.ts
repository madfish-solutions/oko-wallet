import { supportedSwapChainIds } from '../api/constants/1inch-agregator';
import { useSelectedNetworkSelector } from '../store/wallet/wallet.selectors';

export const useSwapSupported = () => {
  const { chainId } = useSelectedNetworkSelector();

  return supportedSwapChainIds.includes(chainId);
};
