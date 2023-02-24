import { isDefined, isEmptyString } from '@rnw-community/shared';
import { isAddress } from 'ethers/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { EMPTY_STRING } from '../constants/defaults';
import { Token, TokenFormType } from '../interfaces/token.interface';
import { checkTokenOnExist } from '../screens/tokens/utils/compare.util';
import { createEntity } from '../store/utils/entity.utils';
import {
  useAccountTokensAndGasTokenSelector,
  useSelectedNetworkSelector,
  useTokensMetadataSelector
} from '../store/wallet/wallet.selectors';
import { getSlug } from '../utils/getSlug.uitl';
import { getTokenSlug } from '../utils/token.utils';

import { useGetTokenMetadata } from './use-get-token-metadata.hook';

export const useSearchNewToken = () => {
  const tokens = useAccountTokensAndGasTokenSelector();
  const allTokensMetadata = useTokensMetadataSelector();
  const { chainId } = useSelectedNetworkSelector();
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [newToken, setNewToken] = useState<Token | null>(null);

  const handleLoadNewTokenMetadata = useCallback((metadata: TokenFormType) => {
    if (isDefined(metadata) && !isEmptyString(metadata.name) && !isEmptyString(metadata.symbol)) {
      setNewToken({
        tokenAddress: metadata.tokenAddress,
        decimals: Number(metadata.decimals),
        name: metadata.name,
        symbol: metadata.symbol,
        thumbnailUri: metadata.thumbnailUri,
        isVisible: false,
        balance: createEntity('0')
      });
    }
  }, []);

  const { getTokenMetadata, isLoadingMetadata } = useGetTokenMetadata(handleLoadNewTokenMetadata);

  const isTokenExistOnAccount = useMemo(
    () => isDefined(tokens.find(token => checkTokenOnExist(token, searchValue))),
    [searchValue, tokens]
  );

  useEffect(() => {
    if (isAddress(searchValue) && !isTokenExistOnAccount) {
      const metadataKey = getSlug(chainId, getTokenSlug(searchValue));

      if (metadataKey in allTokensMetadata) {
        setNewToken({
          ...allTokensMetadata[metadataKey],
          tokenAddress: searchValue,
          isVisible: false,
          balance: createEntity('0')
        });
      } else {
        getTokenMetadata(searchValue);
      }
    } else {
      setNewToken(null);
    }
  }, [searchValue, isTokenExistOnAccount, chainId, allTokensMetadata]);

  return { newToken, isLoadingMetadata, searchValue, setSearchValue };
};
