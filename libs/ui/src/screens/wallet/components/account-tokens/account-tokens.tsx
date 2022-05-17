import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { TokenMetadata } from '../../../../store/wallet/types';
import { WalletStyles } from '../../wallet.styles';

interface Props {
  visibleAccountTokens: TokenMetadata[];
}

export const AccountTokens: FC<Props> = ({ visibleAccountTokens }) => (
  <>
    {!!visibleAccountTokens.length && <Text style={WalletStyles.boldText}>All visible tokens</Text>}
    {visibleAccountTokens.map(({ address, name, decimals, imageUrl }) => (
      <View style={WalletStyles.wrapper} key={address}>
        <Text>Address: {address}</Text>
        <Text>Name: {name}</Text>
        <Text>Decimals: {decimals}</Text>
        <Text>URL: {imageUrl}</Text>
      </View>
    ))}
  </>
);
