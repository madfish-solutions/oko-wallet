import React, { FC, Fragment } from 'react';
import { View, Text } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Networks } from '../../components/networks/networks';
import { useVisibleAccountTokens, useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';

import { WalletStyles } from './wallet.styles';

export const Wallet: FC = () => {
  const { gasTokenMetadata, gasTokenBalance } = useSelectedNetworkSelector();
  const visibleAccountTokens = useVisibleAccountTokens();

  const gasTokenBalanceWithLoading = gasTokenBalance.isLoading
    ? '...'
    : `${gasTokenBalance.data} ${gasTokenMetadata.symbol}`;

  return (
    <View>
      <NavigationBar />
      <View style={WalletStyles.root}>
        <Text style={WalletStyles.balanceWrapper}>
          Balance: <Text style={WalletStyles.balance}>{gasTokenBalanceWithLoading}</Text>
        </Text>
        <Networks />

        {visibleAccountTokens.map(({ tokenAddress, name, decimals, url }) => (
          <Fragment key={tokenAddress}>
            <Text>Address: {tokenAddress}</Text>
            <Text>Name: {name}</Text>
            <Text>Decimals: {decimals}</Text>
            <Text>URL: {url}</Text>
          </Fragment>
        ))}
      </View>
    </View>
  );
};
