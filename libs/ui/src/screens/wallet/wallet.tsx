import React, { FC, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Account } from '../../components/account/account';
import { GasTokenBalance } from '../../components/gas-token-balance/gas-token-balance';
import { Header } from '../../components/header/header';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { useUnlock } from '../../hooks/use-unlock.hook';
import { resetApplicationAction } from '../../store/root-state.actions';

import { AccountTokens } from './components/account-tokens/account-tokens';
import { WalletStyles } from './wallet.styles';

export const Wallet: FC = () => {
  const { isLocked } = useUnlock();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('here');
  //   dispatch(resetApplicationAction.submit());
  // }, []);

  return (
    <View style={WalletStyles.root}>
      <Header />
      <NavigationBar />
      <ScrollView scrollEnabled={!isLocked}>
        <Account />
        <GasTokenBalance />
        <AccountTokens />
      </ScrollView>
    </View>
  );
};
