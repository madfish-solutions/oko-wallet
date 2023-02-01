import { OnEventFn } from '@rnw-community/shared';
import { isAddress } from 'ethers/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Subject, switchMap } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';

import { DEBOUNCE_TIME } from '../constants/defaults';
import { TokenFormTypes } from '../modals/screens/token/types/form-types.interface';
import { useSelectedNetworkSelector } from '../store/wallet/wallet.selectors';
import { getErc20TokenMetadata$ } from '../utils/get-erc20-token-metadata.util';

export const useGetTokenMetadata = (onLoadMetadata: OnEventFn<TokenFormTypes>) => {
  const { rpcUrl } = useSelectedNetworkSelector();
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

  const getTokenMetadata$ = useMemo(() => new Subject<string>(), []);

  const getTokenMetadata = useCallback((tokenAddress: string) => getTokenMetadata$.next(tokenAddress), []);

  useEffect(() => {
    const subscription = getTokenMetadata$
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        filter(tokenAddress => isAddress(tokenAddress)),
        tap(() => setIsLoadingMetadata(true)),
        switchMap(tokenAddress => getErc20TokenMetadata$(tokenAddress, rpcUrl)),
        tap(() => setIsLoadingMetadata(false))
      )
      .subscribe(onLoadMetadata);

    return () => subscription.unsubscribe();
  }, []);

  return { getTokenMetadata, isLoadingMetadata };
};
