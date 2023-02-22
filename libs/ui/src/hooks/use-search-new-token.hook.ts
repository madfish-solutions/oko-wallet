import { isDefined, isEmptyString } from '@rnw-community/shared';
import { isAddress } from 'ethers/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { EMPTY_STRING } from '../constants/defaults';
import { Token, TokenFormType } from '../interfaces/token.interface';
import { compare } from '../screens/tokens/utils/compare.util';
import { createEntity } from '../store/utils/entity.utils';

import { useGetTokenMetadata } from './use-get-token-metadata.hook';

export const useSearchNewToken = (tokens: Token[]) => {
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [newToken, setNewToken] = useState<Token | null>(null);

  const handleLoadNewTokenMetadata = useCallback((metadata: TokenFormType) => {
    if (isDefined(metadata)) {
      if (!isEmptyString(metadata.name) && !isEmptyString(metadata.symbol)) {
        setNewToken({
          tokenAddress: metadata.tokenAddress,
          decimals: Number(metadata.decimals),
          isVisible: false,
          name: metadata.name,
          symbol: metadata.symbol,
          balance: createEntity('0'),
          thumbnailUri: metadata.thumbnailUri
        });
      }
    }
  }, []);

  const { getTokenMetadata, isLoadingMetadata } = useGetTokenMetadata(handleLoadNewTokenMetadata);

  const isTokenExistOnAccount = useMemo(
    () => isDefined(tokens.find(token => compare(token, searchValue))),
    [searchValue, tokens]
  );

  useEffect(() => {
    if (isAddress(searchValue) && !isTokenExistOnAccount) {
      getTokenMetadata(searchValue);
    } else {
      setNewToken(null);
    }
  }, [searchValue, isTokenExistOnAccount]);

  return { newToken, isLoadingMetadata, searchValue, setSearchValue };
};
