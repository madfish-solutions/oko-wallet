import React, { FC } from 'react';
import { View } from 'react-native';

import { ConnectToDappsClass } from '../../components/connect-to-dapps/connect-to-dapps';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

export const ConnectToDapps: FC = () => (
  <View>
    <NavigationBar />
    <ConnectToDappsClass />
  </View>
);
