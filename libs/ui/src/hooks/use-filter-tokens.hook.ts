import { useMemo, useState } from 'react';

import { EMPTY_STRING } from '../constants/defaults';
import { Token } from '../interfaces/token.interface';
import { filterAccountTokensByValue } from '../screens/tokens/utils/filter-account-tokens-by-value.util';

export const useFilterAccountTokens = (initialAccountTokens: Token[]) => {
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  const accountTokens = useMemo(() => {
    if (searchValue && initialAccountTokens.length) {
      return filterAccountTokensByValue(initialAccountTokens, searchValue);
    }

    return initialAccountTokens;
  }, [searchValue, initialAccountTokens]);

  return { accountTokens, setSearchValue };
};
