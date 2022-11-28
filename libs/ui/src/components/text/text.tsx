import React, { FC } from 'react';
import { Text as TextBase, TextProps } from 'react-native';
import { TestIDProps } from 'src/interfaces/test-id.props';

import { TextStyleProps } from '../../interfaces/style.interface';

import { styles } from './text.styles';

interface Props extends TextProps, TestIDProps {
  style?: TextStyleProps;
}

export const Text: FC<Props> = ({ children, style, testID, ...restProps }) => (
  <TextBase allowFontScaling={false} style={[styles.color, style]} testID={testID} {...restProps}>
    {children}
  </TextBase>
);
