import React, { forwardRef } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { ButtonStyles } from './button.styles';

type ButtonProps = {
  title: string;
  style?: StyleProp<TextStyle>
};

export const Button = forwardRef<any, any & ButtonProps>(({
  title,
  style,
  ...props
}, ref) => {
  return (
    <TouchableOpacity ref={ref} style={[ButtonStyles.root, style]} {...props} >
      <Text style={ButtonStyles.text}>{title}</Text>
    </TouchableOpacity>
  );
});
