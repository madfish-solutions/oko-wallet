import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';

import { TextStyleProps } from '../../interfaces/style.interface';

import { styles } from './text.styles';

interface Props extends TextProps {
  style?: TextStyleProps;
}

export const MainText: FC<Props> = ({ children, style, ...restProps }) => (
  <Text style={[styles.color, style]} {...restProps}>
    {children}
  </Text>
);
