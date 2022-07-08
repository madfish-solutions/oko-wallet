import { isDefined } from '@rnw-community/shared';
import React, { forwardRef } from 'react';
import { Text, TextInput as TextInputBase, TextInputProps, View } from 'react-native';
import { TextInput as TextInputRef } from 'react-native-gesture-handler';

import { TextStyleProps, ViewStyleProps } from '../../interfaces/style.interface';
import { colors } from '../../styles/colors';

import { styles } from './text-input.styles';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyleProps;
  inputStyle?: TextStyleProps;
}

export const TextInput = forwardRef<TextInputRef, Props>(
  (
    {
      onBlur,
      onChangeText,
      value,
      error,
      label,
      placeholder = '',
      placeholderTextColor = colors.border1,
      containerStyle,
      inputStyle
    },
    ref
  ) => {
    const isLabel = isDefined(label);
    const isError = isDefined(error);

    return (
      <View style={[styles.root, containerStyle]}>
        {isLabel && (
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Account name</Text>
          </View>
        )}
        <TextInputBase
          ref={ref}
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
  }
);
