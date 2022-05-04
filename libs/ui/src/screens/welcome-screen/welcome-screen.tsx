import React from 'react';
import { Text, View } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

export const WelcomeScreen = () => {
  return (
    <View>
      <NavigationBar />
      <Text>Welcome screen</Text>
    </View>
  );
};
