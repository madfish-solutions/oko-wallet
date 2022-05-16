import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { WalletStyles } from '../../wallet.styles';

import { AccountTokensProps } from './types';

export const AccountTokens: FC<AccountTokensProps> = ({ visibleAccountTokens }) => (
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
