import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Subject } from 'rxjs';

import { ImportWalletParams } from '../shelter/import-wallet-params.interface';
import { importWalletSubscription } from '../shelter/utils/import-wallet-subscription.util';

export const useShelter = () => {
  const dispatch = useDispatch();

  const importWallet$ = useMemo(() => new Subject<ImportWalletParams>(), []);

  useEffect(() => {
    const subscription = importWalletSubscription(importWallet$, dispatch);

    return () => subscription.unsubscribe();
  }, [dispatch, importWallet$]);

  const importWallet = (params: ImportWalletParams) => importWallet$.next(params);

  return {
    importWallet
  };
};
