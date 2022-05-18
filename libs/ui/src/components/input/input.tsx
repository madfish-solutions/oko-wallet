import React from 'react';
import { StyleProp, TextInput, TextStyle, TextInputProps, View, Text } from 'react-native';

import { InputStyles } from './input.styles';

type InputProps = {
  title?: string;
  style?: StyleProp<TextStyle>;
} & TextInputProps;

export const Input: React.FC<InputProps> = ({ title, style, ...props }) => (
  <View style={InputStyles.root}>
    <Text style={InputStyles.title}>{title}</Text>
    <TextInput style={[InputStyles.input, style]} placeholder={props.placeholder ?? '...'} {...props} />
  </View>
);
