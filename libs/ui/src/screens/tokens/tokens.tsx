import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { HeaderSideTypeEnum } from '../../components/header/enums/header-side-type.enum';
import { EmptySearchIcon } from '../../components/icon/components/empty-search-icon/empty-search-icon';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Row } from '../../components/row/row';
import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';
import { SearchPanel } from '../../components/search-panel/search-panel';
import { AccountToken } from '../../components/token/account-token/account-token';
import { GasToken } from '../../components/token/gas-token/gas-token';
import { TokenItemThemesEnum } from '../../components/token/token-item/enums';
import { EMPTY_STRING } from '../../constants/defaults';
import { TokenOrGasToken } from '../../interfaces/token.interface';
import { sortAccountTokensByVisibility } from '../../store/wallet/wallet.actions';
import {
  useAccountTokensSelector,
  useSelectedNetworkSelector,
  useVisibleAccountTokensSelector
} from '../../store/wallet/wallet.selectors';

import { styles } from './tokens.styles';
import { filterAccountTokensByValue } from './utils/filter-account-tokens-by-value';
import { getListOfTokensAddresses } from './utils/get-list-of-tokens-adresses.util';
import { showAddHideButton } from './utils/show-add-hide-button.util';

const keyExtractor = ({ name, decimals, symbol }: TokenOrGasToken) => `${name}_${decimals}_${symbol}`;

export const Tokens: FC = () => {
  const {
    gasTokenMetadata,
    gasTokenBalance: { data: balance },
    rpcUrl
  } = useSelectedNetworkSelector();
  const dispatch = useDispatch();
  const allAccountTokens = useAccountTokensSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();

  const gasToken = useMemo(() => ({ ...gasTokenMetadata, balance }), [rpcUrl]);
  const allAccountTokensWithGasToken: TokenOrGasToken[] = useMemo(
    () => [gasToken, ...allAccountTokens],
    [allAccountTokens, gasToken]
  );
  const visibleAccountTokensWithGasToken: TokenOrGasToken[] = useMemo(
    () => [gasToken, ...visibleAccountTokens],
    [visibleAccountTokens, gasToken]
  );

  const [tokensAddresses, setTokensAddresses] = useState(() => getListOfTokensAddresses(visibleAccountTokens));
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  const accountTokens = useMemo(() => {
    if (searchValue && visibleAccountTokensWithGasToken.length) {
      return filterAccountTokensByValue(allAccountTokensWithGasToken, searchValue);
    }

    return visibleAccountTokensWithGasToken;
  }, [searchValue, allAccountTokens]);

  const onPressAddIcon = () => null;
  const onPressEditIcon = () => null;
  const onPressActivityIcon = () => null;

  const onSearchClose = useCallback(() => {
    const isSomeAccountTokensWasChangedToVisible = visibleAccountTokens.length !== tokensAddresses.length;

    if (isSomeAccountTokensWasChangedToVisible) {
      dispatch(sortAccountTokensByVisibility());

      setTokensAddresses(getListOfTokensAddresses(visibleAccountTokens));
    }
  }, [visibleAccountTokens]);

  useEffect(() => {
    dispatch(sortAccountTokensByVisibility());
  }, []);

  const renderItem = useCallback(
    ({ item: token }: ListRenderItemInfo<TokenOrGasToken>) => {
      const isToken = 'tokenAddress' in token;

      if (isToken) {
        return (
          <AccountToken
            token={token}
            loadBalance={!searchValue}
            showButton={showAddHideButton(token, tokensAddresses, searchValue)}
            theme={TokenItemThemesEnum.Secondary}
          />
        );
      }

      return <GasToken searchValue={searchValue} theme={TokenItemThemesEnum.Secondary} loadBalance={!searchValue} />;
    },
    [tokensAddresses, searchValue]
  );

  return (
    <ScreenContainer screenTitle="Tokens" navigationType={HeaderSideTypeEnum.AccountBalance} scrollViewWrapper={false}>
      <View style={styles.root}>
        <SearchPanel
          onPressAddIcon={onPressAddIcon}
          onPressEditIcon={onPressEditIcon}
          onPressActivityIcon={onPressActivityIcon}
          setSearchValue={setSearchValue}
          onSearchClose={onSearchClose}
        />
        <Row style={styles.checkboxContainer}>
          <Icon name={IconNameEnum.EmptySquareCheckbox} />
          <Text style={styles.checkboxText}>Hide 0 balances</Text>
        </Row>
        <FlatList
          data={accountTokens}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={<EmptySearchIcon />}
        />
      </View>
    </ScreenContainer>
  );
};
