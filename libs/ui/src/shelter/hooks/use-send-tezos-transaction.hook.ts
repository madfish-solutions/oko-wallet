import { isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import { ParamsWithKind, BatchOperation } from '@taquito/taquito';
import { useCallback, useEffect, useMemo } from 'react';
import { of, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Shelter, createTezosToolkit } from 'shelter';

interface SubjectParams {
  publicKeyHash: string;
  rpcUrl: string;
  successCallback: OnEventFn<BatchOperation>;
  errorCallback: OnEventFn<void>;
  transactionParams: ParamsWithKind[];
}

export const useSendTezosTransaction = () => {
  const subject$ = useMemo(() => new Subject<SubjectParams>(), []);

  useEffect(() => {
    const subscription = subject$
      .pipe(
        switchMap(({ rpcUrl, successCallback, errorCallback, transactionParams, publicKeyHash }) =>
          Shelter.getTezosSigner$(publicKeyHash).pipe(
            switchMap(signer => {
              const tezosToolkit = createTezosToolkit(rpcUrl);
              tezosToolkit.setSignerProvider(signer);

              return tezosToolkit.contract.batch(transactionParams).send();
            }),
            map((transactionResponse): [BatchOperation, OnEventFn<BatchOperation>] => [
              transactionResponse,
              successCallback
            ]),
            catchError(error => {
              console.log(error);
              errorCallback();

              return of([]);
            })
          )
        )
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
