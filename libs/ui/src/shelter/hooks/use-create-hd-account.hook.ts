import { isDefined, OnEventFn } from '@rnw-community/shared';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { catchError, map, of, Subject, switchMap, tap } from 'rxjs';
import { NetworkTypeEnum } from 'shared';
import { Shelter } from 'shelter';

import { useToast } from '../../hooks/use-toast.hook';
import { hideLoaderAction, showLoaderAction } from '../../store/settings/settings.actions';
import { createHdAccountAction } from '../../store/wallet/wallet.actions';
import {
  useAllAccountsSelector,
  useAllHdAccountsSelector,
  useSelectedNetworkTypeSelector
} from '../../store/wallet/wallet.selectors';

interface SubjectParams {
  accountId: number;
  accountIndex: number;
  networkType: NetworkTypeEnum;
  accountName: string;
  successCallback?: OnEventFn<void>;
}

export const useCreateHdAccount = () => {
  const dispatch = useDispatch();
  const { showSuccessToast, showErrorToast } = useToast();

  const selectedNetworkType = useSelectedNetworkTypeSelector();
  const accounts = useAllAccountsSelector();
  const allHdAccounts = useAllHdAccountsSelector();

  const subject$ = useMemo(() => new Subject<SubjectParams>(), []);

  useEffect(() => {
    const subscription = subject$
      .pipe(
        tap(() => dispatch(showLoaderAction())),
        switchMap(({ accountId, accountIndex, networkType, accountName, successCallback }) =>
          Shelter.createHdAccount$(networkType, accountId, accountIndex, accountName).pipe(
            map(account => ({
              account,
              successCallback
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
        if (isDefined(value) && isDefined(value.account)) {
          const { account, successCallback } = value;

          dispatch(createHdAccountAction(account));
          successCallback?.();
          showSuccessToast({ message: 'Success!', data: { description: 'The new account was successfully added!' } });
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  return useCallback(
    (accountName: string, successCallback?: OnEventFn<void>) =>
      subject$.next({
        accountId: accounts.length + 1,
        accountIndex: allHdAccounts.length,
        networkType: selectedNetworkType,
        accountName,
        successCallback
      }),
    [subject$, accounts.length, selectedNetworkType]
  );
};
