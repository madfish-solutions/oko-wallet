import React, { FC } from 'react';

import { Container } from '../../components/container/container';

export const AlmostDone: FC = () => {
  const handleCreateAccount = () => null;

  return <Container title="Almost Done" step={3} onSubmitPress={handleCreateAccount} />;
};
