import { map, Subject, switchMap } from 'rxjs';

import { RevealPrivateKeyParams } from '../../interfaces/create-hd-account.interface';
import { Shelter } from '../shelter';

export const revealPrivateKeySubscription = (revealPrivateKey$: Subject<RevealPrivateKeyParams>) =>
  revealPrivateKey$
    .pipe(
      switchMap(({ publicKeyHash, successCallback }) =>
        Shelter.revealPrivateKey$(publicKeyHash).pipe(map(privateKey => ({ successCallback, privateKey })))
      )
    )
    .subscribe(({ successCallback, privateKey }) => {
      successCallback(privateKey);
    });
