import React from 'react';

import { MnemonicTextInput } from '../../app/components/mnemonic-text-input';
import { Title } from '../../app/components/title';
import { Wrapper } from '../../app/components/wrapper';
import {NavigationBar} from "../../components/navigation-bar/navigation-bar";

export const WelcomeScreen = () => {
  return (
    <Wrapper>
      <NavigationBar/>
      <Title 
        description={'If you ever switch between browsers or devices, you will need this seed phrase to access your accounts. Keep it in secret.'}
      >
        Seed Phrase
      </Title>
      <MnemonicTextInput />
    </Wrapper>
  );
}
