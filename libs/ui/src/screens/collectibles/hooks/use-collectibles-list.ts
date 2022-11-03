import { useEffect, useState } from 'react';

import { EMPTY_STRING } from '../../../constants/defaults';
import { Token } from '../../../interfaces/token.interface';

export const useCollectibleList = (collectiblesList: Token[]) => {
  const [collectibles, setCollectibles] = useState<Token[]>(collectiblesList);
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  useEffect(() => {
    setCollectibles(collectiblesList);
  }, [collectiblesList]);

  useEffect(() => {
    const unifiedSearchValue = searchValue.toLowerCase().trim();

    const filteredCollectibles = collectiblesList.filter(
      nft =>
        (nft.contractName ?? '').toLowerCase().trim().includes(unifiedSearchValue) ||
        nft.name.toLowerCase().trim().includes(unifiedSearchValue) ||
        nft.tokenAddress.toLowerCase().trim().includes(unifiedSearchValue) ||
        nft.tokenId?.toLowerCase().trim().includes(unifiedSearchValue)
    );

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
