import { TransactionResponse } from '@ethersproject/abstract-provider';
import { Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { getDefaultEvmProvider } from '../../utils/get-default-evm-provider.utils';
import { GetEvmSignerParams } from '../interfaces/get-evm-signer-params.interface';
import { Shelter } from '../shelter';

export const sendEvmTransactionSubscription = (sendEvmTransaction$: Subject<GetEvmSignerParams>) =>
  sendEvmTransaction$
    .pipe(
      switchMap(({ publicKeyHash, rpcUrl, successCallback, transactionParams }) => {
        const provider = getDefaultEvmProvider(rpcUrl);

        return Shelter.getEvmSigner$(publicKeyHash, provider).pipe(
          switchMap(signer => signer.sendTransaction(transactionParams)),
          map((transactionResponse): [TransactionResponse, GetEvmSignerParams['successCallback']] => [
            transactionResponse,
            successCallback
          ])
        );
      })
    )
    .subscribe(([transactionResponse, successCallback]) => successCallback(transactionResponse));
