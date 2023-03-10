import { OnEventFn } from '@rnw-community/shared';
import { useCallback, useEffect, useMemo } from 'react';
import { map, Subject, switchMap } from 'rxjs';
import { Shelter } from 'shelter';

interface SubjectParams {
  publicKeyHash: string;
  successCallback: OnEventFn<string>;
}

export const useRevealPrivateKey = () => {
  const subject$ = useMemo(() => new Subject<SubjectParams>(), []);

  useEffect(() => {
    const subscription = subject$
      .pipe(
        switchMap(({ publicKeyHash, successCallback }) =>
          Shelter.revealPrivateKey$(publicKeyHash).pipe(map(privateKey => ({ successCallback, privateKey })))
        )
      )
      .subscribe(({ successCallback, privateKey }) => {
        successCallback(privateKey);
      });

    return () => subscription.unsubscribe();
  }, []);

  return useCallback((params: SubjectParams) => subject$.next(params), [subject$]);
};
