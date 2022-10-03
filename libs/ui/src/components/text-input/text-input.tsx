import { isDefined, isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import { BigNumber } from 'bignumber.js';
import React, { useState } from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import {
  GestureResponderEvent,
  Text,
  TextInput as TextInputBase,
  TextInputProps,
  View,
  KeyboardTypeOptions
} from 'react-native';

import { TextStyleProps, ViewStyleProps } from '../../interfaces/style.interface';
import { colors } from '../../styles/colors';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { TouchableIcon } from '../touchable-icon/touchable-icon';

import { Label } from './components/label/label';
import { Prompt } from './components/prompt/prompt';
import { styles } from './text-input.styles';
import { getValueWithMaxNumberOfDecimals } from './utils/get-value-with-max-number-of-decimals.util';

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends TextInputProps {
  field: ControllerRenderProps<TFieldValues, TName>;
  label?: string;
  error?: string;
  prompt?: string;
  required?: boolean;
  handlePrompt?: OnEventFn<GestureResponderEvent>;
  editable?: boolean;
  containerStyle?: ViewStyleProps;
  inputStyle?: TextStyleProps;
  clearIconStyles?: ViewStyleProps;
  inputContainerStyle?: ViewStyleProps;
  decimals?: number;
  keyboardType?: KeyboardTypeOptions;
}

export const TextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field: { onBlur: onBlurField, onChange, value, ref },
  label,
  error,
  prompt,
  handlePrompt,
  decimals,
  placeholder = '',
  placeholderTextColor = colors.border1,
  keyboardType,
  required = true,
  editable = true,
  multiline = false,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  inputContainerStyle,
  children,
  clearIconStyles
}: Props<TFieldValues, TName>) => {
  const [isFocused, setIsFocused] = useState(false);

  const isLabel = isDefined(label);
  const isError = isDefined(error);
  const isPrompt = isDefined(prompt);

  const onChangeText = (value: string) => {
    let correctedValue = value;

    if (keyboardType === 'numeric') {
      correctedValue = correctedValue
        .replace(/ /g, '')
        .replace(/,/g, '.')
        .replace(/[^\d.]+/g, '');
    }

    if (isDefined(decimals) && isNotEmptyString(correctedValue)) {
      correctedValue = getValueWithMaxNumberOfDecimals(correctedValue, decimals);
    }

    onChange(correctedValue);
  };

  const onBlur = () => {
    let correctedValue: string = value;

    if (keyboardType === 'numeric' && isNotEmptyString(correctedValue) && !isNaN(+correctedValue)) {
      correctedValue = new BigNumber(correctedValue).toString(10);
    }

    if (correctedValue !== value) {
      onChange(correctedValue);
    }

    setIsFocused(false);
    onBlurField();
  };

  const onFocus = () => setIsFocused(true);

  const handleInputClear = () => onChange?.('');

  return (
    <View style={containerStyle}>
      {isLabel && <Label title={label} isOptional={!required} />}
      {isPrompt && <Prompt title={prompt} handlePrompt={handlePrompt} />}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedContainer,
          isError && styles.errorContainer,
          inputContainerStyle
        ]}
      >
        <Row style={styles.innerContainer}>
          <TextInputBase
            ref={ref}
            placeholderTextColor={placeholderTextColor}
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChangeText}
            selectionColor={colors.orange}
            editable={editable}
            accessibilityElementsHidden
            autoCapitalize="none"
            autoCorrect={false}
            value={value}
            onFocus={onFocus}
            multiline={multiline}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
          {isNotEmptyString(value) && editable && (
            <TouchableIcon name={IconNameEnum.Clear} onPress={handleInputClear} style={clearIconStyles} />
          )}
        </Row>
        {children}
      </View>
      {isError && (
        <View style={styles.textErrorContainer}>
          <Text style={styles.textError}>{error}</Text>
        </View>
      )}
    </View>
  );
};
