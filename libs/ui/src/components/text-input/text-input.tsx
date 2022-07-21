import { isDefined, isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import React, { forwardRef } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { GestureResponderEvent, Text, TextInput as TextInputBase, TextInputProps, View } from 'react-native';
import { TextInput as TextInputRef } from 'react-native-gesture-handler';

import { TextStyleProps, ViewStyleProps } from '../../interfaces/style.interface';
import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { TouchableIcon } from '../touchable-icon/touchable-icon';

import { styles } from './text-input.styles';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  prompt?: string;
  name: string;
  clearField: UseFormSetValue<FieldValues>;
  handlePrompt?: OnEventFn<GestureResponderEvent, void>;
  containerStyle?: ViewStyleProps;
  inputStyle?: TextStyleProps;
}

export const TextInput = forwardRef<TextInputRef, Props>(
  (
    {
      onBlur,
      onChangeText,
      value,
      label,
      error,
      name,
      prompt,
      handlePrompt,
      clearField,
      placeholder = '',
      placeholderTextColor = colors.border1,
      containerStyle,
      inputStyle
    },
    ref
  ) => {
    const isLabel = isDefined(label);
    const isError = isDefined(error);
    const isPrompt = isDefined(prompt);

    const handleInputClear = () => {
      clearField(name, '');
    };

    return (
      <View style={containerStyle}>
        {isLabel && (
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
          </View>
        )}
        {isPrompt && (
          <Row style={styles.promptContainer}>
            <Text style={styles.promptText}>{prompt}</Text>
            <TouchableIcon name={IconNameEnum.Tooltip} onPress={handlePrompt} size={getCustomSize(2)} />
          </Row>
        )}
        <Row style={styles.inputContainer}>
          <TextInputBase
            ref={ref}
            placeholderTextColor={placeholderTextColor}
            style={[styles.input, isError && styles.errorInput, inputStyle]}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChangeText}
            selectionColor={colors.orange}
            value={value}
          />
          {isNotEmptyString(value) && (
            <TouchableIcon name={IconNameEnum.Clear} onPress={handleInputClear} style={styles.clearIcon} />
          )}
        </Row>
        <View style={styles.errorContainer}>{isError && <Text style={styles.textError}>{error}</Text>}</View>
      </View>
    );
  }
);
