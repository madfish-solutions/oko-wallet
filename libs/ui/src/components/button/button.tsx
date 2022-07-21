import React, { FC } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';

import { styles } from './button.styles';
import { sizeClasses, themeClasses } from './constants';

interface Props extends PressableProps {
  title: string;
  theme?: keyof typeof themeClasses;
  size?: keyof typeof sizeClasses;
  style?: ViewStyleProps;
  disabled?: boolean;
}

export const Button: FC<Props> = ({
  title,
  theme = 'primary',
  size = 'large',
  style,
  disabled = false,
  ...restProps
}) => (
  <Pressable
    {...restProps}
    disabled={disabled}
    style={[styles.root, themeClasses[theme].button, sizeClasses[size], disabled && styles.disabledButton, style]}
  >
    <View style={styles.wrapper}>
      <Text style={[styles.text, themeClasses[theme].text, disabled && styles.disabledText]}>{title}</Text>
    </View>
  </Pressable>
);
