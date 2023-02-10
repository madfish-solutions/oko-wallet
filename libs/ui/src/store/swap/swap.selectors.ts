import { useSelector } from 'react-redux';

import { SwapRootState, SwapState } from './swap.state';

export const useSlippageToleranceSelector = () =>
  useSelector<SwapRootState, SwapState['slippageTolerance']>(({ swap }) => swap.slippageTolerance);

export const useAllowanceSelector = () =>
  useSelector<SwapRootState, SwapState['allowance']>(({ swap }) => swap.allowance);

export const useQuoteSelector = () => useSelector<SwapRootState, SwapState['quote']>(({ swap }) => swap.quote);

export const useShowLoadingOnSwapScreenSelector = (tokenAddress = '') =>
  useSelector<SwapRootState, boolean>(
    ({ swap }) =>
      swap.allowance.isLoading ||
      swap.quote.isLoading ||
      swap.swapData.isLoading ||
      Boolean(swap.approveAllowanceTxLoading[tokenAddress])
  );

export const useSwapDataSelector = () => useSelector<SwapRootState, SwapState['swapData']>(({ swap }) => swap.swapData);

export const useApproveAllowanceDataSelector = () =>
  useSelector<SwapRootState, SwapState['approveAllowanceData']>(({ swap }) => swap.approveAllowanceData);
