import { useEffect, useMemo, useState } from 'react';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Shelter } from '../shelter/shelter';
import { useAllAccountsSelector } from '../store/wallet/wallet.selectors';
import { getSensitiveDataKeys } from '../utils/sensitive-data.util';

export const useChangePassword = () => {
  const allAccounts = useAllAccountsSelector();

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [passwordAttempts, setPasswordAttempts] = useState(0);

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
          setIsPasswordMatch(true);
        }
        setPasswordAttempts(prev => prev + 1);
      });

    return () => changePasswordSubscription.unsubscribe();
  }, [changePassword$]);

  return {
    isPasswordMatch,
    passwordAttempts,
    changePassword
  };
};
