import React, { FC } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';

import { getCustomSize } from '../../styles/format-size';

interface Props {
  size?: number;
  style?: StyleProp<TextStyle>;
}

export const Divider: FC<Props> = ({ size = getCustomSize(0.25), style }) => (
  <View style={[{ width: size, height: size }, style]} />
);
