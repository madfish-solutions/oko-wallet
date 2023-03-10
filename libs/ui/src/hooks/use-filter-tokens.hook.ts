import { isDefined } from '@rnw-community/shared';
import { useMemo } from 'react';

import { Token } from '../interfaces/token.interface';
import { filterAccountTokensByValue } from '../screens/tokens/utils/filter-account-tokens-by-value.util';

export const useFilterAccountTokens = (initialAccountTokens: Token[], searchValue: string, newToken?: Token | null) => {
  const accountTokens = useMemo(() => {
    if (isDefined(newToken)) {
      return [newToken];
    }

    if (searchValue && initialAccountTokens.length) {
      return filterAccountTokensByValue(initialAccountTokens, searchValue);
    }

    return initialAccountTokens;
  }, [searchValue, initialAccountTokens, newToken]);

  return { accountTokens };
};
