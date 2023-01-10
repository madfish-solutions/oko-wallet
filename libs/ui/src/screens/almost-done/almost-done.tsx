import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
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
import { useValidatePasswordForm } from '../../hooks/use-validate-password-form.hook';
import { usePasswordValidation } from '../../hooks/use-validation-messages.hook';
import { useAccountFieldRules } from '../../modals/hooks/use-validate-account-field.hook';
import { setIsAnalyticsEnabled, setIsBiometricEnabled } from '../../store/settings/settings.actions';
import { isMobile } from '../../utils/platform.utils';
import { goToTermsOfUse, goToPrivatePolicy } from '../settings/screens/about-us/utils/go-to-oko-links.utils';

import { styles } from './almost-done.styles';
import { AlmostDoneTestIDs } from './almost-done.test-ids';

const defaultAccountName = 'Account 1';

interface FormTypes {
  name: string;
  password: string;
  confirmPassword: string;
}

const defaultValues: FormTypes = {
  name: defaultAccountName,
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
    trigger,
    formState: { errors, dirtyFields, isSubmitted }
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues
  });

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

  const { commonRules, confirmPasswordRules } = useValidatePasswordForm({
    password,
    confirmPassword,
    confirmPasswordError: errors.confirmPassword?.message,
    trigger
  });
  const { nameRules } = useAccountFieldRules();

  const handleCreateAccount = (formValue: FormTypes) => {
    const accountName = isNotEmptyString(formValue.name.trim()) ? formValue.name.trim() : defaultAccountName;

    if (!passwordIsNoValid && isAcceptTerms) {
      importWallet({
        seedPhrase: mnemonic,
        password: formValue.password,
        hdAccountsLength: 1,
        accountName
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
            placeholder={defaultAccountName}
            prompt="Name of main account (1-14 characters)"
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
            <Row style={styles.inputWrapper}>
              <TextInput
                field={field}
                label="Password"
                secureTextEntry={isSecurePassword}
                placeholder="Password"
                prompt="Password is used to protect the wallet"
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
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
          <Row style={[styles.inputWrapper, styles.controllerOffset]}>
            <TextInput
              field={field}
              label="Password Confirm"
              secureTextEntry={isSecureConfirmPassword}
              placeholder="Password"
              prompt="Password is used to protect the wallet"
              error={errors.confirmPassword?.message}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
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
              <Text onPress={goToTermsOfUse} style={styles.linkingText}>
                Terms of Use
              </Text>
            </TouchableOpacity>
            <Text style={styles.text}>and</Text>
            <TouchableOpacity onPress={goToPrivatePolicy} style={styles.link}>
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
