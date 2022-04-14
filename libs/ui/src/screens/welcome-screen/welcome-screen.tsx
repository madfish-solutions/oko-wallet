import React, {useEffect, useState} from 'react';

import { MnemonicTextInput } from '../../app/components/mnemonic-text-input';
import { Title } from '../../app/components/title';
import { Wrapper } from '../../app/components/wrapper';
import { Text } from "react-native";
import {NavigationBar} from "../../components/navigation-bar/navigation-bar";
import {generateSeed} from "../../utils/keys.util";

export const WelcomeScreen = () => {
  const [seed, setSeed] = useState('');

  useEffect(() => {
    generateSeed().then(newSeed => setSeed(newSeed));
  }, []);

  return (
    <Wrapper>
      <NavigationBar/>
      <Title 
        description={'If you ever switch between browsers or devices, you will need this seed phrase to access your accounts. Keep it in secret.'}
      >
        Seed Phrase
      </Title>
      <MnemonicTextInput />
      <Text>{seed}</Text>
    </Wrapper>
  );
}
