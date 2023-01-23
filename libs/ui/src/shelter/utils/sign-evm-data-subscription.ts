import { map, Subject, switchMap } from 'rxjs';

import { SignEvmDataParams } from '../../interfaces/transfer-params.interface';
import { getDefaultEvmProvider } from '../../utils/get-default-evm-provider.utils';
import { Shelter } from '../shelter';

export const signEvmDataSubscription = (signMessage$: Subject<SignEvmDataParams>) =>
  signMessage$
    .pipe(
      switchMap(({ publicKeyHash, rpcUrl, data, successCallback }) => {
        const provider = getDefaultEvmProvider(rpcUrl);

        return Shelter.signEvmData$(publicKeyHash, provider, data).pipe(
          map(transactionResponse => ({ successCallback, transactionResponse }))
        );
      })
    )
    .subscribe(({ successCallback, transactionResponse }) => successCallback(transactionResponse));
