import { isDefined } from '@rnw-community/shared';
import { useEffect, useState } from 'react';

import { SINGLE_NFTS_KEY } from '../../../constants/defaults';
import { Token } from '../../../interfaces/token.interface';
import { useCollectiblesSelector } from '../../../store/wallet/wallet.selectors';

export const useGroupedCollectibles = () => {
  const initialCollectiblesValue = useCollectiblesSelector();

  const [collectiblesList, setCollectiblesList] = useState<Token[]>([]);
  const [groupedCollectibles, setGroupedCollectibles] = useState<Record<string, Token[]> | null>(null);

  useEffect(() => {
    const manuallyGroupedCollectibles = initialCollectiblesValue.reduce((acc, current) => {
      if (isDefined(current.collectionId)) {
        if (acc.hasOwnProperty(current.collectionId)) {
          acc[current.collectionId].push(current);
        } else {
          acc[current.collectionId] = [current];
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

    const collectionIds = Object.keys(manuallyGroupedCollectibles).filter(key => key !== SINGLE_NFTS_KEY);

    const randomNftFromEachCollection = collectionIds.map(collectionId => {
      const randomIndex = Math.round(Math.random() * (manuallyGroupedCollectibles[collectionId].length - 1));

      return manuallyGroupedCollectibles[collectionId][randomIndex];
    });
    const singleNfts = manuallyGroupedCollectibles.hasOwnProperty(SINGLE_NFTS_KEY)
      ? manuallyGroupedCollectibles[SINGLE_NFTS_KEY]
      : [];

    setGroupedCollectibles(manuallyGroupedCollectibles);
    setCollectiblesList([...randomNftFromEachCollection, ...singleNfts]);
  }, [initialCollectiblesValue.length]);

  return { collectiblesList, groupedCollectibles };
};
