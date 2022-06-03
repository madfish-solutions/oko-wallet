import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { EMPTY, Subject } from 'rxjs';

import { NetworkTypeEnum } from '../enums/network-type.enum';
import { AccountInterface } from '../interfaces/account.interface';
import { ImportWalletParams } from '../shelter/import-wallet-params.interface';
import {
  createHdAccountSubscription,
  createHdAccountForNewNetworkTypeSubscription
} from '../shelter/utils/create-hd-account-subscription.util';
import { importWalletSubscription } from '../shelter/utils/import-wallet-subscription.util';
import { useAllAccountsSelector, useSelectedNetworkTypeSelector } from '../store/wallet/wallet.selectors';

export const useShelter = () => {
  const dispatch = useDispatch();
  const networkType = useSelectedNetworkTypeSelector();
  const accounts = useAllAccountsSelector();

  const importWallet$ = useMemo(() => new Subject<ImportWalletParams>(), []);
  const createHdAccount$ = useMemo(() => new Subject(), []);
  const createHdAccountForNewNetworkType$ = useMemo(
    () => new Subject<{ account: AccountInterface; networkType: NetworkTypeEnum }>(),
    []
  );

  useEffect(() => {
    const subscriptions = [
      importWalletSubscription(importWallet$, dispatch),
      createHdAccountSubscription({
        createHdAccount$,
        networkType,
        accountsLength: accounts.length,
        dispatch
      }),
      createHdAccountForNewNetworkTypeSubscription({
        createHdAccount$: createHdAccountForNewNetworkType$,
        dispatch
      })
    ];

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, [dispatch, importWallet$, createHdAccount$, createHdAccountForNewNetworkType$, accounts, networkType]);

  const importWallet = useCallback((params: ImportWalletParams) => importWallet$.next(params), [importWallet$]);
  const createHdAccount = () => createHdAccount$.next(EMPTY);
  const createHdAccountForNewNetworkType = useCallback(
    (account: AccountInterface, networkType: NetworkTypeEnum) =>
      createHdAccountForNewNetworkType$.next({ account, networkType }),
    [createHdAccount$]
  );

  return {
    importWallet,
    createHdAccount,
    createHdAccountForNewNetworkType
  };
};
