import React, { FC } from 'react';
import { View, Text } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

export const Send: FC = () => (
  <View>
    <NavigationBar />
    <Text>Send</Text>
  </View>
);
