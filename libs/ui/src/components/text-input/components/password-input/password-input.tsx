import React, { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { FieldPath } from 'react-hook-form/dist/types';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { TextInputProps } from 'react-native';

import { OVERLAY_SHOW_TIMEOUT } from '../../../../constants/defaults';
import { useActiveTimer } from '../../../../hooks/use-active-timer.hook';
import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Row } from '../../../row/row';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';
import { TextInput } from '../../text-input';

import { styles } from './password-input.styles';

interface Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>
  extends Pick<TextInputProps, 'onChange' | 'onKeyPress' | 'onFocus' | 'onSubmitEditing' | 'testID'> {
  label: string;
  prompt: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  error?: string;
  inputContainerStyle?: ViewStyleProps;
  style?: ViewStyleProps;
}

export const PasswordInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field,
  label,
  prompt,
  error,
  onChange,
  onKeyPress,
  onFocus,
  onSubmitEditing,
  style,
  inputContainerStyle,
  testID
}: Props<TFieldValues, TName>) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const { activeTimer, clearActiveTimer } = useActiveTimer();

  const handleSecureTextEntry = () => {
    if (isSecureTextEntry) {
      clearActiveTimer();

      activeTimer.current = setTimeout(() => setIsSecureTextEntry(true), OVERLAY_SHOW_TIMEOUT);
    }

    setIsSecureTextEntry(previousIsSecureTextEntry => !previousIsSecureTextEntry);
  };

  return (
    <Row style={[styles.root, style]}>
      <TextInput
        field={field}
        label={label}
        prompt={prompt}
        placeholder="Password"
        secureTextEntry={isSecureTextEntry}
        error={error}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        onSubmitEditing={onSubmitEditing}
        containerStyle={styles.container}
        inputStyle={styles.input}
        clearIconStyles={styles.clearIcon}
        labelContainerStyle={styles.label}
        inputContainerStyle={inputContainerStyle}
        testID={testID}
      />

      <TouchableIcon
        name={isSecureTextEntry ? IconNameEnum.EyeOpen : IconNameEnum.EyeClosed}
        onPress={handleSecureTextEntry}
        iconStyle={styles.eyeIcon}
      />
    </Row>
  );
};
