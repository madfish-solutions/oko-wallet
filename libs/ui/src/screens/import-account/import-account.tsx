import React, { FC } from 'react';
import { View, Text, Pressable } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar-test';

import { ImportAccountProps } from './types';

export const ImportAccount: FC<ImportAccountProps> = ({ handleAuthorisation }) => (
  <View>
    <NavigationBar />
    <Text>Import Account Screen</Text>
    <Pressable onPress={handleAuthorisation}>
      <Text>Get Authorisation</Text>
    </Pressable>
  </View>
);
