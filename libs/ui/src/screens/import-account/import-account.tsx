import React, { FC } from 'react';
import { View, Text, Pressable } from 'react-native';

import { ShelterScreen } from '../shelter-screen/shelter-screen';

import { ImportAccountProps } from './types';

export const ImportAccount: FC<ImportAccountProps> = ({ handleAuthorisation }) => (
  <View>
    <Pressable onPress={handleAuthorisation}>
      <Text>Get Authorisation</Text>
    </Pressable>
    <ShelterScreen />
  </View>
);
