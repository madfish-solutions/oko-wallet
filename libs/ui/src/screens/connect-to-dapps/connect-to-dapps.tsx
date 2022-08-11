import React, { FC } from 'react';

import { SecondaryScreenContainer } from '../../components/screen-container/secondary-screen-container/secondary-screen-container';

import { ConnectToDapps as ConnectToDappsComponent } from './components/connect-to-dapps/connect-to-dapps';

export const ConnectToDapps: FC = () => (
  <SecondaryScreenContainer screenTitle="Connect to Dapp">
    <ConnectToDappsComponent />
  </SecondaryScreenContainer>
);
