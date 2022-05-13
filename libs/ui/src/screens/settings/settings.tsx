import React, { FC } from 'react';
import { View, Text, Pressable } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { ScreensEnum } from '../../enums/sreens.enum';

import { SettingProps } from './types';

export const Settings: FC<SettingProps> = ({ navigation: { navigate } }) => {
  const navigateToAddNewToken = () => navigate(ScreensEnum.AddNewToken);
  const navigateToManageTokens = () => navigate(ScreensEnum.ManageTokens);

  return (
    <View>
      <NavigationBar />
      <Text>Settings</Text>
      <Pressable onPress={navigateToAddNewToken}>
        <Text>Add new token</Text>
      </Pressable>
      <Pressable onPress={navigateToManageTokens}>
        <Text>Manage Tokens</Text>
      </Pressable>
    </View>
  );
};
