import React, { FC } from 'react';
import { Text } from 'react-native';

import { Token } from '../../../../interfaces/token.interface';
import { getTokenSlug } from '../../../../utils/token.utils';
import { WalletStyles } from '../../wallet.styles';

import { AccountToken } from './components/account-token';

interface Props {
  visibleAccountTokens: Token[];
}

export const AccountTokens: FC<Props> = ({ visibleAccountTokens }) => (
  <>
    {!!visibleAccountTokens.length && <Text style={WalletStyles.boldText}>All visible tokens</Text>}
    {visibleAccountTokens.map(token => (
      <AccountToken key={getTokenSlug(token)} token={token} />
    ))}
  </>
);
