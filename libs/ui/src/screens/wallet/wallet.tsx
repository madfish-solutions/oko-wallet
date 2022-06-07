import React, { FC, useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Networks } from '../../components/networks/networks';
import {
  useVisibleAccountTokensSelector,
  useSelectedNetworkSelector,
  useCollectiblesSelector
} from '../../store/wallet/wallet.selectors';
import { formatUnits } from '../../utils/units.utils';

import { AccountTokens } from './components/account-tokens/account-tokens';
import { Collectibles } from './components/collectibles/collectibles';
import { WalletStyles } from './wallet.styles';

export const Wallet: FC = () => {
  const { gasTokenMetadata, gasTokenBalance } = useSelectedNetworkSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const [inputNameSearch, setInputNameSearch] = useState('');
  const [isTokensShow, setIsTokensShow] = useState(true);
  const collectibles = useCollectiblesSelector();

  const filteredTokens = useMemo(() => {
    if (inputNameSearch) {
      return visibleAccountTokens.filter(
        ({ name, symbol, tokenAddress }) =>
          name.toLowerCase().includes(inputNameSearch.toLowerCase()) ||
          symbol.toLowerCase().includes(inputNameSearch.toLowerCase()) ||
          tokenAddress.toLowerCase().includes(inputNameSearch.toLowerCase())
      );
    }

    return visibleAccountTokens;
  }, [inputNameSearch, visibleAccountTokens]);

  const gasTokenBalanceWithLoading = gasTokenBalance.isLoading
    ? '...'
    : `${formatUnits(gasTokenBalance.data, gasTokenMetadata.decimals)} ${gasTokenMetadata.symbol}`;

  return (
    <View>
      <NavigationBar />
      <View style={WalletStyles.root}>
        <Text style={WalletStyles.wrapper}>
          Balance: <Text style={WalletStyles.boldText}>{gasTokenBalanceWithLoading}</Text>
        </Text>
        <Networks />
        <TextInput
          style={WalletStyles.input}
          onChangeText={setInputNameSearch}
          value={inputNameSearch}
          placeholder="find token..."
        />
        <View style={WalletStyles.switchButton}>
          <TouchableOpacity onPress={() => setIsTokensShow(true)}>
            <Text>Tokens</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsTokensShow(false)}>
            <Text>Collectibles</Text>
          </TouchableOpacity>
        </View>
        {isTokensShow ? (
          <AccountTokens visibleAccountTokens={filteredTokens} />
        ) : (
          <Collectibles collectibles={collectibles} />
        )}
      </View>
    </View>
  );
};
