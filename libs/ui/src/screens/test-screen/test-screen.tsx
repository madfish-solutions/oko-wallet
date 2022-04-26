import React from 'react';
import { View, Text } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

export const TestScreen = () => {
  return (
    <View>
      <NavigationBar />
      <Text>Test Screen Content</Text>
      <Text>Test Screen Content</Text>
      <Text>Test Screen Content</Text>
    </View>
  );
};
