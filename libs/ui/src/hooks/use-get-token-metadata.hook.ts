import { OnEventFn } from '@rnw-community/shared';
import { isAddress } from 'ethers/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { forkJoin, Subject, switchMap } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';

import { getTokenInfo } from '../api/debank/debank';
import { getDebankId } from '../api/debank/utils/get-debank-id.util';
import { DEBOUNCE_TIME } from '../constants/defaults';
import { TokenFormTypes } from '../modals/screens/token/types/form-types.interface';
import { useSelectedNetworkSelector } from '../store/wallet/wallet.selectors';
import { getErc20TokenMetadata$ } from '../utils/get-erc20-token-metadata.util';

export const useGetTokenMetadata = (onLoadMetadata: OnEventFn<TokenFormTypes>) => {
  const { rpcUrl, chainId } = useSelectedNetworkSelector();
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

  const getTokenMetadata$ = useMemo(() => new Subject<string>(), []);

  const getTokenMetadata = useCallback((tokenAddress: string) => getTokenMetadata$.next(tokenAddress), []);

  useEffect(() => {
    const subscription = getTokenMetadata$
      .pipe(
        tap(() => setIsLoadingMetadata(true)),
        debounceTime(DEBOUNCE_TIME),
        filter(tokenAddress => isAddress(tokenAddress)),
        switchMap(tokenAddress =>
          forkJoin([getErc20TokenMetadata$(tokenAddress, rpcUrl), getTokenInfo(tokenAddress, getDebankId(chainId))])
        ),
        map(([metadata, debankData]) => ({ ...metadata, thumbnailUri: debankData?.logo_url ?? '' })),
        tap(() => setIsLoadingMetadata(false))
      )
      .subscribe(onLoadMetadata);

    return () => subscription.unsubscribe();
  }, []);

  return { getTokenMetadata, isLoadingMetadata };
};
