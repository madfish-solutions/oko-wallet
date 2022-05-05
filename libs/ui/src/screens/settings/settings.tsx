import React, { FC } from 'react';
import { View, Text } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

export const Settings: FC = () => (
  <View>
    <NavigationBar />
    <Text>Settings</Text>
  </View>
);
