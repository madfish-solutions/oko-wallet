import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { TokenMetadata } from '../../interfaces/token-metadata.interface';

import { AccountTokensStyles } from './account-tokens.styles';

interface Props {
  visibleAccountTokens: TokenMetadata[];
}

export const AccountTokens: FC<Props> = ({ visibleAccountTokens }) => (
  <>
    {!!visibleAccountTokens.length && <Text style={AccountTokensStyles.boldText}>All visible tokens</Text>}
    {visibleAccountTokens.map(({ tokenAddress, name, decimals, thumbnailUri }) => (
      <View style={AccountTokensStyles.wrapper} key={tokenAddress}>
        <Text>Address: {tokenAddress}</Text>
        <Text>Name: {name}</Text>
        <Text>Decimals: {decimals}</Text>
        <Text>Thumbnail: {thumbnailUri}</Text>
      </View>
    ))}
  </>
);
