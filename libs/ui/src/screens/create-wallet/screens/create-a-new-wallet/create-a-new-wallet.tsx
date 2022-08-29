import React, { FC } from 'react';

import { Text } from '../../../../components/text/text';
import { Container } from '../../components/container/container';

export const CreateANewWallet: FC = () => {
  const navigateToVerifyMnemonic = () => null;

  return (
    <Container title="Create A New Wallet" step={1} onSubmitPress={navigateToVerifyMnemonic}>
      <Text>1</Text>
    </Container>
  );
};
