import React, { forwardRef } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';

import { ButtonStyles } from './button.styles';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<TextStyle>;
};

// TODO: Remove any types
export const Button = forwardRef<any, any & ButtonProps>(({
  title,
  onPress,
  style,
  ...props
}, ref) => {
  return (
    <TouchableOpacity 
      ref={ref} 
      style={[ButtonStyles.root, style]} 
      onPress={onPress}
      {...props} 
    >
      <Text style={ButtonStyles.text}>{title}</Text>
    </TouchableOpacity>
  );
});
