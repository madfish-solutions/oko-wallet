import React, { FC } from 'react';

import { Container } from '../../components/container/container';

export const VerifyMnemonic: FC = () => {
  const navigateToAlmostDoneScreen = () => null;

  return <Container title="Verify Mnemonic" step={2} onSubmitPress={navigateToAlmostDoneScreen} />;
};
