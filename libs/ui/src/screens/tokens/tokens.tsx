import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Pressable } from '../../components/pressable/pressable';
import { Row } from '../../components/row/row';
import { HeaderAccountBalance } from '../../components/screen-components/header-container/components/header-account-balance/header-account-balance';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { SearchPanel } from '../../components/search-panel/search-panel';
import { Text } from '../../components/text/text';
import { AccountToken } from '../../components/token/account-token/account-token';
import { TokenItemThemesEnum } from '../../components/token/token-item/enums';
import { EMPTY_STRING } from '../../constants/defaults';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { Token } from '../../interfaces/token.interface';
import { useTokensMarketInfoSelector } from '../../store/tokens-market-info/token-market-info.selectors';
import { sortAccountTokensByVisibility } from '../../store/wallet/wallet.actions';
import {
  useAccountTokensSelector,
  useSelectedNetworkSelector,
  useVisibleAccountTokensSelector,
  useAccountTokensAndGasTokenSelector,
  useVisibleAccountTokensAndGasTokenSelector
} from '../../store/wallet/wallet.selectors';
import { getTokensWithBalance } from '../../utils/get-tokens-with-balance.util';
import { redirectToMamixiseView } from '../../utils/redirecit-to-maximise-view.util';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { getTokenSlug } from '../../utils/token.utils';

import { styles } from './tokens.styles';
import { filterAccountTokensByValue } from './utils/filter-account-tokens-by-value';
import { getListOfTokensAddresses } from './utils/get-list-of-tokens-adresses.util';

const keyExtractor = ({ tokenAddress, tokenId }: Token) => getTokenSlug(tokenAddress, tokenId);

export const Tokens: FC = () => {
  const { chainId } = useSelectedNetworkSelector();
  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();
  const allAccountTokens = useAccountTokensSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const allTokensMarketInfo = useTokensMarketInfoSelector();

  const allAccountTokensWithGasToken = useAccountTokensAndGasTokenSelector();
  const visibleAccountTokensWithGasToken = useVisibleAccountTokensAndGasTokenSelector();

  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [tokensAddresses, setTokensAddresses] = useState<string[]>([]);
  const [isHideZeroBalance, setIsHideZeroBalance] = useState(false);

  const allAccountTokensWithBalance = useMemo(
    () => getTokensWithBalance(visibleAccountTokensWithGasToken),
    [visibleAccountTokensWithGasToken]
  );

  useEffect(() => {
    if (searchValue.length === 0) {
      setTokensAddresses(getListOfTokensAddresses(visibleAccountTokens));
    }
  }, [visibleAccountTokens, searchValue.length]);

  const accountTokens = useMemo(() => {
    if (searchValue && visibleAccountTokensWithGasToken.length) {
      return filterAccountTokensByValue(
        isHideZeroBalance ? allAccountTokensWithBalance : allAccountTokensWithGasToken,
        searchValue
      );
    }

    return isHideZeroBalance ? allAccountTokensWithBalance : visibleAccountTokensWithGasToken;
  }, [searchValue, allAccountTokens, visibleAccountTokensWithGasToken, isHideZeroBalance, allAccountTokensWithBalance]);

  const navigateToAddNewToken = () => {
    redirectToMamixiseView();

    return navigate(ScreensEnum.AddNewToken);
  };
  const navigateToManageTokens = () => navigate(ScreensEnum.ManageTokens);
  const onPressActivityIcon = () => navigate(ScreensEnum.Activity);
  const onPressHideZeroBalances = () => setIsHideZeroBalance(!isHideZeroBalance);

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
      const tokenMetadataSlug = getTokenMetadataSlug(chainId, token.tokenAddress);

      const showButton = !token.isVisible || !tokensAddresses.includes(token.tokenAddress);

      return (
        <AccountToken
          token={token}
          loadBalance={!searchValue}
          showButton={showButton}
          theme={TokenItemThemesEnum.Secondary}
          marketInfo={allTokensMarketInfo[tokenMetadataSlug]}
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

        <Pressable onPress={onPressHideZeroBalances} style={styles.checkboxContainer}>
          <Row>
            <Icon name={isHideZeroBalance ? IconNameEnum.SelectedSquareCheckbox : IconNameEnum.EmptySquareCheckbox} />
            <Text style={styles.checkboxText}>Hide 0 balances</Text>
          </Row>
        </Pressable>

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
