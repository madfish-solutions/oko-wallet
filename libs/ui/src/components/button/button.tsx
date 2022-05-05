import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity } from 'react-native';

import { BackStyles } from './button.styles';

type ButtonProps = {
  onPress: <T>(arg?: T) => void;
  style?: StyleProp<TextStyle>;
};

export const Button: React.FC<ButtonProps> = ({ onPress, style, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[BackStyles.root, style]}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};
