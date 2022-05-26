import React, { FC } from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { ResetWallet } from '../../components/reset-wallet/reset-wallet';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { resetApplicationAction } from '../../store/root-state.actions';

export const Settings: FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const navigateToAddNewToken = () => navigate(ScreensEnum.AddNewToken);
  const navigateToManageTokens = () => navigate(ScreensEnum.ManageTokens);
  const navigateToAddNetwork = () => navigate(ScreensEnum.AddNetwork);
  const handleResetWallet = () => dispatch(resetApplicationAction.submit());

  return (
    <View>
      <NavigationBar />
      <Text>Settings</Text>
      <Button title="Add network" onPress={navigateToAddNetwork} />
      <Button title="Add new token" onPress={navigateToAddNewToken} />
      <Button title="Manage Tokens" onPress={navigateToManageTokens} />
      <ResetWallet handleResetWallet={handleResetWallet} />
    </View>
  );
};
