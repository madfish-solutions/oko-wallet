import React, { FC } from 'react';
import { Text, View, Image } from 'react-native';

import { Token } from '../../../../../interfaces/token.interface';
import { CollectiblesStyles } from '../collectibles.styles';

interface Props {
  token: Token;
}

export const Collectible: FC<Props> = ({ token }) => {
  const { tokenAddress, tokenId, name, artifactUri } = token;

  return (
    <View style={CollectiblesStyles.wrapper}>
      <Image
        source={{
          uri: artifactUri
        }}
        style={CollectiblesStyles.image}
      />
      <Text>Name: {name}</Text>
      <Text>address: {tokenAddress}</Text>
      <Text>Token ID: {tokenId} </Text>
    </View>
  );
};
