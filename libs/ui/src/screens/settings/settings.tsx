import React from 'react';
import { Button, Text, View } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';

export const Settings = () => {
  const { navigate } = useNavigation();

  const handlePress = () => navigate(ScreensEnum.AddNetwork);

  return (
    <View>
      <NavigationBar />
      <Text>Settings</Text>
      <Button title="Add network" onPress={handlePress} />
    </View>
  );
};
