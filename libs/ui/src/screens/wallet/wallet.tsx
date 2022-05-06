import React from 'react';
import { Text, View } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { NetworksDropdown } from '../../components/network-dropdown';
import { Title } from '../../components/title';
import { useGetGasTokenDataSelector } from '../../store/wallet/wallet.selectors';

import { WalletStyles } from './wallet.styles';

export const Wallet = () => {
  const { gasToken, gasTokenBalance } = useGetGasTokenDataSelector();

  const getGasTokenBalance = () =>
    gasTokenBalance.isLoading ? 'Loading...' : `${gasTokenBalance.data} ${gasToken.symbol}`;

  return (
    <View>
      <NavigationBar />
      <Title>Wallet</Title>
      <View style={WalletStyles.root}>
        <Text style={WalletStyles.marginBottom}>{`Balance: ${getGasTokenBalance()}`}</Text>
        <NetworksDropdown />
      </View>
    </View>
  );
};
