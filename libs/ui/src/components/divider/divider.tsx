import React, { FC } from 'react';
import { FlexStyle, StyleProp, TextStyle, View } from 'react-native';

import { getCustomSize } from '../../styles/format-size';

import { DividerStyles } from './divider.styles';

type Props = {
  height?: FlexStyle['height'];
  width?: FlexStyle['width'];
  style?: StyleProp<TextStyle>;
};

export const Divider: FC<Props> = ({ width = '100%', height = getCustomSize(0.25), style }) => (
  <View style={[DividerStyles.root, { width, height }, style]} />
);
