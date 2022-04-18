import React, { useCallback, useState, useEffect } from 'react';
import { View } from 'react-native';

import { CreatePrivateKeyStyles } from './create-private-key-form.styles';

import { FormSection } from '../from-section';
import { MnemonicSection } from '../mnemonic-section';
import { Button } from '../button';

type CreatePrivateKeyFormType = {
  password: string;
  derivationPath: string;
  mnemonic: string;
};

const TEZOS_BIP44_COINTYPE = 1729;
const ACCOUNT_INDEX = 0;
const MNEMONIC = 'slide about century surface undo student crop someone million allow blanket aerobic';

export const CreatePrivateKeyForm: React.FC = () => {
  const [{ password, derivationPath, mnemonic }, setInitialFormValues] = useState<CreatePrivateKeyFormType>({
    password: '',
    derivationPath: `m/44'/${TEZOS_BIP44_COINTYPE}'/${ACCOUNT_INDEX}'/0'`,
    mnemonic: MNEMONIC,
  });

  const setMnemonicPhrase = useCallback(async () => {
    // => WARNING: Work only for mobile!
    // const mnemonic = await generateSeed();
    // setInitialFormValues((prev) => ({
    //   ...prev,
    //   mnemonic,
    // }));
  }, []); 

  const onSubmit = useCallback(() => {
    // => WARNING: Work only for mobile!
    // const seed = mnemonicToSeedSync(mnemonic, 'password');
    // console.log("SEED", seed);
    // const getDeriveSeed = deriveSeed(seed, derivationPath);
    // console.log("DERIVE SEED", getDeriveSeed.slice(0, 32).toString('hex'));
    
    // DEBUG
    console.log("Submitted!");
  }, []);

  useEffect(() => {
    setMnemonicPhrase()
  }, [setMnemonicPhrase]);

  return (
    <View>
      <FormSection 
        title='Password'
        description='A password is used to protect the wallet.'
        placeholder='*********'
        secureTextEntry
        value={password}
        style={CreatePrivateKeyStyles.section}
      />
      <FormSection 
        title='Derivation path'
        description='For HD acccounts. This is the thing you use to recover all your accounts from your seed phrase.'
        value={derivationPath}
        style={CreatePrivateKeyStyles.section}
      />
      <MnemonicSection 
        title='Seed Phrase'
        description='If you ever switch between browsers or devices, you will need this seed phrase to access your accounts. Keep it in secret.'
        mnemonic={mnemonic}
        numberOfLines={6}
        onPress={setMnemonicPhrase}
        multiline
      />
      <Button
        title='Submit'
        onPress={onSubmit}
      />
    </View>
  );
};
