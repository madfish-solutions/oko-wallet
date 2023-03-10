import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import { useCallback, useEffect, useMemo } from 'react';
import { of, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Shelter, getDefaultEvmProvider } from 'shelter';

interface SubjectParams {
  publicKeyHash: string;
  rpcUrl: string;
  successCallback: OnEventFn<TransactionResponse>;
  errorCallback: OnEventFn<void>;
  transactionParams: TransactionRequest;
}

export const useSendEvmTransaction = () => {
  const subject$ = useMemo(() => new Subject<SubjectParams>(), []);

  useEffect(() => {
    const subscription = subject$
      .pipe(
        switchMap(({ publicKeyHash, rpcUrl, successCallback, transactionParams, errorCallback }) => {
          const provider = getDefaultEvmProvider(rpcUrl);

          return Shelter.getEvmSigner$(publicKeyHash, provider).pipe(
            switchMap(signer => signer.sendTransaction(transactionParams)),
            map((transactionResponse): [TransactionResponse, SubjectParams['successCallback']] => [
              transactionResponse,
              successCallback
            ]),
            catchError(error => {
              console.log(error);
              errorCallback();

              return of([]);
            })
          );
        })
      )
      .subscribe(([transactionResponse, successCallback]) => {
        if (isNotEmptyString(transactionResponse?.hash)) {
          successCallback(transactionResponse);
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  return useCallback((params: SubjectParams) => subject$.next(params), [subject$]);
};
