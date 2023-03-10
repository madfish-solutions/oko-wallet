import { isDefined, OnEventFn } from '@rnw-community/shared';
import { isAddress } from 'ethers/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Subject, switchMap } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';

import { getTokenInfo } from '../api/debank/debank';
import { getDebankId } from '../api/debank/utils/get-debank-id.util';
import { DEBOUNCE_TIME, EMPTY_METADATA } from '../constants/defaults';
import { TokenFormType } from '../interfaces/token.interface';
import { useSelectedNetworkSelector } from '../store/wallet/wallet.selectors';

export const useGetTokenMetadata = (onLoadMetadata: OnEventFn<TokenFormType>) => {
  const { chainId } = useSelectedNetworkSelector();
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

  const getTokenMetadata$ = useMemo(() => new Subject<string>(), []);

  const getTokenMetadata = useCallback((tokenAddress: string) => getTokenMetadata$.next(tokenAddress), []);

  useEffect(() => {
    const subscription = getTokenMetadata$
      .pipe(
        tap(() => setIsLoadingMetadata(true)),
        debounceTime(DEBOUNCE_TIME),
        filter(tokenAddress => isAddress(tokenAddress)),
        switchMap(tokenAddress => getTokenInfo(tokenAddress, getDebankId(chainId))),
        map(debankData =>
          isDefined(debankData)
            ? {
                tokenAddress: debankData.id,
                name: debankData.name,
                symbol: debankData.symbol,
                decimals: debankData.decimals.toString(),
                thumbnailUri: debankData.logo_url ?? ''
              }
            : EMPTY_METADATA
        ),
        tap(() => setIsLoadingMetadata(false))
      )
      .subscribe(onLoadMetadata);

    return () => subscription.unsubscribe();
  }, []);

  return { getTokenMetadata, isLoadingMetadata };
};
