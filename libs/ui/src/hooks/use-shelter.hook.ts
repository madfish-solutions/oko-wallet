import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { EMPTY, Subject } from 'rxjs';

import { NetworkTypeEnum } from '../enums/network-type.enum';
import { AccountInterface } from '../interfaces/account.interface';
import { GetEvmSignerParams } from '../shelter/interfaces/get-evm-signer-params.interface';
import { GetTezosSignerParams } from '../shelter/interfaces/get-tezos-signer-params.interface';
import { ImportWalletParams } from '../shelter/interfaces/import-wallet-params.interface';
import {
  createHdAccountSubscription,
  createHdAccountForNewNetworkTypeSubscription
} from '../shelter/utils/create-hd-account-subscription.util';
import { getEvmSignerSubscription } from '../shelter/utils/get-evm-signer-subscription.util';
import { getTezosSignerSubscription } from '../shelter/utils/get-tezos-signer-subscription.util';
import { importWalletSubscription } from '../shelter/utils/import-wallet-subscription.util';
import { useAllAccountsSelector, useSelectedNetworkTypeSelector } from '../store/wallet/wallet.selectors';

export const useShelter = () => {
  const dispatch = useDispatch();
  const networkType = useSelectedNetworkTypeSelector();
  const accounts = useAllAccountsSelector();

  const importWallet$ = useMemo(() => new Subject<ImportWalletParams>(), []);
  const getEvmSigner$ = useMemo(() => new Subject<GetEvmSignerParams>(), []);
  const getTezosSigner$ = useMemo(() => new Subject<GetTezosSignerParams>(), []);
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
      }),
      getEvmSignerSubscription(getEvmSigner$),
      getTezosSignerSubscription(getTezosSigner$)
    ];

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, [accounts, networkType]);

  const importWallet = useCallback((params: ImportWalletParams) => importWallet$.next(params), [importWallet$]);
  const createHdAccount = () => createHdAccount$.next(EMPTY);
  const createHdAccountForNewNetworkType = useCallback(
    (account: AccountInterface, networkType: NetworkTypeEnum) =>
      createHdAccountForNewNetworkType$.next({ account, networkType }),
    [createHdAccount$]
  );
  const getEvmSigner = useCallback((params: GetEvmSignerParams) => getEvmSigner$.next(params), [getEvmSigner$]);
  const getTezosSigner = useCallback((params: GetTezosSignerParams) => getTezosSigner$.next(params), [getTezosSigner$]);

  return {
    importWallet,
    createHdAccount,
    createHdAccountForNewNetworkType,
    getEvmSigner,
    getTezosSigner
  };
};
