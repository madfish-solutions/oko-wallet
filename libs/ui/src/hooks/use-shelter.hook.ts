import { OnEventFn } from '@rnw-community/shared';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Subject } from 'rxjs';

import { NetworkTypeEnum } from '../enums/network-type.enum';
import { AccountInterface } from '../interfaces/account.interface';
import { CreateHdAccountForNewNetworkParams, CreateHdAccountParams } from '../interfaces/create-hd-account.interface';
import { GetEvmSignerParams } from '../shelter/interfaces/get-evm-signer-params.interface';
import { GetTezosSignerParams } from '../shelter/interfaces/get-tezos-signer-params.interface';
import { ImportWalletParams } from '../shelter/interfaces/import-wallet-params.interface';
import {
  createHdAccountSubscription,
  createHdAccountForNewNetworkTypeSubscription
} from '../shelter/utils/create-hd-account-subscription.util';
import { importWalletSubscription } from '../shelter/utils/import-wallet-subscription.util';
import { sendEvmTransactionSubscription } from '../shelter/utils/send-evm-transaction-subscription.util';
import { sendTezosTransactionSubscription } from '../shelter/utils/send-tezos-transaction-subscription.util';
import { useAllAccountsSelector, useSelectedNetworkTypeSelector } from '../store/wallet/wallet.selectors';

export const useShelter = () => {
  const dispatch = useDispatch();
  const networkType = useSelectedNetworkTypeSelector();
  const accounts = useAllAccountsSelector();

  const importWallet$ = useMemo(() => new Subject<ImportWalletParams>(), []);
  const sendEvmTransaction$ = useMemo(() => new Subject<GetEvmSignerParams>(), []);
  const sendTezosTransaction$ = useMemo(() => new Subject<GetTezosSignerParams>(), []);
  const createHdAccount$ = useMemo(() => new Subject<CreateHdAccountParams>(), []);
  const createHdAccountForNewNetworkType$ = useMemo(() => new Subject<CreateHdAccountForNewNetworkParams>(), []);

  useEffect(() => {
    const subscriptions = [
      importWalletSubscription(importWallet$, dispatch),
      createHdAccountSubscription({
        createHdAccount$,
        dispatch
      }),
      createHdAccountForNewNetworkTypeSubscription({
        createHdAccountForNewNetworkType$,
        dispatch
      }),
      sendEvmTransactionSubscription(sendEvmTransaction$),
      sendTezosTransactionSubscription(sendTezosTransaction$)
    ];

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, [importWallet$, createHdAccount$, createHdAccountForNewNetworkType$, sendEvmTransaction$, sendTezosTransaction$]);

  const importWallet = useCallback((params: ImportWalletParams) => importWallet$.next(params), [importWallet$]);
  const createHdAccount = useCallback(
    (accountName: string, successCallback?: OnEventFn<void>) =>
      createHdAccount$.next({ accountIndex: accounts.length, networkType, accountName, successCallback }),
    [createHdAccount$, accounts.length, networkType]
  );
  const createHdAccountForNewNetworkType = useCallback(
    (account: AccountInterface, networkType: NetworkTypeEnum, successCallback?: OnEventFn<void>) =>
      createHdAccountForNewNetworkType$.next({ account, networkType, successCallback }),
    [createHdAccount$]
  );
  const sendEvmTransaction = useCallback(
    (params: GetEvmSignerParams) => sendEvmTransaction$.next(params),
    [sendEvmTransaction$]
  );
  const sendTezosTransaction = useCallback(
    (params: GetTezosSignerParams) => sendTezosTransaction$.next(params),
    [sendTezosTransaction$]
  );

  return {
    importWallet,
    createHdAccount,
    createHdAccountForNewNetworkType,
    sendEvmTransaction,
    sendTezosTransaction
  };
};
