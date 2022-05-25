import React, { FC } from 'react';
import { View } from 'react-native';

import { ConnectToDapps as ConnectToDappsComponent } from '../../components/connect-to-dapps/connect-to-dapps';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

export const ConnectToDapps: FC = () => (
  <View>
    <NavigationBar />
    <ConnectToDappsComponent />
  </View>
);
