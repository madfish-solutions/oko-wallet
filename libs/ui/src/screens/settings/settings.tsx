import React, { FC } from 'react';
import { Button, Text, View } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { ScreensEnum } from '../../enums/sreens.enum';

import { SettingProps } from './types';

export const Settings: FC<SettingProps> = ({ navigation: { navigate } }) => {
  const navigateToAddNewToken = () => navigate(ScreensEnum.AddNewToken);
  const navigateToManageTokens = () => navigate(ScreensEnum.ManageTokens);
  const navigateToAddNetwork = () => navigate(ScreensEnum.AddNetwork);

  return (
    <View>
      <NavigationBar />
      <Text>Settings</Text>
      <Button title="Add network" onPress={navigateToAddNetwork} />
      <Button title="Add new token" onPress={navigateToAddNewToken} />
      <Button title="Manage Tokens" onPress={navigateToManageTokens} />
    </View>
  );
};
