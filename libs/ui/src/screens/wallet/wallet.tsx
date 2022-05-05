import React, { FC } from 'react';
import { View, Text } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

export const Wallet: FC = () => (
  <View>
    <NavigationBar />
    <Text>Wallet</Text>
  </View>
);
