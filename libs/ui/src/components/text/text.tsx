import React, { FC } from 'react';
import { Text as TextBase, TextProps } from 'react-native';

import { TextStyleProps } from '../../interfaces/style.interface';

import { styles } from './text.styles';

interface Props extends TextProps {
  style?: TextStyleProps;
}

export const Text: FC<Props> = ({ children, style, ...restProps }) => (
  <TextBase allowFontScaling={false} style={[styles.color, style]} {...restProps}>
    {children}
  </TextBase>
);
