/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import Caver from 'caver-js'
import { mnemonicToSeedSync, entropyToMnemonic } from 'bip39';
import { Wallet } from 'ethers';
import { useForm, Controller, FieldErrors, FormProvider } from 'react-hook-form';

import { generateSeed } from 'libs/ui/src/utils/keys.util';
import { passwordValidationFactory } from 'libs/ui/src/utils/validate/validate-password-field.util';
import { getAdvancedErrorMessage } from 'libs/ui/src/utils/validate/get-advanced-error-message.util';

import { CreatePrivateKeyStyles } from './create-private-key-form.styles';

import { FormSection } from '../from-section';
import { MnemonicSection } from '../mnemonic-section';
import { Button } from '../button';
import { useEffect } from 'react';

const caver = new Caver('https://api.baobab.klaytn.net:8651/');

export type FormTypes = {
  password: string;
  path: string;
  mnemonic: string;
};

// const TEZOS_BIP44_COINTYPE = 60;
// const ACCOUNT_INDEX = 0;
// const MNEMONIC = 'slide about century surface undo student crop someone million allow blanket aerobic';
// const PASSWORD = '11111111Test';
// const DERIVATION_PATH = `m/44'/${TEZOS_BIP44_COINTYPE}'/${ACCOUNT_INDEX}'/0'`;
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

  const generateMnemonic = useCallback(async () => {
    const mnemonic = await generateSeed();
    setValue('mnemonic', mnemonic);
  }, [setValue]);

  useEffect(() => {
    generateMnemonic();
  }, [generateMnemonic]);

  const validatePassword = useMemo(
    () => passwordValidationFactory(),
    []
  );

  const passwordErrorMessage = useMemo(
    () => getAdvancedErrorMessage(errors.password),
    [errors.password]
  );

  const onSubmit = useCallback(async (values: FormTypes) => {
    // DEBUG
    console.log('Submitted!', values);

    const { mnemonic, password, path } = values;
    
    // => WARNING: Work only for mobile!
    // const getDeriveSeed = deriveSeed(seed, derivationPath);
    // console.log("DERIVE SEED", getDeriveSeed.slice(0, 32).toString('hex'));

    // const seed = mnemonicToSeedSync(mnemonic, password);
    // const seedWithPassword = entropyToMnemonic(seed.slice(0, 32));
  
    const ethersWallet = Wallet.fromMnemonic(mnemonic, path);
    console.log('ethersWallet', {
      mnemonic: ethersWallet.mnemonic,
      private_key: ethersWallet.privateKey
    });

    // WARNING: Caver-js generate different keys
    // const caverJsWallet = caver.klay.accounts.create(seedWithPassword);
    // console.log('caverJsWallet', {
    //   private_key: caverJsWallet.privateKey,
    //   address: caverJsWallet.address,
    // });
  }, []);

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
            onPress={generateMnemonic}
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
