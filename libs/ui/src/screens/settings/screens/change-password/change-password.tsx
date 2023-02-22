import { isDefined } from '@rnw-community/shared';
import React, { FC, useMemo, useState, useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { Button } from '../../../../components/button/button';
import { ButtonThemesEnum } from '../../../../components/button/enums';
import { Column } from '../../../../components/column/column';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { Text } from '../../../../components/text/text';
import { PasswordInput } from '../../../../components/text-input/components/password-input/password-input';
import { useChangePassword } from '../../../../hooks/use-change-password-hook';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useScrollToOffset } from '../../../../hooks/use-scroll-to-element.hook';
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
  const [passwordMatchError, setPasswordMatchError] = useState<string>();
  const { showSuccessToast, showErrorToast } = useToast();
  const { scrollViewRef, scrollToOffset } = useScrollToOffset();

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    setFocus,
    formState: { errors, dirtyFields, isDirty, isSubmitted }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    shouldFocusError: false
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
      showErrorToast({ message: 'Old password cannot match the new one' });

      setFocus('password');
    } else {
      showSuccessToast({ message: 'Password was successfully changed' });
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

  useEffect(() => {
    if ('confirmPassword' in errors && Object.keys(errors).length === 1) {
      scrollToOffset();
    }
  }, [Object.keys(errors).length]);

  const handleChangePassword = (formValue: FormTypes) => {
    if (!passwordIsNoValid) {
      changePassword(formValue.password, formValue.oldPassword);
    }
  };

  const isValidationError = (Object.keys(errors).length > 0 || Boolean(passwordMatchError)) && isSubmitted;

  const onFocusOldPassword = () => setPasswordMatchError(undefined);

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Change Password" onBackButtonPress={goBack} />
      </HeaderContainer>
      <ScrollView ref={scrollViewRef} style={styles.root}>
        <Column style={styles.oldPasswordContainer}>
          <Controller
            control={control}
            name="oldPassword"
            rules={commonRules}
            render={({ field }) => (
              <PasswordInput
                field={field}
                label="Type current password"
                prompt="Current Password is used to protect the wallet"
                error={errors.oldPassword?.message ?? passwordMatchError}
                onFocus={onFocusOldPassword}
              />
            )}
          />
        </Column>

        <Controller
          control={control}
          name="password"
          rules={commonRules}
          render={({ field }) => (
            <PasswordInput
              field={field}
              label="Set new password"
              prompt="Password is used to protect the wallet"
              inputContainerStyle={
                ((isDefined(passwordIsNoValid) && passwordIsNoValid) || isDefined(errors.password?.message)) &&
                styles.errorInput
              }
            />
          )}
        />
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

        <Column style={styles.controllerOffset}>
          <Controller
            control={control}
            name="confirmPassword"
            rules={changePasswordRules}
            render={({ field }) => (
              <PasswordInput
                field={field}
                label="New Password Confirm"
                prompt="Repeat password"
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </Column>
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
