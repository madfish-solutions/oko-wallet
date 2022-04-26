import React from 'react';

import { Wrapper } from '../../app/components/wrapper';
import { CreatePrivateKeyForm } from '../../app/components/create-private-key-form';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

export const WelcomeScreen = () => {
  return (
    <Wrapper>
      <NavigationBar />
      <CreatePrivateKeyForm />
    </Wrapper>
  );
}
