import React, { FC, useMemo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useVisibleAccountTokensSelector } from '../../../../store/wallet/wallet.selectors';
import { AccountTokensList } from '../account-tokens-list/account-tokens-list';
import { Collectibles } from '../collectibles/collectibles';

import { AccountTokensStyles } from './account-tokens.styles';

export const AccountTokens: FC = () => {
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const [inputNameSearch, setInputNameSearch] = useState('');
  const [isTokensShow, setIsTokensShow] = useState(true);

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
    <View style={AccountTokensStyles.root}>
      <TextInput
        style={AccountTokensStyles.input}
        onChangeText={setInputNameSearch}
        value={inputNameSearch}
        placeholder="Find token..."
      />
      <View style={AccountTokensStyles.switchButton}>
        <TouchableOpacity onPress={() => setIsTokensShow(true)}>
          <Text>Tokens</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsTokensShow(false)}>
          <Text>Collectibles</Text>
        </TouchableOpacity>
      </View>
      {accountTokens.length ? (
        isTokensShow ? (
          <AccountTokensList accountTokens={accountTokens} />
        ) : (
          <Collectibles />
        )
      ) : (
        <Text>Tokens not found!</Text>
      )}
    </View>
  );
};
