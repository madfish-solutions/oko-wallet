import React, { FC } from 'react';

import { Account } from '../../components/account/account';
import { GasTokenBalance } from '../../components/gas-token-balance/gas-token-balance';
import { ScreenContainer } from '../../components/screen-container/screen-container';
import { useUnlock } from '../../hooks/use-unlock.hook';

import { AccountTokens } from './components/account-tokens/account-tokens';

export const Wallet: FC = () => {
  const { isLocked } = useUnlock();

  return (
    <ScreenContainer scrollEnabled={!isLocked}>
      <Account />
      <GasTokenBalance />
      <AccountTokens />
    </ScreenContainer>
  );
};
