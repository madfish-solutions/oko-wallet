import { isDefined } from '@rnw-community/shared';
import { useEffect, useState } from 'react';

import { SINGLE_NFTS_KEY } from '../../../constants/defaults';
import { Token } from '../../../interfaces/token.interface';
import { useCollectiblesSelector } from '../../../store/wallet/wallet.selectors';

export const useGroupedCollectibles = () => {
  const initialCollectiblesValue = useCollectiblesSelector();

  const [collectionList, setCollectionList] = useState<Token[]>([]);
  const [groupedCollectibles, setGroupedCollectibles] = useState<Record<string, Token[]> | null>(null);

  useEffect(() => {
    const manuallyGroupedCollectibles = initialCollectiblesValue.reduce((acc, current) => {
      if (isDefined(current.contractName)) {
        if (acc.hasOwnProperty(current.contractName)) {
          acc[current.contractName].push(current);
        } else {
          acc[current.contractName] = [current];
        }
      } else {
        if (acc.hasOwnProperty(SINGLE_NFTS_KEY)) {
          acc[SINGLE_NFTS_KEY].push(current);
        } else {
          acc[SINGLE_NFTS_KEY] = [current];
        }
      }

      return acc;
    }, {} as Record<string, Token[]>);

    const collectionKeys = Object.keys(manuallyGroupedCollectibles).filter(key => key !== SINGLE_NFTS_KEY);

    const randomNftFromEachCollection = collectionKeys.map(collectionKey => {
      const randomIndex = Math.round(Math.random() * (manuallyGroupedCollectibles[collectionKey].length - 1));

      return {
        ...manuallyGroupedCollectibles[collectionKey][randomIndex],
        collectionSize: manuallyGroupedCollectibles[collectionKey].length
      };
    });
    const singleNfts = manuallyGroupedCollectibles.hasOwnProperty(SINGLE_NFTS_KEY)
      ? manuallyGroupedCollectibles[SINGLE_NFTS_KEY]
      : [];

    setGroupedCollectibles(manuallyGroupedCollectibles);
    setCollectionList([...randomNftFromEachCollection, ...singleNfts]);
  }, [initialCollectiblesValue.length]);

  return { collectionList, groupedCollectibles, allCollectibles: initialCollectiblesValue };
};
