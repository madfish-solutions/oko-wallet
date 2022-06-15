import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';

import { Icon, IconProps } from '../icon/icon';

import { styles } from './icon-container.styles';

const themeClasses = {
  primary: styles.primary,
  secondary: styles.secondary
};

export type IconContainerType = keyof typeof themeClasses;

interface Props extends IconProps {
  type?: IconContainerType;
  style?: ViewStyle;
}

export const IconContainer: FC<Props> = ({ type = 'primary', style, ...iconProps }) => (
  <View style={[styles.root, themeClasses[type], style]}>
    <Icon {...iconProps} />
  </View>
);
