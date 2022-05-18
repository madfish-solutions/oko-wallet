import React, { FC } from 'react';
import { View } from 'react-native';

import { AccountTokens } from '../../components/account-tokens/account-tokens';
import { Account } from '../../components/account/account';
import { GasTokenBalance } from '../../components/gas-token-balance/gas-token-balance';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { useVisibleAccountTokensSelector } from '../../store/wallet/wallet.selectors';

export const Wallet: FC = () => {
  const visibleAccountTokens = useVisibleAccountTokensSelector();

  return (
    <View>
      <NavigationBar />
      <Account />
      <GasTokenBalance />
      <AccountTokens visibleAccountTokens={visibleAccountTokens} />
    </View>
  );
};
