import { OnEventFn } from '@rnw-community/shared';
import { useCallback, useEffect, useMemo } from 'react';
import { map, Subject, switchMap } from 'rxjs';
import { Shelter } from 'shelter';

interface SubjectParams {
  successCallback: OnEventFn<string>;
}

export const useRevealSeedPhrase = () => {
  const subject$ = useMemo(() => new Subject<SubjectParams>(), []);

  useEffect(() => {
    const subscription = subject$
      .pipe(
        switchMap(({ successCallback }) =>
          Shelter.revealSeedPhrase$().pipe(map(seedPhrase => ({ successCallback, seedPhrase })))
        )
      )
      .subscribe(({ successCallback, seedPhrase }) => {
        successCallback(seedPhrase);
      });

    return () => subscription.unsubscribe();
  }, []);

  return useCallback((params: SubjectParams) => subject$.next(params), [subject$]);
};
