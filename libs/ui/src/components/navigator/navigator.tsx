import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { AddNetworkScreen } from '../../screens/add-network-screen/add-network-screen';
import { SettingsScreen } from '../../screens/settings-screen/settings-screen';
import { WalletScreen } from '../../screens/wallet-screen/wallet-screen';

const Stack = createNativeStackNavigator<ScreensParamList>();

export const Navigator: FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={ScreensEnum.Wallet} component={WalletScreen} />
      <Stack.Screen name={ScreensEnum.Settings} component={SettingsScreen} />
      <Stack.Screen name={ScreensEnum.AddNetwork} component={AddNetworkScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
