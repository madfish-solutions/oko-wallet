import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';

import { Checkbox } from '../../../../components/checkbox/checkbox';
import { Column } from '../../../../components/column/column';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { TextInput } from '../../../../components/text-input/text-input';
import { Text } from '../../../../components/text/text';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useShelter } from '../../../../hooks/use-shelter.hook';
import { Container } from '../../components/container/container';

import { styles } from './almost-done.styles';
import { passwordValidationInitialState } from './constants/password-validation-messages';
import {
  lettersNumbersMixtureRegx,
  specialCharacterRegx,
  uppercaseLowercaseMixtureRegx
} from './constants/regex-validation';
import { useValidateForm } from './hooks/use-validate-form.hook';
import { CreateAccountType } from './types';

const defaultValues = {
  name: 'Account 1',
  password: '',
  confirmPassword: ''
};

export const AlmostDone: FC = () => {
  const {
    params: { mnemonic }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.AlmostDone>>();

  const { importWallet } = useShelter();

  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);
  const [isUseFaceId, setIsUseFaceId] = useState(false);
  const [isAcceptTerms, setIsAcceptTerms] = useState(true);
  const [isAllowUseAnalytics, setIsAllowUseAnalytics] = useState(true);
  const [passwordValidationMessages, setPasswordValidationMessages] = useState(passwordValidationInitialState);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields }
  } = useForm<CreateAccountType>({
    mode: 'onChange',
    defaultValues
  });

  const password = watch('password');

  const passwordIsNoValid = useMemo(
    () =>
      (passwordValidationMessages.some(({ valid, optional }) => !valid && !isDefined(optional)) &&
        dirtyFields.password) ??
      false,
    [passwordValidationMessages, dirtyFields.password]
  );

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

  const { commonRules, nameRules, confirmPasswordRules } = useValidateForm(password);

  const handleCreateAccount = ({ name, password }: CreateAccountType) => {
    if (!passwordIsNoValid && isAcceptTerms) {
      importWallet({
        seedPhrase: mnemonic,
        password: password.trim(),
        hdAccountsLength: 1,
        accountName: name.trim()
      });
      console.log('Submitted:', {
        useFaceId: isUseFaceId,
        acceptTerms: isAcceptTerms,
        analytics: isAllowUseAnalytics
      });
    }
  };

  const handleTogglePasswordVisibility = () => setIsSecurePassword(prev => !prev);
  const handleToggleConfirmPasswordVisibility = () => setIsSecureConfirmPassword(prev => !prev);

  return (
    <Container title="Almost Done" step={3} submitTitle="Create" onSubmitPress={handleSubmit(handleCreateAccount)}>
      <Controller
        control={control}
        name="name"
        rules={nameRules}
        render={({ field }) => (
          <TextInput
            field={field}
            label="Account Name"
            placeholder="Account 1"
            prompt="Name of main account (4-18 characters)"
            error={errors.name?.message}
            containerStyle={styles.controllerOffset}
          />
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
                placeholder="Password"
                prompt="Password is used to protect the wallet"
                containerStyle={styles.input}
                clearIconStyles={styles.clearIcon}
                inputContainerStyle={
                  ((isDefined(passwordIsNoValid) && passwordIsNoValid) || isDefined(errors.password?.message)) &&
                  styles.errorInput
                }
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
        rules={confirmPasswordRules}
        render={({ field }) => (
          <Row style={[styles.inputContainer, styles.controllerOffset]}>
            <TextInput
              field={field}
              label="Password Confirm"
              secureTextEntry={isSecureConfirmPassword}
              placeholder="Password"
              prompt="Password is used to protect the wallet"
              error={errors.confirmPassword?.message}
              containerStyle={styles.input}
              clearIconStyles={styles.clearIcon}
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
      <Checkbox text="Use Face ID" selected={isUseFaceId} onSelect={setIsUseFaceId} style={styles.checkbox} />
      <Checkbox text="Accept terms" selected={isAcceptTerms} onSelect={setIsAcceptTerms} style={styles.checkbox}>
        <Column>
          <Text style={styles.text}>I have read and agree to</Text>
          <Row>
            <Text style={styles.text}>the</Text>
            <TouchableOpacity style={styles.link}>
              <Text style={styles.linkingText}>Terms of Usage</Text>
            </TouchableOpacity>
            <Text style={styles.text}>and</Text>
            <TouchableOpacity style={styles.link}>
              <Text style={styles.linkingText}>Privacy Policy</Text>
            </TouchableOpacity>
          </Row>
        </Column>
        {!isAcceptTerms && <Text style={styles.error}>You need to accept terms to create account</Text>}
      </Checkbox>
      <Checkbox text="Analytics" selected={isAllowUseAnalytics} onSelect={setIsAllowUseAnalytics}>
        <Column>
          <Text style={styles.text}>I have read and agree to</Text>
          <Row>
            <Text style={styles.text}>the</Text>
            <TouchableOpacity style={styles.link}>
              <Text style={styles.linkingText}>anonymous information collecting</Text>
            </TouchableOpacity>
          </Row>
        </Column>
      </Checkbox>
    </Container>
  );
};
