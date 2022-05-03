import React from 'react';
import { Text, View } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

export const TestScreen = () => {
  return (
    <View>
      <NavigationBar />
      <Text>Test screen</Text>
    </View>
  );
};
