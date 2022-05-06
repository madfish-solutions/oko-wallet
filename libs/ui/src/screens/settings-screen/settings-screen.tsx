import React from 'react';
import { View } from 'react-native';

import { Button } from '../../components/button';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Title } from '../../components/title';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';

import { SettingsScreenStyles } from './settings-screen.styles';

export const SettingsScreen = () => {
  const { navigate } = useNavigation();

  const handleBack = () => navigate(ScreensEnum.AddNetwork);

  return (
    <View>
      <NavigationBar />
      <Title>Settings</Title>
      <Button theme="clear" onPress={handleBack} style={SettingsScreenStyles.button}>
        Add network
      </Button>
    </View>
  );
};
