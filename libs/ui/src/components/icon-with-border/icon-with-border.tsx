import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';

import { IconWithBorderEnum } from './enums';
import { styles } from './icon-with-border.styles';

const themeClasses = {
  [IconWithBorderEnum.Primary]: styles.primary,
  [IconWithBorderEnum.Secondary]: styles.secondary,
  [IconWithBorderEnum.Ternary]: styles.ternary,
  [IconWithBorderEnum.Quaternary]: styles.quaternary,
  [IconWithBorderEnum.Quinary]: styles.quinary
};

interface Props {
  type?: IconWithBorderEnum;
  style?: ViewStyle;
}

export const IconWithBorder: FC<Props> = ({ type = IconWithBorderEnum.Primary, style, children }) => (
  <View style={[styles.root, themeClasses[type], style]}>{children}</View>
);
