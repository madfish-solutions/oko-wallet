import React, { FC } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Networks } from '../../components/networks/networks';
import { switchAccount } from '../../store/wallet/wallet.actions';
import { useVisibleAccountTokensSelector, useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';
import { ACCOUNT_1, ACCOUNT_2 } from '../../store/wallet/wallet.state';

import { AccountTokens } from './components/account-tokens/account-tokens';
import { WalletStyles } from './wallet.styles';

export const Wallet: FC = () => {
  const dispatch = useDispatch();
  const { gasTokenMetadata, gasTokenBalance } = useSelectedNetworkSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();

  const gasTokenBalanceWithLoading = gasTokenBalance.isLoading
    ? '...'
    : `${gasTokenBalance.data} ${gasTokenMetadata.symbol}`;

  const handleSwitchAccount = (pkh: string) => dispatch(switchAccount(pkh));

  return (
    <View>
      <NavigationBar />
      <View style={WalletStyles.root}>
        <Text style={WalletStyles.wrapper}>
          Balance: <Text style={WalletStyles.boldText}>{gasTokenBalanceWithLoading}</Text>
        </Text>
        <Networks />
        <AccountTokens visibleAccountTokens={visibleAccountTokens} />
        <View>
          <Button title="Account 1" onPress={() => handleSwitchAccount(ACCOUNT_1)} />
          <Button title="Account 2" onPress={() => handleSwitchAccount(ACCOUNT_2)} />
        </View>
      </View>
    </View>
  );
};
