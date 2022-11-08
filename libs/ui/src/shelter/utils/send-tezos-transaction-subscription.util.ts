import { isNotEmptyString } from '@rnw-community/shared';
import { BatchOperation } from '@taquito/taquito';
import { of, Subject } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { createTezosToolkit } from '../../utils/tezos-toolkit.utils';
import { GetTezosSignerParams } from '../interfaces/get-tezos-signer-params.interface';
import { Shelter } from '../shelter';

export const sendTezosTransactionSubscription = (sendTezosTransaction$: Subject<GetTezosSignerParams>) =>
  sendTezosTransaction$
    .pipe(
      switchMap(({ rpcUrl, successCallback, errorCallback, transactionParams, publicKeyHash }) =>
        Shelter.getTezosSigner$(publicKeyHash).pipe(
          switchMap(signer => {
            const tezosToolkit = createTezosToolkit(rpcUrl);
            tezosToolkit.setSignerProvider(signer);

            return tezosToolkit.contract.batch(transactionParams).send();
          }),
          map((transactionResponse): [BatchOperation, GetTezosSignerParams['successCallback']] => [
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
