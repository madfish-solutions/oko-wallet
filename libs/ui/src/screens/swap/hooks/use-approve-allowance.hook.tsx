import { BigNumber } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { of, from, switchMap, Subject } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { getDefaultEvmProvider } from 'shelter/utils/get-default-evm-provider.utils';

import { getApproveData } from '../../../api/1inch/1inch';
import { useToast } from '../../../hooks/use-toast.hook';
import { Token } from '../../../interfaces/token.interface';
import { useSendEvmTransaction } from '../../../shelter/hooks/use-send-evm-transaction.hook';
import { loadTokenAllowanceAction } from '../../../store/swap/swap.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';

export const useApproveAllowance = () => {
  const sendEvmTransaction = useSendEvmTransaction();
  const { rpcUrl, chainId } = useSelectedNetworkSelector();
  const { showErrorToast, showSuccessToast } = useToast();
  const dispatch = useDispatch();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();

  const [isApproveAllowanceLoading, setIsApproveAllowanceLoading] = useState(false);

  const approveAllowance$ = useMemo(() => new Subject<Token>(), []);

  const approveHandler = useCallback((token: Token) => approveAllowance$.next(token), []);

  useEffect(() => {
    const subscription = approveAllowance$
      .pipe(
        tap(() => setIsApproveAllowanceLoading(true)),
        concatMap(token =>
          from(getApproveData(chainId, token.tokenAddress)).pipe(
            switchMap(approveDataResponse =>
              of(
                sendEvmTransaction({
                  rpcUrl,
                  transactionParams: {
                    ...approveDataResponse,
                    value: BigNumber.from(approveDataResponse.value).toHexString()
                  },
                  publicKeyHash,
                  successCallback: response =>
                    getDefaultEvmProvider(rpcUrl)
                      .waitForTransaction(response.hash, 1)
                      .then(() => {
                        setIsApproveAllowanceLoading(false);
                        showSuccessToast({ message: `Allowance for ${token.symbol} was added` });
                        dispatch(loadTokenAllowanceAction.submit(token.tokenAddress));
                      }),
                  errorCallback: () => showErrorToast({ message: 'Something went wrong with approve allowance' })
                })
              )
            )
          )
        )
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return { approveHandler, isApproveAllowanceLoading };
};
