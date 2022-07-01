import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';

import { styles } from './icon-with-border.styles';

const themeClasses = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary
};

export type IconContainerType = keyof typeof themeClasses;

interface Props {
  type?: IconContainerType;
  style?: ViewStyle;
}

export const IconWithBorder: FC<Props> = ({ type = 'primary', style, children }) => (
  <View style={[styles.root, themeClasses[type], style]}>{children}</View>
);
