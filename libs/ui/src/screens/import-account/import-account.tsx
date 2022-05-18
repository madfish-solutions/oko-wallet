import React, { FC } from 'react';
import { Button, View } from 'react-native';

import { ShelterScreen } from '../shelter-screen/shelter-screen';

interface Props {
  handleAuthorisation: () => void;
}

export const ImportAccount: FC<Props> = ({ handleAuthorisation }) => (
  <View>
    <Button title="Get Authorisation" onPress={handleAuthorisation} />
    <ShelterScreen />
  </View>
);
