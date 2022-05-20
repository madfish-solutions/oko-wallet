import React, { FC } from 'react';
import { Text } from 'react-native';

import { Token } from '../../../../interfaces/token.interface';
import { WalletStyles } from '../../wallet.styles';
import { AccountToken } from './account-token';

interface Props {
  visibleAccountTokens: Token[];
}

export const AccountTokens: FC<Props> = ({ visibleAccountTokens }) => (
  <>
    {!!visibleAccountTokens.length && <Text style={WalletStyles.boldText}>All visible tokens</Text>}
    {visibleAccountTokens.map(token => <AccountToken key={token.tokenAddress} token={token} />)}
  </>
);
