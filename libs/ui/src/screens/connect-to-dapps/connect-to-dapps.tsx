import React, { FC } from 'react';

import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';

import { ConnectToDapps as ConnectToDappsComponent } from './components/connect-to-dapps/connect-to-dapps';

export const ConnectToDapps: FC = () => (
  <ScreenContainer screenTitle="Connect to Dapp">
    <ConnectToDappsComponent />
  </ScreenContainer>
);
