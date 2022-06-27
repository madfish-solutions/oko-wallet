import React, { FC, useMemo, useState } from 'react';
import { Text, TextInput, ScrollView, View } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { useVisibleAccountTokensSelector } from '../../store/wallet/wallet.selectors';

import { styles } from './account-tokens.styles';
import { AccountToken } from './components/account-token/account-token';
import { GasToken } from './components/gas-token/gas-token';

export const AccountTokens: FC = () => {
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const [inputNameSearch, setInputNameSearch] = useState('');

  const accountTokens = useMemo(() => {
    if (inputNameSearch && visibleAccountTokens.length) {
      return visibleAccountTokens.filter(
        ({ name, symbol, tokenAddress }) =>
          name.toLowerCase().includes(inputNameSearch.toLowerCase()) ||
          symbol.toLowerCase().includes(inputNameSearch.toLowerCase()) ||
          tokenAddress.toLowerCase().includes(inputNameSearch.toLowerCase())
      );
    }

    return visibleAccountTokens;
  }, [inputNameSearch, visibleAccountTokens]);

  return (
    <View style={styles.root}>
      <NavigationBar />
      <TextInput
        style={styles.input}
        onChangeText={setInputNameSearch}
        value={inputNameSearch}
        placeholder="Find token..."
      />

      <ScrollView>
        <Text>All visible tokens:</Text>
        <GasToken />
        {accountTokens.map(token => (
          <AccountToken key={token.name} token={token} />
        ))}
      </ScrollView>
    </View>
  );
};
