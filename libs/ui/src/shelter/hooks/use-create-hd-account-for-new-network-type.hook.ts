import { OnEventFn } from '@rnw-community/shared';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { catchError, map, of, Subject, switchMap, tap } from 'rxjs';
import { NetworkTypeEnum, AccountInterface } from 'shared';
import { Shelter } from 'shelter';

import { useToast } from '../../hooks/use-toast.hook';
import { hideLoaderAction, showLoaderAction } from '../../store/settings/settings.actions';
import { createHdAccountForNewNetworkTypeAction } from '../../store/wallet/wallet.actions';
import { useAllHdAccountsSelector } from '../../store/wallet/wallet.selectors';

interface SubjectParams {
  account: AccountInterface;
  accountIndex: number;
  networkType: NetworkTypeEnum;
  switchToNewAccount?: boolean;
  successCallback?: OnEventFn<AccountInterface>;
}

export const useCreateHdAccountForNewNetworkType = () => {
  const dispatch = useDispatch();
  const { showSuccessToast, showErrorToast } = useToast();

  const allHdAccounts = useAllHdAccountsSelector();

  const subject$ = useMemo(() => new Subject<SubjectParams>(), []);

  useEffect(() => {
    const subscription = subject$
      .pipe(
        tap(() => dispatch(showLoaderAction())),
        switchMap(({ account, accountIndex, networkType, successCallback, switchToNewAccount }) =>
          Shelter.createHdAccount$(networkType, account.accountId, accountIndex, account.name).pipe(
            map(newAccount => ({
              updatedAccount: {
                ...account,
                ...newAccount,
                networksKeys: {
                  ...account.networksKeys,
                  ...newAccount?.networksKeys
                }
              },
              successCallback,
              switchToNewAccount
            }))
          )
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
      .subscribe(value => {
        if (value !== undefined) {
          const { updatedAccount, successCallback, switchToNewAccount = true } = value;

          dispatch(createHdAccountForNewNetworkTypeAction({ account: updatedAccount, switchToNewAccount }));
          successCallback?.(updatedAccount);
          showSuccessToast({ message: 'Success!', data: { description: 'The new account was successfully added!' } });
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  return useCallback(
    (
      account: AccountInterface,
      newNetworkType: NetworkTypeEnum,
      successCallback?: OnEventFn<AccountInterface>,
      switchToNewAccount?: boolean
    ) =>
      subject$.next({
        account,
        accountIndex: allHdAccounts.indexOf(account),
        networkType: newNetworkType,
        successCallback,
        switchToNewAccount
      }),
    [subject$, allHdAccounts]
  );
};
