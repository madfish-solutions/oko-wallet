import { map, Subject, switchMap } from 'rxjs';

import { RevealSeedPhraseParams } from '../../interfaces/create-hd-account.interface';
import { Shelter } from '../shelter';

export const revealSeedPhraseSubscription = (revealSeedPhrase$: Subject<RevealSeedPhraseParams>) =>
  revealSeedPhrase$
    .pipe(
      switchMap(({ successCallback }) =>
        Shelter.revealSeedPhrase$().pipe(map(seedPhrase => ({ successCallback, seedPhrase })))
      )
    )
    .subscribe(({ successCallback, seedPhrase }) => {
      successCallback(seedPhrase);
    });
