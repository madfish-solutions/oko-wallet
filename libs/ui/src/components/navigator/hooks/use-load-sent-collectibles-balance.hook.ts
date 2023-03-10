import { isDefined } from '@rnw-community/shared';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getDefaultEvmProvider } from 'shelter';

import { useTimerEffect } from '../../../hooks/use-timer-effect.hook';
import { loadAccountTokenBalanceAction, deleteTransactionAction } from '../../../store/wallet/wallet.actions';
import {
  usePendingCollectiblesTransactionsSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';

export const useLoadSentCollectiblesBalance = () => {
  const dispatch = useDispatch();
  const pendingCollectiblesTransactions = usePendingCollectiblesTransactionsSelector();
  const { rpcUrl } = useSelectedNetworkSelector();

  const checkPendingCollectiblesTransactions = useCallback(() => {
    if (pendingCollectiblesTransactions.length) {
      pendingCollectiblesTransactions.forEach(async ({ token, transactionHash }) => {
        const provider = getDefaultEvmProvider(rpcUrl);
        const transaction = await provider.getTransactionReceipt(transactionHash);

        if (isDefined(transaction?.status)) {
          dispatch(loadAccountTokenBalanceAction.submit({ token, deleteZeroBalance: true }));
          dispatch(deleteTransactionAction(transactionHash));
        }
      });
    }
  }, [pendingCollectiblesTransactions, rpcUrl]);

  useTimerEffect(checkPendingCollectiblesTransactions, 30000, [checkPendingCollectiblesTransactions]);
};
