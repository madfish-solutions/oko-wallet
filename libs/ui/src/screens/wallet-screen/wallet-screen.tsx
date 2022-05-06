import React from 'react';
import { Text, View } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { NetworksDropdown } from '../../components/network-dropdown';
import { Title } from '../../components/title';
import { useGetGasTokenDataSelector } from '../../store/wallet/wallet.selectors';

import { WalletScreenStyles } from './wallet-screen.styles';

export const WalletScreen = () => {
  const { gasToken, gasTokenBalance } = useGetGasTokenDataSelector();

  const getGasTokenBalance = () =>
    gasTokenBalance.isLoading ? 'Loading...' : `${gasTokenBalance.data} ${gasToken.symbol}`;

  return (
    <View>
      <NavigationBar />
      <Title>Wallet</Title>
      <View style={WalletScreenStyles.root}>
        <NetworksDropdown style={WalletScreenStyles.dropdown} />
        <Text>{`Balance: ${getGasTokenBalance()}`}</Text>
      </View>
    </View>
  );
};
