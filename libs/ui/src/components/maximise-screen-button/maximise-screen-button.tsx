import React, { FC } from 'react';
import { Button } from 'react-native';

import { openMaximiseScreen } from '../../utils/open-maximise-screen.util';

export const MaximiseScreenButton: FC = () => (
  <Button title="Maximize screen" onPress={openMaximiseScreen} color="#ffa500" />
);
