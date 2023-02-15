import { OnEventFn } from '@rnw-community/shared';
import { useCallback, useEffect, useMemo } from 'react';
import { map, Subject, switchMap } from 'rxjs';
import { Shelter } from 'shelter';

interface SubjectParams {
  publicKey: string;
  messageToSign: string;
  successCallback: OnEventFn<string>;
}

export const useSignMessage = () => {
  const subject$ = useMemo(() => new Subject<SubjectParams>(), []);

  useEffect(() => {
    const subscription = subject$
      .pipe(
        switchMap(({ publicKey, messageToSign, successCallback }) =>
          Shelter.signMessage$(publicKey, messageToSign).pipe(
            map(signedMessage => ({ successCallback, signedMessage }))
          )
        )
      )
      .subscribe(({ successCallback, signedMessage }) => {
        successCallback(signedMessage);
      });

    return () => subscription.unsubscribe();
  }, []);

  return useCallback((params: SubjectParams) => subject$.next(params), [subject$]);
};
