import { OnEventFn, isDefined } from '@rnw-community/shared';
import { useEffect, useMemo, useState } from 'react';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Shelter } from '../shelter/shelter';
import { useAllAccountsSelector } from '../store/wallet/wallet.selectors';
import { getSensitiveDataKeys } from '../utils/sensitive-data.util';

interface UseChangePasswordArgs {
  onSuccess: OnEventFn<void>;
  onFail: OnEventFn<void>;
}

export const useChangePassword = ({ onSuccess, onFail }: UseChangePasswordArgs) => {
  const allAccounts = useAllAccountsSelector();
  const [isSuccessfulChange, setIsSuccessfulChange] = useState<boolean>();

  const changePassword$ = useMemo(() => new Subject<string[]>(), []);

  const changePassword = (password: string, oldPassword: string) => changePassword$.next([password, oldPassword]);

  useEffect(() => {
    const changePasswordSubscription = changePassword$
      .pipe(
        switchMap(([password, oldPassword]) =>
          Shelter.changePassword$(oldPassword, password, getSensitiveDataKeys(allAccounts))
        )
      )
      .subscribe(result => setIsSuccessfulChange(result));

    return () => changePasswordSubscription.unsubscribe();
  }, [changePassword$]);

  useEffect(() => {
    if (!isDefined(isSuccessfulChange)) {
      return;
    }

    if (isSuccessfulChange) {
      onSuccess();
    } else {
      onFail();
    }

    setIsSuccessfulChange(undefined);
  }, [isSuccessfulChange]);

  return {
    changePassword
  };
};
