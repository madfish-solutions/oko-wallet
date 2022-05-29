import React, { FC } from 'react';
import { View, Text } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Networks } from '../../components/networks/networks';
import { useVisibleAccountTokensSelector, useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';
import { formatUnits } from '../../utils/units.utils';

import { AccountTokens } from './components/account-tokens/account-tokens';
import { WalletStyles } from './wallet.styles';

export const Wallet: FC = () => {
  const { gasTokenMetadata, gasTokenBalance, rpcUrl } = useSelectedNetworkSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();

  const gasTokenBalanceWithLoading = gasTokenBalance.isLoading
    ? '...'
    : `${formatUnits(gasTokenBalance.data, gasTokenMetadata.decimals)} ${gasTokenMetadata.symbol}`;

  return (
    <View>
      <NavigationBar />
      <View style={WalletStyles.root}>
        <Text style={WalletStyles.wrapper}>
          Balance: <Text style={WalletStyles.boldText}>{gasTokenBalanceWithLoading}</Text>
        </Text>
        <Networks />
        <AccountTokens selectedNetworkRpcUrl={rpcUrl} visibleAccountTokens={visibleAccountTokens} />
      </View>
    </View>
  );
};
