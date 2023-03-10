import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { isMobile } from 'shared';

import { Checkbox } from '../../components/checkbox/checkbox';
import { Column } from '../../components/column/column';
import { Text } from '../../components/text/text';
import { PasswordInput } from '../../components/text-input/components/password-input/password-input';
import { TextInput } from '../../components/text-input/text-input';
import { WalletCreationContainer } from '../../components/wallet-creation-container/wallet-creation-container';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useValidatePasswordForm } from '../../hooks/use-validate-password-form.hook';
import { usePasswordValidation } from '../../hooks/use-validation-messages.hook';
import { useAccountFieldRules } from '../../modals/hooks/use-validate-account-field.hook';
import { useImportWallet } from '../../shelter/hooks/use-import-wallet.hook';
import { setIsBiometricEnabled } from '../../store/settings/settings.actions';

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

  const importWallet = useImportWallet();
  const dispatch = useDispatch();

  const [isUseFaceId, setIsUseFaceId] = useState(false);

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
    if (!passwordIsNoValid) {
      const accountName = isNotEmptyString(formValue.name.trim()) ? formValue.name.trim() : defaultAccountName;

      importWallet({
        seedPhrase: mnemonic,
        password: formValue.password,
        hdAccountsLength: 1,
        accountName
      });

      dispatch(setIsBiometricEnabled(isUseFaceId));
    }
  };

  const isValidationError = Object.keys(errors).length > 0 && isSubmitted;

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
          <PasswordInput
            field={field}
            label="Password"
            prompt="Password is used to protect the wallet"
            inputContainerStyle={
              ((isDefined(passwordIsNoValid) && passwordIsNoValid) || isDefined(errors.password?.message)) &&
              styles.errorInput
            }
            testID={AlmostDoneTestIDs.PasswordInput}
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
          rules={confirmPasswordRules}
          render={({ field }) => (
            <PasswordInput
              field={field}
              label="Password Confirm"
              prompt="Password is used to protect the wallet"
              error={errors.confirmPassword?.message}
              testID={AlmostDoneTestIDs.PasswordConfirmInput}
            />
          )}
        />
      </Column>
      {isMobile && (
        <Checkbox text="Use Face ID" selected={isUseFaceId} onSelect={setIsUseFaceId} style={styles.checkbox} />
      )}
    </WalletCreationContainer>
  );
};
