import { map, Subject, switchMap } from 'rxjs';

import { SignedMessageParams } from '../../interfaces/create-hd-account.interface';
import { Shelter } from '../shelter';

export const signMessageSubscription = (signMessage$: Subject<SignedMessageParams>) =>
  signMessage$
    .pipe(
      switchMap(({ publicKey, messageToSign, method, successCallback }) =>
        Shelter.signMessage$(publicKey, messageToSign, method).pipe(
          map(signedMessage => ({ successCallback, signedMessage }))
        )
      )
    )
    .subscribe(({ successCallback, signedMessage }) => {
      successCallback(signedMessage);
    });
