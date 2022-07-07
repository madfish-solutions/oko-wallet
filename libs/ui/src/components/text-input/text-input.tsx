import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Text, TextInput as TextInputBase, TextInputProps, View } from 'react-native';

import { TextStyleProps, ViewStyleProps } from '../../interfaces/style.interface';
import { colors } from '../../styles/colors';

import { styles } from './text-input.styles';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyleProps;
  inputStyle?: TextStyleProps;
}

export const TextInput: FC<Props> = ({
  onBlur,
  onChangeText,
  value,
  error,
  label,
  placeholder = '',
  placeholderTextColor = colors.border1,
  containerStyle,
  inputStyle
}) => {
  const isLabel = isDefined(label);
  const isError = isDefined(error);

  return (
    <View style={containerStyle}>
      {isLabel && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Account name</Text>
        </View>
      )}
      <TextInputBase
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, isError && styles.errorInput, inputStyle]}
        placeholder={placeholder}
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
      />
      {isError && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};
