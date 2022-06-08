import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Subject } from 'rxjs';

import { GetEvmSignerParams } from '../shelter/interfaces/get-evm-signer-params.interface';
import { GetTezosSignerParams } from '../shelter/interfaces/get-tezos-signer-params.interface';
import { ImportWalletParams } from '../shelter/interfaces/import-wallet-params.interface';
import { getEvmSignerSubscription } from '../shelter/utils/get-evm-signer-subscription.util';
import { getTezosSignerSubscription } from '../shelter/utils/get-tezos-signer-subscription.util';
import { importWalletSubscription } from '../shelter/utils/import-wallet-subscription.util';

export const useShelter = () => {
  const dispatch = useDispatch();

  const importWallet$ = useMemo(() => new Subject<ImportWalletParams>(), []);
  const getEvmSigner$ = useMemo(() => new Subject<GetEvmSignerParams>(), []);
  const getTezosSigner$ = useMemo(() => new Subject<GetTezosSignerParams>(), []);

  useEffect(() => {
    const subscriptions = [
      importWalletSubscription(importWallet$, dispatch),
      getEvmSignerSubscription(getEvmSigner$),
      getTezosSignerSubscription(getTezosSigner$)
    ];

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, []);

  const importWallet = useCallback((params: ImportWalletParams) => importWallet$.next(params), [importWallet$]);
  const getEvmSigner = useCallback((params: GetEvmSignerParams) => getEvmSigner$.next(params), [getEvmSigner$]);
  const getTezosSigner = useCallback((params: GetTezosSignerParams) => getTezosSigner$.next(params), [getTezosSigner$]);

  return {
    importWallet,
    getEvmSigner,
    getTezosSigner
  };
};
