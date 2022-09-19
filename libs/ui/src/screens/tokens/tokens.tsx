import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Row } from '../../components/row/row';
import { HeaderAccountBalance } from '../../components/screen-components/header-container/components/header-account-balance/header-account-balance';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { SearchPanel } from '../../components/search-panel/search-panel';
import { AccountToken } from '../../components/token/account-token/account-token';
import { GasToken } from '../../components/token/gas-token/gas-token';
import { TokenItemThemesEnum } from '../../components/token/token-item/enums';
import { EMPTY_STRING, GAS_TOKEN_ADDRESS } from '../../constants/defaults';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { Token } from '../../interfaces/token.interface';
import { sortAccountTokensByVisibility } from '../../store/wallet/wallet.actions';
import {
  useAccountTokensSelector,
  useSelectedNetworkSelector,
  useVisibleAccountTokensSelector
} from '../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../utils/token.utils';

import { styles } from './tokens.styles';
import { filterAccountTokensByValue } from './utils/filter-account-tokens-by-value';
import { getListOfTokensAddresses } from './utils/get-list-of-tokens-adresses.util';

const keyExtractor = ({ tokenAddress, tokenId }: Token) => getTokenSlug(tokenAddress, tokenId);

export const Tokens: FC = () => {
  const { gasTokenMetadata, gasTokenBalance, rpcUrl } = useSelectedNetworkSelector();
  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();
  const allAccountTokens = useAccountTokensSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();

  const gasToken = useMemo(() => ({ ...gasTokenMetadata, balance: gasTokenBalance }), [rpcUrl]);
  const allAccountTokensWithGasToken: Token[] = useMemo(
    () => [{ ...gasToken, tokenAddress: GAS_TOKEN_ADDRESS, isVisible: true }, ...allAccountTokens],
    [allAccountTokens, gasToken]
  );
  const visibleAccountTokensWithGasToken: Token[] = useMemo(
    () => [{ ...gasToken, tokenAddress: GAS_TOKEN_ADDRESS, isVisible: true }, ...visibleAccountTokens],
    [visibleAccountTokens, gasToken]
  );

  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [tokensAddresses, setTokensAddresses] = useState<string[]>([]);

  useEffect(() => {
    if (searchValue.length === 0) {
      setTokensAddresses(getListOfTokensAddresses(visibleAccountTokens));
    }
  }, [visibleAccountTokens, searchValue.length]);

  const accountTokens = useMemo(() => {
    if (searchValue && visibleAccountTokensWithGasToken.length) {
      return filterAccountTokensByValue(allAccountTokensWithGasToken, searchValue);
    }

    return visibleAccountTokensWithGasToken;
  }, [searchValue, allAccountTokens]);

  const navigateToAddNewToken = () => navigate(ScreensEnum.AddNewToken);
  const navigateToManageTokens = () => navigate(ScreensEnum.ManageTokens);
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
    ({ item: token }: ListRenderItemInfo<Token>) => {
      const isGasToken = token.tokenAddress === GAS_TOKEN_ADDRESS;

      if (isGasToken) {
        return <GasToken searchValue={searchValue} theme={TokenItemThemesEnum.Secondary} loadBalance={!searchValue} />;
      }

      const showButton = !token.isVisible || !tokensAddresses.includes(token.tokenAddress);

      return (
        <AccountToken
          token={token}
          loadBalance={!searchValue}
          showButton={showButton}
          theme={TokenItemThemesEnum.Secondary}
        />
      );
    },
    [tokensAddresses, searchValue]
  );

  return (
    <ScreenContainer style={styles.screenContainer}>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Tokens" onBackButtonPress={goBack} />
        <HeaderAccountBalance />
      </HeaderContainer>

      <View style={styles.root}>
        <SearchPanel
          onPressAddIcon={navigateToAddNewToken}
          onPressEditIcon={navigateToManageTokens}
          onPressActivityIcon={onPressActivityIcon}
          setSearchValue={setSearchValue}
          onSearchClose={onSearchClose}
          isEmptyList={!accountTokens.length}
        />
        {accountTokens.length > 0 && (
          <Row style={styles.checkboxContainer}>
            <Icon name={IconNameEnum.EmptySquareCheckbox} />
            <Text style={styles.checkboxText}>Hide 0 balances</Text>
          </Row>
        )}
        <FlatList
          data={accountTokens}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>

      <NavigationBar />
    </ScreenContainer>
  );
};
