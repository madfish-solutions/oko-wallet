import React from 'react';

import { Wrapper } from '../../app/components/wrapper';
import { CreatePrivateKeyForm } from '../../app/components/create-private-key-form';

export const WelcomeScreen = () => {
  return (
    <Wrapper>
      <CreatePrivateKeyForm />
    </Wrapper>
  );
}
