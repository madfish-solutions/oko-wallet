import { isDefined } from '@rnw-community/shared';
import { useEffect, useState } from 'react';

import { SINGLE_NFTS_KEY } from '../../constants/defaults';
import { Token } from '../../interfaces/token.interface';
import { useCollectiblesSelector } from '../../store/wallet/wallet.selectors';

import { SINGLE_NFT } from './constants';

export const useGroupedCollectibles = () => {
  const initialCollectiblesValue = useCollectiblesSelector();

  const [collectiblesList, setCollectiblesList] = useState<Token[]>([]);
  const [groupedCollectibles, setGroupedCollectibles] = useState<Record<string, Token[]> | null>(null);

  useEffect(() => {
    // TODO: Remove SINGLE_NFT - only for test
    const groupedCollectibles = [...initialCollectiblesValue, SINGLE_NFT].reduce((acc, current) => {
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

    const collectionIds = Object.keys(groupedCollectibles).filter(key => (key !== SINGLE_NFTS_KEY ? key : null));

    const randomNftFromEachCollection = collectionIds.map(collectionId => {
      const randomIndex = Math.round(Math.random() * groupedCollectibles[collectionId].length);

      return groupedCollectibles[collectionId][randomIndex > 0 ? randomIndex - 1 : 0];
    });
    const singleNfts = groupedCollectibles[SINGLE_NFTS_KEY];

    setGroupedCollectibles(groupedCollectibles);
    setCollectiblesList([...randomNftFromEachCollection, ...singleNfts]);
  }, [initialCollectiblesValue]);

  return { collectiblesList, groupedCollectibles };
};
