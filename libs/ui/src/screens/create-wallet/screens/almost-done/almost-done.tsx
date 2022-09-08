import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';

import { Checkbox } from '../../../../components/checkbox/checkbox';
import { Column } from '../../../../components/column/column';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { TextInput } from '../../../../components/text-input/text-input';
import { Text } from '../../../../components/text/text';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { Container } from '../../components/container/container';

import { styles } from './almost-done.styles';
import { CreateAccountType } from './types';
import { useValidateForm } from './use-validate-form.hook';

const defaultValues = {
  name: 'Account 1',
  password: '',
  confirmPassword: ''
};

export const AlmostDone: FC = () => {
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    setError,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<CreateAccountType>({
    mode: 'onChange',
    defaultValues
  });

  const { commonRules } = useValidateForm();

  const handleCreateAccount = (data: CreateAccountType) => {
    console.log('Submitted:', data);
  };

  const handleTogglePasswordVisibility = () => setIsSecurePassword(prev => !prev);
  const handleToggleConfirmPasswordVisibility = () => setIsSecureConfirmPassword(prev => !prev);

  return (
    <Container title="Almost Done" step={3} submitTitle="Create" onSubmitPress={handleSubmit(handleCreateAccount)}>
      <Controller
        control={control}
        name="name"
        rules={commonRules}
        render={({ field }) => (
          <TextInput
            field={field}
            label="Account Name"
            placeholder="Account 1"
            prompt="Name of main account (4-18 characters)"
            error={errors.name?.message}
            containerStyle={styles.marginBottom}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={commonRules}
        render={({ field }) => (
          <Row style={styles.inputContainer}>
            <TextInput
              field={field}
              label="Password"
              secureTextEntry={isSecurePassword}
              placeholder="Password"
              prompt="Password is used to protect the wallet"
              error={errors.password?.message}
              containerStyle={styles.input}
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
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        rules={commonRules}
        render={({ field }) => (
          <Row style={[styles.inputContainer, styles.marginBottom]}>
            <TextInput
              field={field}
              label="Password Confirm"
              secureTextEntry={isSecureConfirmPassword}
              placeholder="Password"
              prompt="Password is used to protect the wallet"
              error={errors.confirmPassword?.message}
              containerStyle={styles.input}
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
      <Checkbox text="Use Face ID" selected={false} onSelect={() => null} style={styles.checkbox} />
      <Checkbox text="Accept terms" selected onSelect={() => null} style={styles.checkbox}>
        <Column>
          <Text style={styles.text}>I have read and agree to</Text>
          <Row>
            <Text style={styles.text}>the</Text>
            <TouchableOpacity>
              <Text style={styles.linkingText}>Terms of Usage</Text>
            </TouchableOpacity>
            <Text style={styles.text}>and</Text>
            <TouchableOpacity>
              <Text style={styles.linkingText}>Terms of Usage</Text>
            </TouchableOpacity>
          </Row>
        </Column>
      </Checkbox>
      <Checkbox text="Analytics" selected onSelect={() => null}>
        <Column>
          <Text style={styles.text}>I have read and agree to</Text>
          <Row>
            <Text style={styles.text}>the</Text>
            <TouchableOpacity>
              <Text style={styles.linkingText}>anonymous information collecting</Text>
            </TouchableOpacity>
          </Row>
        </Column>
      </Checkbox>
    </Container>
  );
};
