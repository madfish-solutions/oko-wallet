import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { TokenMetadata } from '../../../../interfaces/token-metadata.interface';

import { AccountTokensStyles } from './account-tokens-list.styles';

type Props = {
  accountTokens: TokenMetadata[];
};

export const AccountTokensList: FC<Props> = ({ accountTokens }) => (
  <>
    <Text style={AccountTokensStyles.boldText}>All visible tokens</Text>
    {accountTokens.map(({ name, decimals, thumbnailUri }) => (
      <View style={AccountTokensStyles.wrapper} key={name}>
        <Text>Name: {name}</Text>
        <Text>Decimals: {decimals}</Text>
        <Text>Thumbnail: {thumbnailUri}</Text>
      </View>
    ))}
  </>
);
