import { OnEventFn } from '@rnw-community/shared';
import { useEffect, useMemo } from 'react';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Shelter } from 'shelter';

import { useAllAccountsSelector } from '../store/wallet/wallet.selectors';
import { getSensitiveDataKeys } from '../utils/sensitive-data.util';

export const useChangePassword = (onSuccess: OnEventFn<void>, onFail: OnEventFn<void>) => {
  const allAccounts = useAllAccountsSelector();

  const changePassword$ = useMemo(() => new Subject<string[]>(), []);

  const changePassword = (password: string, oldPassword: string) => changePassword$.next([password, oldPassword]);

  useEffect(() => {
    const changePasswordSubscription = changePassword$
      .pipe(
        switchMap(([password, oldPassword]) =>
          Shelter.changePassword$(oldPassword, password, getSensitiveDataKeys(allAccounts))
        )
      )
      .subscribe(result => {
        if (result) {
          onSuccess();
        } else {
          onFail();
        }
      });

    return () => changePasswordSubscription.unsubscribe();
  }, [changePassword$, onSuccess, onFail]);

  return changePassword;
};
