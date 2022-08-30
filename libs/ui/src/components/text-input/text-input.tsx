import { isDefined, isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import { BigNumber } from 'bignumber.js';
import React from 'react';
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
import { validators } from './constants/validators';
import { TextInputTypesEnum } from './enums';
import { styles } from './text-input.styles';
import { getValueWithMaxSymbolsAfterDot } from './utils/get-value-with-max-symbols-after-dot.util';

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
  type?: TextInputTypesEnum;
  maxSymbolsAfterDot?: number;
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
  type,
  maxSymbolsAfterDot,
  placeholder = '',
  placeholderTextColor = colors.border1,
  keyboardType,
  required = true,
  editable = true,
  multiline = false,
  containerStyle,
  inputStyle,
  inputContainerStyle,
  children,
  clearIconStyles
}: Props<TFieldValues, TName>) => {
  const isLabel = isDefined(label);
  const isError = isDefined(error);
  const isPrompt = isDefined(prompt);

  const onChangeText = (value: string) => {
    let correctedValue = value;

    if (isDefined(type) && correctedValue) {
      correctedValue = correctedValue.replace(validators[type], '');
    }

    onChange(correctedValue);
  };

  const onBlur = () => {
    let correctedValue: string = value;

    if (isDefined(maxSymbolsAfterDot) && isNotEmptyString(value)) {
      correctedValue = getValueWithMaxSymbolsAfterDot(value, maxSymbolsAfterDot);
    }

    if (type === TextInputTypesEnum.Float && isNotEmptyString(correctedValue) && !isNaN(+correctedValue)) {
      correctedValue = new BigNumber(correctedValue).toString();
    }

    if (correctedValue !== value) {
      onChange(correctedValue);
    }

    onBlurField();
  };

  const handleInputClear = () => {
    onChange?.('');
  };

  return (
    <View style={containerStyle}>
      {isLabel && <Label title={label} isOptional={!required} />}
      {isPrompt && <Prompt title={prompt} handlePrompt={handlePrompt} />}
      <View style={[styles.inputContainer, isError && styles.errorInput, inputContainerStyle]}>
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
            value={value}
            multiline={multiline}
            keyboardType={keyboardType}
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
