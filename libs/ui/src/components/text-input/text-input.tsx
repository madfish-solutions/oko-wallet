import { isDefined, isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import { BigNumber } from 'bignumber.js';
import React, { useState } from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import {
  GestureResponderEvent,
  TextInput as TextInputBase,
  TextInputProps,
  View,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputChangeEventData
} from 'react-native';

import { TextStyleProps, ViewStyleProps } from '../../interfaces/style.interface';
import { colors } from '../../styles/colors';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { TouchableIcon } from '../touchable-icon/touchable-icon';

import { ErrorField } from './components/error-field/error-field';
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
  showClearIcon?: boolean;
  containerStyle?: ViewStyleProps;
  inputStyle?: TextStyleProps;
  clearIconStyles?: ViewStyleProps;
  inputContainerStyle?: ViewStyleProps;
  decimals?: number;
  keyboardType?: KeyboardTypeOptions;
  labelContainerStyle?: ViewStyleProps;
  labelTextStyle?: TextStyleProps;
  inputInnerContainerStyle?: TextStyleProps;
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
  showClearIcon = true,
  containerStyle,
  inputStyle,
  inputContainerStyle,
  children,
  clearIconStyles,
  onFocus: onFocusProps,
  onChange: onChangeProps,
  onKeyPress,
  onSubmitEditing,
  labelContainerStyle,
  labelTextStyle,
  inputInnerContainerStyle,
  testID
}: Props<TFieldValues, TName>) => {
  const [isFocused, setIsFocused] = useState(false);

  const isLabel = isDefined(label);
  const isError = isNotEmptyString(error);
  const isPrompt = isDefined(prompt);
  const isNumberKeyboardType = keyboardType === 'numeric' || keyboardType === 'number-pad';

  const onChangeText = (newValue: string) => {
    let correctedValue = newValue;

    if (isNumberKeyboardType) {
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

  const onChangeNative = (e: NativeSyntheticEvent<TextInputChangeEventData>) => onChangeProps?.(e);

  const onBlur = () => {
    let correctedValue: string = value;

    if (isNumberKeyboardType && isNotEmptyString(correctedValue) && !isNaN(+correctedValue)) {
      correctedValue = new BigNumber(correctedValue).toString(10);
    }

    if (correctedValue !== value) {
      onChange(correctedValue);
    }

    setIsFocused(false);
    onBlurField();
  };

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocusProps?.(e);
  };

  const handleInputClear = () => onChange?.('');

  return (
    <View style={containerStyle}>
      {isLabel && (
        <Label title={label ?? ''} isOptional={!required} style={labelContainerStyle} textStyle={labelTextStyle} />
      )}
      {isPrompt && <Prompt title={prompt ?? ''} handlePrompt={handlePrompt} />}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedContainer,
          isError && styles.errorContainer,
          inputContainerStyle
        ]}
      >
        <Row style={[styles.innerContainer, inputInnerContainerStyle]}>
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
            allowFontScaling={false}
            onChange={onChangeNative}
            onSubmitEditing={onSubmitEditing}
            onKeyPress={onKeyPress}
            selectTextOnFocus={!editable}
            testID={testID}
          />
          {isNotEmptyString(value) && editable && showClearIcon && (
            <TouchableIcon name={IconNameEnum.Clear} onPress={handleInputClear} style={clearIconStyles} />
          )}
        </Row>
        {children}
      </View>
      {isError && <ErrorField name={error} />}
    </View>
  );
};
