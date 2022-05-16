import React, { FC, Fragment } from 'react';
import { View, Text } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Networks } from '../../components/networks/networks';
import { useVisibleAccountTokensSelector, useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';

import { WalletStyles } from './wallet.styles';

export const Wallet: FC = () => {
  const { gasTokenMetadata, gasTokenBalance } = useSelectedNetworkSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();

  const gasTokenBalanceWithLoading = gasTokenBalance.isLoading
    ? '...'
    : `${gasTokenBalance.data} ${gasTokenMetadata.symbol}`;

  return (
    <View>
      <NavigationBar />
      <View style={WalletStyles.root}>
        <Text style={WalletStyles.balanceWrapper}>
          Balance: <Text style={WalletStyles.boldText}>{gasTokenBalanceWithLoading}</Text>
        </Text>
        <Networks />

        {!!visibleAccountTokens.length && <Text style={WalletStyles.boldText}>All visible tokens</Text>}
        {visibleAccountTokens.map(({ address, name, decimals, imageUrl }) => (
          <Fragment key={address}>
            <Text>Address: {address}</Text>
            <Text>Name: {name}</Text>
            <Text>Decimals: {decimals}</Text>
            <Text>URL: {imageUrl}</Text>
          </Fragment>
        ))}
      </View>
    </View>
  );
};
