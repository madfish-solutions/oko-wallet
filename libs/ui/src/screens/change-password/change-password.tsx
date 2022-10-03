import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

import { Button } from '../../components/button/button';
import { ButtonThemesEnum } from '../../components/button/enums';
import { Column } from '../../components/column/column';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Row } from '../../components/row/row';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { TextInput } from '../../components/text-input/text-input';
import { Text } from '../../components/text/text';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useToast } from '../../hooks/use-toast.hook';
import { useUnlock } from '../../hooks/use-unlock.hook';
import { passwordValidationInitialState } from '../create-wallet/screens/almost-done/constants/password-validation-messages';
import {
  lettersNumbersMixtureRegx,
  specialCharacterRegx,
  uppercaseLowercaseMixtureRegx
} from '../create-wallet/screens/almost-done/constants/regex-validation';
import { useValidateForm } from '../create-wallet/screens/almost-done/hooks/use-validate-form.hook';

import { styles } from './change-password.styles';

interface ChangePasswordType {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export const ChangePassword: FC = () => {
  const { goBack } = useNavigation();
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isSecureOldPassword, setIsSecureOldPassword] = useState(true);
  const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);
  const [passwordValidationMessages, setPasswordValidationMessages] = useState(passwordValidationInitialState);
  const [passwordMatchError, setPasswordMatchError] = useState<string>();
  const { isPasswordMatch, changePassword } = useUnlock();
  const { showSuccessToast } = useToast();

  const handleTogglePasswordVisibility = () => setIsSecurePassword(prev => !prev);
  const handleToggleOldPasswordVisibility = () => setIsSecureOldPassword(prev => !prev);
  const handleToggleConfirmPasswordVisibility = () => setIsSecureConfirmPassword(prev => !prev);
  const defaultValues = {
    name: 'Account 1',
    password: '',
    confirmPassword: '',
    oldPassword: ''
  };
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isDirty, isSubmitted, submitCount }
  } = useForm<ChangePasswordType>({
    mode: 'onChange',
    defaultValues
  });

  const passwordIsNoValid = useMemo(
    () =>
      (passwordValidationMessages.some(({ valid, optional }) => !valid && !isDefined(optional)) &&
        dirtyFields.password) ??
      false,
    [passwordValidationMessages, dirtyFields.password]
  );

  const password = watch('password');
  //const oldPassword = watch('oldPassword');

  const updateValidationMessageState = useCallback(
    (id: number, valid: boolean) =>
      setPasswordValidationMessages(prev =>
        prev.map(item => {
          if (item.id === id) {
            return {
              ...item,
              valid
            };
          }

          return item;
        })
      ),
    []
  );

  useEffect(() => {
    if (!isNotEmptyString(password)) {
      setPasswordValidationMessages(passwordValidationInitialState);
    }

    if (isDefined(dirtyFields.password)) {
      // check password length
      if (password.trim().length < 8 || password.trim().length > 30) {
        updateValidationMessageState(1, false);
      } else if (isNotEmptyString(password)) {
        updateValidationMessageState(1, true);
      }

      // check mix uppercase and lowercase letters
      if (!uppercaseLowercaseMixtureRegx.test(password)) {
        updateValidationMessageState(2, false);
      } else {
        updateValidationMessageState(2, true);
      }

      // check mix of letters and numbers
      if (!lettersNumbersMixtureRegx.test(password)) {
        updateValidationMessageState(3, false);
      } else if (isNotEmptyString(password)) {
        updateValidationMessageState(3, true);
      }

      // check special character
      if (!specialCharacterRegx.test(password)) {
        updateValidationMessageState(4, false);
      } else if (isNotEmptyString(password)) {
        updateValidationMessageState(4, true);
      }
    }
  }, [dirtyFields.password, password, updateValidationMessageState]);

  const { commonRules, changePasswordRules } = useValidateForm(password);

  const handleChangePassword = ({ password, oldPassword }: ChangePasswordType) => {
    changePassword(password, oldPassword);
  };

  useEffect(() => {
    if (!isPasswordMatch && isDirty) {
      setPasswordMatchError('wrong password');
    } else {
      setPasswordMatchError(undefined);
      if (isPasswordMatch) {
        showSuccessToast('Password was successfully changed');
        goBack();
      }
    }
  }, [isPasswordMatch, submitCount]);

  const isValidationError = (Object.keys(errors).length > 0 || Boolean(passwordMatchError)) && isSubmitted;

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Change Password" onBackButtonPress={goBack} />
      </HeaderContainer>
      <ScrollView style={styles.root}>
        <Controller
          control={control}
          name="oldPassword"
          render={({ field }) => (
            <Column style={styles.oldPasswordContainer}>
              <Row style={styles.inputContainer}>
                <TextInput
                  field={field}
                  label="Password"
                  secureTextEntry={isSecureOldPassword}
                  placeholder="123456"
                  prompt="Type your password"
                  containerStyle={styles.input}
                  clearIconStyles={styles.clearIcon}
                  error={passwordMatchError}
                  onFocus={() => setPasswordMatchError(undefined)}
                  labelStyle={styles.label}
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
              <Row style={styles.inputContainer}>
                <TextInput
                  field={field}
                  label="Password"
                  secureTextEntry={isSecurePassword}
                  placeholder="PasswordIs12345"
                  prompt="Set new password"
                  containerStyle={styles.input}
                  error={errors.oldPassword?.message}
                  clearIconStyles={styles.clearIcon}
                  inputContainerStyle={
                    ((isDefined(passwordIsNoValid) && passwordIsNoValid) || isDefined(errors.password?.message)) &&
                    styles.errorInput
                  }
                  labelStyle={styles.label}
                />
                {isSecurePassword ? (
                  <TouchableIcon
                    name={IconNameEnum.EyeOpen}
                    onPress={handleTogglePasswordVisibility}
                    iconStyle={styles.eyeIcon}
                  />
                ) : (
                  <TouchableIcon
                    name={IconNameEnum.EyeClosed}
                    onPress={handleTogglePasswordVisibility}
                    iconStyle={styles.eyeIcon}
                  />
                )}
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
            <Row style={[styles.inputContainer, styles.controllerOffset]}>
              <TextInput
                field={field}
                label="New Password Confirm"
                secureTextEntry={isSecureConfirmPassword}
                placeholder="••••••••••"
                prompt="Repeat password"
                error={errors.confirmPassword?.message}
                containerStyle={styles.input}
                clearIconStyles={styles.clearIcon}
                labelStyle={styles.label}
              />
              {isSecureConfirmPassword ? (
                <TouchableIcon
                  name={IconNameEnum.EyeOpen}
                  onPress={handleToggleConfirmPasswordVisibility}
                  iconStyle={styles.eyeIcon}
                />
              ) : (
                <TouchableIcon
                  name={IconNameEnum.EyeClosed}
                  onPress={handleToggleConfirmPasswordVisibility}
                  iconStyle={styles.eyeIcon}
                />
              )}
            </Row>
          )}
        />
      </ScrollView>
      <Button
        title="SAVE"
        theme={ButtonThemesEnum.Secondary}
        onPress={handleSubmit(handleChangePassword)}
        disabled={isValidationError}
        style={styles.sendButton}
      />
    </ScreenContainer>
  );
};
