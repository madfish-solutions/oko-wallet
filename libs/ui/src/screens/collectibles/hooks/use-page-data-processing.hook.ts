import { isDefined } from '@rnw-community/shared';
import { useEffect, useState } from 'react';

import { EMPTY_STRING } from '../../../constants/defaults';
import { Token } from '../../../interfaces/token.interface';

export const usePageDataProcessing = (collectiblesList: Token[], isSpecificCollection = false) => {
  const [collectibles, setCollectibles] = useState<Token[]>(collectiblesList);
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  useEffect(() => {
    setCollectibles(collectiblesList);
  }, [collectiblesList]);

  useEffect(() => {
    const unifiedSearchValue = searchValue.toLowerCase().trim();

    const filteredCollectibles = collectiblesList.filter(nft => {
      if (isDefined(nft.collectionId) && !isSpecificCollection) {
        return isDefined(nft.contractName) && nft.contractName.toLowerCase().trim().includes(unifiedSearchValue);
      }

      return nft.name.toLowerCase().trim().includes(unifiedSearchValue);
    });

    setCollectibles(filteredCollectibles);

    if (searchValue === EMPTY_STRING) {
      setCollectibles(collectiblesList);
    }
  }, [searchValue, collectiblesList]);

  return {
    collectibles,
    setSearchValue
  };
};
