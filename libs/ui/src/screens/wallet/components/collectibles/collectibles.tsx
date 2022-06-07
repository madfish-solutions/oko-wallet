import React, { FC } from 'react';
import { Text } from 'react-native';

import { Token } from '../../../../interfaces/token.interface';
import { getTokenSlug } from '../../../../utils/token.utils';

import { CollectiblesStyles } from './collectibles.styles';
import { Collectible } from './components/collectible';

interface Props {
  collectibles: Token[];
}

export const Collectibles: FC<Props> = ({ collectibles }) => (
  <>
    {!!collectibles.length && <Text style={CollectiblesStyles.boldText}>All visible NFT's</Text>}
    {collectibles.map(collectible => (
      <Collectible key={getTokenSlug(collectible)} token={collectible} />
    ))}
  </>
);
