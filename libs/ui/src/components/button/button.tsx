import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity } from 'react-native';

import { BackStyles } from './button.styles';

const themes = {
  primary: 'primary',
  secondary: 'secondary',
  clear: 'clear'
};

type ButtonProps = {
  onPress: <T>(arg?: T) => void;
  theme?: keyof typeof themes;
  style?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const Button: React.FC<ButtonProps> = ({ onPress, theme = 'primary', style, textStyle, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[BackStyles.root, BackStyles[theme], style]}>
      <Text style={[textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};
