import { isNotEmptyString } from '@rnw-community/shared';
import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { TextStyleProps } from '../../interfaces/style.interface';
import { Text } from '../text/text';

import { InputStyles } from './input.styles';

type InputProps = {
  title?: string;
  style?: TextStyleProps;
} & TextInputProps;

export const Input: React.FC<InputProps> = ({ title, style, ...props }) => (
  <View style={InputStyles.root}>
    {isNotEmptyString(title) && <Text style={InputStyles.title}>{title}</Text>}
    <TextInput style={[InputStyles.input, style]} {...props} />
  </View>
);
