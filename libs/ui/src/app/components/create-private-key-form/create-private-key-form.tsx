/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Wallet } from 'ethers';
import { useForm, Controller } from 'react-hook-form';

import { passwordValidationFactory } from 'libs/ui/src/utils/validate/validate-password-field.util';
import { getAdvancedErrorMessage } from 'libs/ui/src/utils/validate/get-advanced-error-message.util';

import { CreatePrivateKeyStyles } from './create-private-key-form.styles';

import { FormSection } from '../from-section';
import { MnemonicSection } from '../mnemonic-section';
import { Button } from '../button';
import { useEffect } from 'react';

export type FormTypes = {
  password: string;
  path: string;
  mnemonic: string;
};

const ETH_PATH = `m/44'/60'/0'/0/0`;

export const CreatePrivateKeyForm: React.FC = () => {
  const { control, handleSubmit, formState, setValue } = useForm<FormTypes>({
    defaultValues: {
      password: '',
      path: ETH_PATH,
      mnemonic: '',
    },
  });

  const { errors } = formState;

  // WARNING: Bad performance
  const generateMnemonic = useCallback(() => {
    const { mnemonic: generatedMnemonic } = Wallet.createRandom();
    return generatedMnemonic.phrase;
  }, []);

  const setMnemonicValue = useCallback(() => {
    setValue('mnemonic', generateMnemonic());
  }, [generateMnemonic, setValue]);

  useEffect(() => {
    setMnemonicValue();
  }, [setMnemonicValue]);

  const validatePassword = useMemo(
    () => passwordValidationFactory(),
    []
  );

  const passwordErrorMessage = useMemo(
    () => getAdvancedErrorMessage(errors.password),
    [errors.password]
  );

  const onSubmit = useCallback(async (values: FormTypes) => {
    const { path } = values;
    
    const ethersWallet = Wallet.fromMnemonic(generateMnemonic(), path);
  
    // DEBUG
    console.log('Submitted!', values);
    console.log('ethersWallet', {
      mnemonic: ethersWallet.mnemonic,
      private_key: ethersWallet.privateKey
    });
  }, [generateMnemonic]);

  return (
    <View>
      <Controller 
        name='password'
        control={control}
        rules={{ validate: validatePassword }}
        render={({ field: { onChange, value } }) => (
          <FormSection 
            title='Password'
            description='A password is used to protect the wallet.'
            placeholder='*********'
            secureTextEntry
            onChangeText={onChange}
            value={value}
            errors={passwordErrorMessage}
            style={CreatePrivateKeyStyles.section}
          />
        )}
      />
      <Controller 
        name='path'
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <FormSection 
            title='Derivation path'
            description='For HD acccounts. This is the thing you use to recover all your accounts from your seed phrase.'
            onChangeText={onChange}
            value={value}
            style={CreatePrivateKeyStyles.section}
          />
        )}
      />
      <Controller 
        name='mnemonic'
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <MnemonicSection 
            title='Seed Phrase'
            description='If you ever switch between browsers or devices, you will need this seed phrase to access your accounts. Keep it in secret.'
            numberOfLines={6}
            onPress={setMnemonicValue}
            onChangeText={onChange}
            mnemonic={value}
            multiline
          />
        )}
      />
      <Button
        title='Submit'
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
