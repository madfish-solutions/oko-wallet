import { useSelector } from 'react-redux';

import { SwapRootState, SwapState } from './swap.state';

export const useSlippageToleranceSelector = () =>
  useSelector<SwapRootState, SwapState['slippageTolerance']>(({ swap }) => swap.slippageTolerance);

export const useAllowanceSelector = () =>
  useSelector<SwapRootState, SwapState['allowance']>(({ swap }) => swap.allowance);

export const useOutputAmountSelector = () =>
  useSelector<SwapRootState, SwapState['outputAmount']>(({ swap }) => swap.outputAmount);

export const useRoutesSelector = () => useSelector<SwapRootState, SwapState['routes']>(({ swap }) => swap.routes);

export const useExchangeRateSelector = () =>
  useSelector<SwapRootState, SwapState['exchangeRate']>(({ swap }) => swap.exchangeRate);

export const useShowLoadingOnSwapScreenSelector = (tokenAddress = '') =>
  useSelector<SwapRootState, boolean>(
    ({ swap }) =>
      swap.allowance.isLoading ||
      swap.exchangeRate.isLoading ||
      swap.outputAmount.isLoading ||
      swap.routes.isLoading ||
      swap.swapData.isLoading ||
      Boolean(swap.approveAllowanceLoading[tokenAddress])
  );

export const useSwapDataSelector = () => useSelector<SwapRootState, SwapState['swapData']>(({ swap }) => swap.swapData);
