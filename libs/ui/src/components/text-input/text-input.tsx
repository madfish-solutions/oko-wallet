import { isDefined, isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import React from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { GestureResponderEvent, Text, TextInput as TextInputBase, TextInputProps, View } from 'react-native';

import { TextStyleProps, ViewStyleProps } from '../../interfaces/style.interface';
import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { TouchableIcon } from '../touchable-icon/touchable-icon';

import { styles } from './text-input.styles';

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends TextInputProps {
  field: ControllerRenderProps<TFieldValues, TName>;
  label?: string;
  error?: string;
  prompt?: string;
  required?: boolean;
  handlePrompt?: OnEventFn<GestureResponderEvent, void>;
  editable?: boolean;
  containerStyle?: ViewStyleProps;
  inputStyle?: TextStyleProps;
  clearIconStyles?: ViewStyleProps;
}

export const TextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field: { onBlur, onChange, value, ref },
  label,
  error,
  prompt,
  required = true,
  handlePrompt,
  placeholder = '',
  placeholderTextColor = colors.border1,
  editable = true,
  containerStyle,
  inputStyle,
  clearIconStyles
}: Props<TFieldValues, TName>) => {
  const isLabel = isDefined(label);
  const isError = isDefined(error);
  const isPrompt = isDefined(prompt);

  const handleInputClear = () => {
    onChange?.('');
  };

  return (
    <View style={containerStyle}>
      {isLabel && (
        <Row style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {!required && <Text style={styles.optionalText}>Optional</Text>}
        </Row>
      )}
      {isPrompt && (
        <Row style={styles.promptContainer}>
          <Text style={styles.promptText}>{prompt}</Text>
          {handlePrompt && <TouchableIcon name={IconNameEnum.Tooltip} onPress={handlePrompt} size={getCustomSize(2)} />}
        </Row>
      )}
      <Row style={styles.inputContainer}>
        <TextInputBase
          ref={ref}
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, isError && styles.errorInput, inputStyle]}
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChange}
          selectionColor={colors.orange}
          editable={editable}
          accessibilityElementsHidden
          autoCapitalize="none"
          value={value}
        />
        {isNotEmptyString(value) && editable && (
          <TouchableIcon
            name={IconNameEnum.Clear}
            onPress={handleInputClear}
            style={[styles.clearIcon, clearIconStyles]}
          />
        )}
      </Row>
      <View style={styles.errorContainer}>{isError && <Text style={styles.textError}>{error}</Text>}</View>
    </View>
  );
};
