import React from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';

import { StylePropsType } from '../../interfaces/style.interface';

import { InputStyles } from './input.styles';

type InputProps = {
  title?: string;
  style?: StylePropsType;
} & TextInputProps;

export const Input: React.FC<InputProps> = ({ title, style, ...props }) => (
  <View style={InputStyles.root}>
    <Text style={InputStyles.title}>{title}</Text>
    <TextInput style={[InputStyles.input, style]} placeholder={props.placeholder ?? '...'} {...props} />
  </View>
);
