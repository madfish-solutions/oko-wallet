import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isNotEmptyString } from '@rnw-community/shared';
import { of, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { getDefaultEvmProvider } from '../../utils/get-default-evm-provider.utils';
import { GetEvmSignerParams } from '../interfaces/get-evm-signer-params.interface';
import { Shelter } from '../shelter';

export const sendEvmTransactionSubscription = (sendEvmTransaction$: Subject<GetEvmSignerParams>) =>
  sendEvmTransaction$
    .pipe(
      switchMap(({ publicKeyHash, rpcUrl, successCallback, transactionParams, errorCallback }) => {
        const provider = getDefaultEvmProvider(rpcUrl);

        return Shelter.getEvmSigner$(publicKeyHash, provider).pipe(
          switchMap(signer => signer.sendTransaction(transactionParams)),
          map((transactionResponse): [TransactionResponse, GetEvmSignerParams['successCallback']] => [
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
