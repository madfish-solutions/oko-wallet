import React, { FC, useMemo, useState } from 'react';
import { TextInput, View } from 'react-native';

import { useVisibleAccountTokensSelector } from '../../../../store/wallet/wallet.selectors';
import { AccountTokensList } from '../account-tokens-list/account-tokens-list';

import { AccountTokensStyles } from './account-tokens.styles';

export const AccountTokens: FC = () => {
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const [inputNameSearch, setInputNameSearch] = useState('');

  const accountTokens = useMemo(() => {
    if (inputNameSearch) {
      return visibleAccountTokens.filter(
        ({ name, symbol, tokenAddress }) =>
          name.toLowerCase().includes(inputNameSearch.toLowerCase()) ||
          symbol.toLowerCase().includes(inputNameSearch.toLowerCase()) ||
          tokenAddress.toLowerCase().includes(inputNameSearch.toLowerCase())
      );
    }

    return visibleAccountTokens;
  }, [inputNameSearch]);

  return (
    <View style={AccountTokensStyles.root}>
      <TextInput
        style={AccountTokensStyles.input}
        onChangeText={setInputNameSearch}
        value={inputNameSearch}
        placeholder="Find token..."
      />
      {accountTokens.length ? <AccountTokensList accountTokens={accountTokens} /> : 'Tokens not found!'}
    </View>
  );
};
