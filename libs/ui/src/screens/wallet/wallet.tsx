import React, { FC, Fragment } from 'react';
import { View, Text } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { useVisibleAccountTokens } from '../../store/wallet/wallet.selectors';

export const Wallet: FC = () => {
  const visibleAccountTokens = useVisibleAccountTokens();

  return (
    <View>
      <NavigationBar />
      <Text>Wallet</Text>
      {visibleAccountTokens.map(({ tokenAddress, name, decimals, url }) => (
        <Fragment key={tokenAddress}>
          <Text>Address: {tokenAddress}</Text>
          <Text>Name: {name}</Text>
          <Text>Decimals: {decimals}</Text>
          <Text>URL: {url}</Text>
        </Fragment>
      ))}
    </View>
  );
};
