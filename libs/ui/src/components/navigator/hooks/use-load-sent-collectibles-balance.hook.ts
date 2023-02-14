import { isDefined } from '@rnw-community/shared';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getDefaultEvmProvider } from 'shelter/src/utils/get-default-evm-provider.utils';

import { useTimerEffect } from '../../../hooks/use-timer-effect.hook';
import { Token } from '../../../interfaces/token.interface';
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
      pendingCollectiblesTransactions.forEach(async ({ asset, transactionHash }) => {
        const provider = getDefaultEvmProvider(rpcUrl);
        const transaction = await provider.getTransactionReceipt(transactionHash);

        if (isDefined(transaction?.status)) {
          dispatch(loadAccountTokenBalanceAction.submit({ token: asset as Token, deleteZeroBalance: true }));
          dispatch(deleteTransactionAction(transactionHash));
        }
      });
    }
  }, [pendingCollectiblesTransactions, rpcUrl]);

  useTimerEffect(checkPendingCollectiblesTransactions, 30000, [checkPendingCollectiblesTransactions]);
};
