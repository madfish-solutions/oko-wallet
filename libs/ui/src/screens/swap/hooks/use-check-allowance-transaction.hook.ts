import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isDefined, OnEventFn } from '@rnw-community/shared';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';

import { Token } from '../../../interfaces/token.interface';
import { useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { getDefaultEvmProvider } from '../../../utils/get-default-evm-provider.utils';

export const useCheckAllowanceTransaction = (
  fromToken: Token | undefined,
  getAllowance: OnEventFn<Token>,
  setLoadingAllowance: Dispatch<SetStateAction<boolean>>
) => {
  const [allowanceTxHashes, setAllowanceTxHashes] = useState<
    Record<Token['tokenAddress'], TransactionResponse['hash']>
  >({});
  const { rpcUrl } = useSelectedNetworkSelector();

  const isWaitingForAllowanceTransactionComplete =
    isDefined(fromToken) && isDefined(allowanceTxHashes[fromToken.tokenAddress]);

  useEffect(() => {
    if (isWaitingForAllowanceTransactionComplete) {
      const interval = setInterval(() => {
        const provider = getDefaultEvmProvider(rpcUrl);
        const copiedAllowanceTxHashes = { ...allowanceTxHashes };

        provider.getTransactionReceipt(allowanceTxHashes[fromToken.tokenAddress]).then(transaction => {
          if (isDefined(transaction?.status)) {
            getAllowance(fromToken);

            delete copiedAllowanceTxHashes[fromToken.tokenAddress];
            setAllowanceTxHashes(copiedAllowanceTxHashes);

            clearInterval(interval);
          }
        });
      }, 1000);

      return () => {
        clearInterval(interval);
        setLoadingAllowance(false);
      };
    }
  }, [allowanceTxHashes, fromToken, isWaitingForAllowanceTransactionComplete]);

  return { isWaitingForAllowanceTransactionComplete, setAllowanceTxHashes };
};
