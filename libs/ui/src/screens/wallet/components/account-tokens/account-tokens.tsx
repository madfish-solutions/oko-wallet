import React, { FC } from 'react';
import { Text } from 'react-native';

import { Token } from '../../../../interfaces/token.interface';
import { getTokenMetadataSlug } from '../../../../utils/token-metadata.util';
import { WalletStyles } from '../../wallet.styles';

import { AccountToken } from './components/account-token';

interface Props {
  selectedNetworkRpcUrl: string;
  visibleAccountTokens: Token[];
}

export const AccountTokens: FC<Props> = ({ selectedNetworkRpcUrl, visibleAccountTokens }) => (
  <>
    {!!visibleAccountTokens.length && <Text style={WalletStyles.boldText}>All visible tokens</Text>}
    {visibleAccountTokens.map(token => (
      <AccountToken key={getTokenMetadataSlug(selectedNetworkRpcUrl, token.tokenAddress)} token={token} />
    ))}
  </>
);
