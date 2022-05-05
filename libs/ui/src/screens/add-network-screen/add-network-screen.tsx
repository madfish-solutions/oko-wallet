import React from 'react';
import { View } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Title } from '../../components/title';

export const AddNetworkScreen = () => {
  return (
    <View>
      <NavigationBar />
      <Title>Add network</Title>
    </View>
  );
};
