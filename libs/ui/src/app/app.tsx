import React, {useEffect} from 'react';
import {Platform, SafeAreaView} from "react-native";

import { Wrapper } from './components/wrapper';
import { Title } from './components/title';
import { MnemonicTextInput } from './components/mnemonic-text-input';
import { generateSeed } from './utils/keys.web';

export const App: React.FC = () => {
  useEffect(() => {
    console.log('Shared App component rendering');
    console.log('OS:', Platform.OS);
  }, []);

  const test = async () => {
    const value = await generateSeed();
    return value;
  };

  // useEffect(() => {
  //   const generateSeed = async () => {
  //     const key64 = await symmetricKey64();
  //     const entropy = Array.from(Buffer.from(key64, 'base64'));
    
  //     return entropyToMnemonic(Buffer.from(entropy.slice(0, 16)));
  //   };
  //   console.log(generateSeed());
  // }, []);

  return (
    <SafeAreaView>
      <Wrapper>
        <Title 
          description={'If you ever switch between browsers or devices, you will need this seed phrase to access your accounts. Keep it in secret.'}
        >
          Seed Phrase
        </Title>
        <MnemonicTextInput />
      </Wrapper>
    </SafeAreaView>
  );
}
