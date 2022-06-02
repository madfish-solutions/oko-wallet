import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { EMPTY, Subject } from 'rxjs';

import { NetworkTypeEnum } from '../enums/network-type.enum';
import { AccountInterface } from '../interfaces/account.interface';
import { ImportWalletParams } from '../shelter/import-wallet-params.interface';
import {
  createHdAccountSubscription,
  createHdAccountWithOtherNetworkTypeSubscription
} from '../shelter/utils/create-hd-account-subscription.util';
import { importWalletSubscription } from '../shelter/utils/import-wallet-subscription.util';
import { useAllAccountsSelector, useSelectedNetworkTypeSelector } from '../store/wallet/wallet.selectors';

export const useShelter = () => {
  const dispatch = useDispatch();
  const networkType = useSelectedNetworkTypeSelector();
  const accounts = useAllAccountsSelector();

  const importWallet$ = useMemo(() => new Subject<ImportWalletParams>(), []);
  const createHdAccount$ = useMemo(() => new Subject(), []);
  const createHdAccountWithOtherNetworkType$ = useMemo(
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
      createHdAccountWithOtherNetworkTypeSubscription({
        createHdAccount$: createHdAccountWithOtherNetworkType$,
        dispatch
      })
    ];

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, [dispatch, importWallet$, createHdAccount$, createHdAccountWithOtherNetworkType$, accounts, networkType]);

  const importWallet = useCallback((params: ImportWalletParams) => importWallet$.next(params), [importWallet$]);
  const createHdAccount = () => createHdAccount$.next(EMPTY);
  const createHdAccountWithOtherNetworkType = useCallback(
    (account: AccountInterface, networkType: NetworkTypeEnum) =>
      createHdAccountWithOtherNetworkType$.next({ account, networkType }),
    [createHdAccount$]
  );

  return {
    importWallet,
    createHdAccount,
    createHdAccountWithOtherNetworkType
  };
};
