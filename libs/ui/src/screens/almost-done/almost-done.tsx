import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import React, { FC, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { Checkbox } from '../../components/checkbox/checkbox';
import { Column } from '../../components/column/column';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Row } from '../../components/row/row';
import { TextInput } from '../../components/text-input/text-input';
import { Text } from '../../components/text/text';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { WalletCreationContainer } from '../../components/wallet-creation-container/wallet-creation-container';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useShelter } from '../../hooks/use-shelter.hook';
import { usePasswordValidation } from '../../hooks/use-validation-messages.hook';
import { setIsAnalyticsEnabled, setIsBiometricEnabled } from '../../store/settings/settings.actions';
import { isMobile } from '../../utils/platform.utils';

import { styles } from './almost-done.styles';
import { AlmostDoneTestIDs } from './almost-done.test-ids';
import { useValidateForm } from './hooks/use-validate-form.hook';
import { CreateAccountType } from './types';

const defaultValues = {
  name: 'Account 1',
  password: '',
  confirmPassword: ''
};

export const AlmostDone: FC = () => {
  const {
    params: { mnemonic, currentStep, stepsAmount }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.AlmostDone>>();

  const { importWallet } = useShelter();
  const dispatch = useDispatch();

  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);
  const [isUseFaceId, setIsUseFaceId] = useState(false);
  const [isAcceptTerms, setIsAcceptTerms] = useState(false);
  const [isAllowUseAnalytics, setIsAllowUseAnalytics] = useState(true);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isSubmitted }
  } = useForm<CreateAccountType>({
    mode: 'onChange',
    defaultValues
  });

  const password = watch('password');

  const { passwordValidationMessages } = usePasswordValidation(password, dirtyFields);

  const passwordIsNoValid = useMemo(
    () =>
      (passwordValidationMessages.some(({ valid, optional }) => !valid && !isDefined(optional)) &&
        dirtyFields.password) ??
      false,
    [passwordValidationMessages, dirtyFields.password]
  );

  const { commonRules, nameRules, confirmPasswordRules } = useValidateForm(password);

  const handleCreateAccount = ({ name, password }: CreateAccountType) => {
    if (!passwordIsNoValid && isAcceptTerms) {
      importWallet({
        seedPhrase: mnemonic,
        password: password.trim(),
        hdAccountsLength: 1,
        accountName: name.trim()
      });

      dispatch(setIsAnalyticsEnabled(isAllowUseAnalytics));
      dispatch(setIsBiometricEnabled(isUseFaceId));
    }
  };

  const handleTogglePasswordVisibility = () => setIsSecurePassword(prev => !prev);
  const handleToggleConfirmPasswordVisibility = () => setIsSecureConfirmPassword(prev => !prev);

  const isValidationError = (Object.keys(errors).length > 0 || !isAcceptTerms) && isSubmitted;

  return (
    <WalletCreationContainer
      title="Almost Done"
      currentStep={currentStep}
      stepsAmount={stepsAmount}
      submitTitle="Create"
      isSubmitDisabled={isValidationError}
      onSubmitPress={handleSubmit(handleCreateAccount)}
      submitButtonTestID={AlmostDoneTestIDs.CreateButton}
    >
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
                testID={AlmostDoneTestIDs.PasswordInput}
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
              testID={AlmostDoneTestIDs.PasswordConfirmInput}
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
      {isMobile && (
        <Checkbox text="Use Face ID" selected={isUseFaceId} onSelect={setIsUseFaceId} style={styles.checkbox} />
      )}
      <Checkbox
        text="Accept terms"
        selected={isAcceptTerms}
        onSelect={setIsAcceptTerms}
        style={styles.checkbox}
        testID={AlmostDoneTestIDs.AcceptTermsCheckbox}
      >
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
        {!isAcceptTerms && isSubmitted && <Text style={styles.error}>You need to accept terms to create account</Text>}
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
    </WalletCreationContainer>
  );
};
