import React, { FC } from 'react';
import { Button, View } from 'react-native';

import { ShelterScreen } from '../shelter-screen/shelter-screen';

import { ImportAccountProps } from './types';

export const ImportAccount: FC<ImportAccountProps> = ({ handleAuthorisation }) => (
  <View>
    <Button title="Get Authorisation" onPress={handleAuthorisation} />
    <ShelterScreen />
  </View>
);
