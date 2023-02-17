import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Subject, switchMap, tap } from 'rxjs';
import { NetworkTypeEnum } from 'shared';
import { Shelter } from 'shelter';

import { hideLoaderAction, showLoaderAction } from '../../store/settings/settings.actions';
import { createHdAccountAction, setSelectedAccountAction } from '../../store/wallet/wallet.actions';
import { getString } from '../../utils/get-string.utils';

interface SubjectParams {
  seedPhrase: string;
  password: string;
  hdAccountsLength?: number;
  accountName?: string;
}

export const useImportWallet = () => {
  const dispatch = useDispatch();

  const subject$ = useMemo(() => new Subject<SubjectParams>(), []);

  useEffect(() => {
    const subscription = subject$
      .pipe(
        tap(() => dispatch(showLoaderAction())),
        switchMap(({ seedPhrase, password, hdAccountsLength, accountName }) =>
          Shelter.importAccount$(seedPhrase, password, hdAccountsLength, accountName)
        ),
        tap(() => dispatch(hideLoaderAction()))
      )
      .subscribe(importedAccounts => {
        if (importedAccounts !== undefined) {
          const firstAccount = importedAccounts[0];
          dispatch(setSelectedAccountAction(getString(firstAccount.networksKeys[NetworkTypeEnum.EVM]?.publicKeyHash)));

          for (const account of importedAccounts) {
            dispatch(createHdAccountAction(account));
          }
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  return useCallback((params: SubjectParams) => subject$.next(params), [subject$]);
};
