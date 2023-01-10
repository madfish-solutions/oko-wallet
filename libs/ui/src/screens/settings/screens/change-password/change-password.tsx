import { isDefined } from '@rnw-community/shared';
import React, { FC, useMemo, useState, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { Button } from '../../../../components/button/button';
import { ButtonThemesEnum } from '../../../../components/button/enums';
import { Column } from '../../../../components/column/column';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { TextInput } from '../../../../components/text-input/text-input';
import { Text } from '../../../../components/text/text';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { useChangePassword } from '../../../../hooks/use-change-password-hook';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useToast } from '../../../../hooks/use-toast.hook';
import { useValidatePasswordForm } from '../../../../hooks/use-validate-password-form.hook';
import { usePasswordValidation } from '../../../../hooks/use-validation-messages.hook';

import { styles } from './change-password.styles';

interface FormTypes {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const defaultValues = {
  password: '',
  confirmPassword: '',
  oldPassword: ''
};

export const ChangePassword: FC = () => {
  const { goBack } = useNavigation();
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isSecureOldPassword, setIsSecureOldPassword] = useState(true);
  const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);
  const [passwordMatchError, setPasswordMatchError] = useState<string>();
  const { showSuccessToast, showErrorToast } = useToast();

  const handleTogglePasswordVisibility = () => setIsSecurePassword(prev => !prev);
  const handleToggleOldPasswordVisibility = () => setIsSecureOldPassword(prev => !prev);
  const handleToggleConfirmPasswordVisibility = () => setIsSecureConfirmPassword(prev => !prev);

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    setFocus,
    formState: { errors, dirtyFields, isDirty, isSubmitted }
  } = useForm({
    mode: 'onChange',
    defaultValues
  });

  const oldPassword = watch('oldPassword');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const { passwordValidationMessages } = usePasswordValidation(password, dirtyFields);

  const passwordIsNoValid = useMemo(
    () =>
      (passwordValidationMessages.some(({ valid, optional }) => !valid && !isDefined(optional)) &&
        dirtyFields.password) ??
      false,
    [passwordValidationMessages, dirtyFields.password]
  );

  const onSuccessFullPasswordChange = useCallback(() => {
    if (password === oldPassword) {
      showErrorToast('Old password cannot match the new one');

      setFocus('password');
    } else {
      showSuccessToast('Password was successfully changed');
      goBack();
    }
  }, [password, oldPassword]);

  const onFailPasswordChange = useCallback(() => {
    if (isDirty && !passwordIsNoValid) {
      setPasswordMatchError('Wrong password');
    }
  }, [isDirty, passwordIsNoValid]);

  const changePassword = useChangePassword(onSuccessFullPasswordChange, onFailPasswordChange);

  const { commonRules, changePasswordRules } = useValidatePasswordForm({
    password,
    confirmPassword,
    trigger,
    confirmPasswordError: errors.confirmPassword?.message
  });

  const handleChangePassword = (formValue: FormTypes) => {
    if (!passwordIsNoValid) {
      changePassword(formValue.password, formValue.oldPassword);
    }
  };

  const isValidationError = (Object.keys(errors).length > 0 || Boolean(passwordMatchError)) && isSubmitted;

  const onFocusOldPassword = () => {
    setPasswordMatchError(undefined);
  };

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Change Password" onBackButtonPress={goBack} />
      </HeaderContainer>
      <ScrollView style={styles.root}>
        <Controller
          control={control}
          name="oldPassword"
          rules={commonRules}
          render={({ field }) => (
            <Column style={styles.oldPasswordContainer}>
              <Row style={styles.inputWrapper}>
                <TextInput
                  field={field}
                  label="Password"
                  secureTextEntry={isSecureOldPassword}
                  placeholder="123456"
                  prompt="Type your password"
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  clearIconStyles={styles.clearIcon}
                  error={errors.oldPassword?.message ?? passwordMatchError}
                  onFocus={onFocusOldPassword}
                  labelContainerStyle={styles.label}
                />
                {isSecureOldPassword ? (
                  <TouchableIcon
                    name={IconNameEnum.EyeOpen}
                    onPress={handleToggleOldPasswordVisibility}
                    iconStyle={styles.eyeIcon}
                  />
                ) : (
                  <TouchableIcon
                    name={IconNameEnum.EyeClosed}
                    onPress={handleToggleOldPasswordVisibility}
                    iconStyle={styles.eyeIcon}
                  />
                )}
              </Row>
            </Column>
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={commonRules}
          render={({ field }) => (
            <Column style={styles.passwordContainer}>
              <Row style={styles.inputWrapper}>
                <TextInput
                  field={field}
                  label="Password"
                  secureTextEntry={isSecurePassword}
                  placeholder="Password12345"
                  prompt="Set new password"
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  clearIconStyles={styles.clearIcon}
                  inputContainerStyle={
                    ((isDefined(passwordIsNoValid) && passwordIsNoValid) || isDefined(errors.password?.message)) &&
                    styles.errorInput
                  }
                  labelContainerStyle={styles.label}
                />

                <TouchableIcon
                  name={isSecurePassword ? IconNameEnum.EyeOpen : IconNameEnum.EyeClosed}
                  onPress={handleTogglePasswordVisibility}
                  iconStyle={styles.eyeIcon}
                />
              </Row>

              <Column style={styles.passwordValidationContainer}>
                {passwordValidationMessages.map(({ id, message, valid, optional }) => (
                  <Text
                    key={id}
                    style={[
                      styles.passwordValidationText,
                      (isDefined(dirtyFields.password) || isDefined(errors.password?.message)) &&
                        (valid ? styles.valid : !isDefined(optional) && styles.noValid)
                    ]}
                  >{`${valid ? '✓' : '✗'} ${message}`}</Text>
                ))}
              </Column>
            </Column>
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          rules={changePasswordRules}
          render={({ field }) => (
            <Row style={[styles.inputWrapper, styles.controllerOffset]}>
              <TextInput
                field={field}
                label="New Password Confirm"
                secureTextEntry={isSecureConfirmPassword}
                placeholder="••••••••••"
                prompt="Repeat password"
                error={errors.confirmPassword?.message}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                clearIconStyles={styles.clearIcon}
                labelContainerStyle={styles.label}
              />

              <TouchableIcon
                name={isSecureConfirmPassword ? IconNameEnum.EyeOpen : IconNameEnum.EyeClosed}
                onPress={handleToggleConfirmPasswordVisibility}
                iconStyle={styles.eyeIcon}
              />
            </Row>
          )}
        />
      </ScrollView>
      <View style={styles.saveButtonContainer}>
        <Button
          title="SAVE"
          theme={ButtonThemesEnum.Secondary}
          onPress={handleSubmit(handleChangePassword)}
          disabled={isValidationError}
        />
      </View>
    </ScreenContainer>
  );
};
