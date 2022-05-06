import React, { FC } from 'react';
import { View } from 'react-native';

import { Button } from '../../components/button';
import { ShelterScreen } from '../shelter-screen/shelter-screen';

import { ImportAccountProps } from './types';

export const ImportAccount: FC<ImportAccountProps> = ({ handleAuthorisation }) => (
  <View>
    <Button theme="primary" onPress={handleAuthorisation} textStyle={{ color: '#fff' }}>
      Get Authorisation
    </Button>
    <ShelterScreen />
  </View>
);
