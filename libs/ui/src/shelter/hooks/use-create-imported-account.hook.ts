import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { catchError, of, Subject, switchMap, tap } from 'rxjs';
import { NetworkTypeEnum, HdAccount } from 'shared';
import { Shelter } from 'shelter';

import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useToast } from '../../hooks/use-toast.hook';
import { hideLoaderAction, showLoaderAction } from '../../store/settings/settings.actions';
import { createHdAccountAction } from '../../store/wallet/wallet.actions';
import { useAllAccountsSelector } from '../../store/wallet/wallet.selectors';

interface SubjectParams {
  name: string;
  hdAccount: HdAccount;
  networkType: NetworkTypeEnum;
  accountId: number;
}

export const useCreateImportedAccount = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { showSuccessToast, showErrorToast } = useToast();

  const accounts = useAllAccountsSelector();

  const subject$ = useMemo(() => new Subject<SubjectParams>(), []);

  useEffect(() => {
    const subscription = subject$
      .pipe(
        tap(() => dispatch(showLoaderAction())),
        switchMap(({ name, hdAccount, networkType, accountId }) =>
          Shelter.createImportedAccount$(hdAccount, networkType, accountId, name)
        ),
        catchError(() => {
          showErrorToast({
            message: 'Failed to import account.',
            data: { description: 'This may happen because provided Key is invalid.' }
          });

          return of(undefined);
        }),
        tap(() => dispatch(hideLoaderAction()))
      )
      .subscribe(account => {
        if (account !== undefined) {
          dispatch(createHdAccountAction(account));
          navigate(ScreensEnum.Wallet);
          showSuccessToast({
            message: 'Success!',
            data: { description: 'The new account was successfully imported!' }
          });
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  return useCallback(
    (params: Omit<SubjectParams, 'accountId'>) => {
      subject$.next({ ...params, accountId: accounts.length + 1 });
    },
    [subject$, accounts.length]
  );
};
