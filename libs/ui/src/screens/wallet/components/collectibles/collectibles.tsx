import React, { FC } from 'react';
import { Text } from 'react-native';

import { Token } from '../../../../interfaces/token.interface';
import { WalletStyles } from '../../wallet.styles';

import { Collectible } from './components/collectible';

interface Props {
  collectibles: Token[];
}

export const Collectibles: FC<Props> = ({ collectibles }) => (
  <>
    {!!collectibles.length && <Text style={WalletStyles.boldText}>All visible NFT's</Text>}
    {collectibles.map(collectible => (
      <Collectible key={`${collectible.tokenAddress}${collectible.tokenId}`} token={collectible} />
    ))}
  </>
);
