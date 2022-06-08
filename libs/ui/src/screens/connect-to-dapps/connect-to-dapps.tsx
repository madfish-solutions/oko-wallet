import React, { FC } from 'react';
import { View } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

import { ConnectToDapps as ConnectToDappsComponent } from './components/connect-to-dapps/connect-to-dapps';

export const ConnectToDapps: FC = () => (
  <View>
    <NavigationBar />
    <ConnectToDappsComponent />
  </View>
);
