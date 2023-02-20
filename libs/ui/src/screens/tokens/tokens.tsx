import { isDefined } from '@rnw-community/shared';
import { isAddress } from 'ethers/lib/utils';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { LoaderSizeEnum } from '../../components/loader/enums';
import { Loader } from '../../components/loader/loader';
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
import { useGetTokenMetadata } from '../../hooks/use-get-token-metadata.hook';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useSortAccountTokensByBalance } from '../../hooks/use-sort-tokens-by-balance.hook';
import { Token } from '../../interfaces/token.interface';
import { TokenFormTypes } from '../../modals/screens/token/types/form-types.interface';
import { createEntity } from '../../store/utils/entity.utils';
import { sortAccountTokensByVisibility } from '../../store/wallet/wallet.actions';
import {
  useAccountTokensSelector,
  useVisibleAccountTokensSelector,
  useAccountTokensAndGasTokenSelector,
  useVisibleAccountTokensAndGasTokenSelector
} from '../../store/wallet/wallet.selectors';
import { colors } from '../../styles/colors';
import { getTokensWithBalance } from '../../utils/get-tokens-with-balance.util';
import { getTokenSlug } from '../../utils/token.utils';

import { styles } from './tokens.styles';
import { filterAccountTokensByValue } from './utils/filter-account-tokens-by-value';
import { getListOfTokensAddresses } from './utils/get-list-of-tokens-adresses.util';

const keyExtractor = ({ tokenAddress, tokenId }: Token) => getTokenSlug(tokenAddress, tokenId);

export const Tokens: FC = () => {
  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();

  const allAccountTokens = useAccountTokensSelector();
  const allAccountTokensWithGasToken = useAccountTokensAndGasTokenSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const visibleAccountTokensWithGasToken = useVisibleAccountTokensAndGasTokenSelector();

  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [tokensAddresses, setTokensAddresses] = useState<string[]>([]);
  const [isHideZeroBalance, setIsHideZeroBalance] = useState(false);
  const [newToken, setNewToken] = useState<Token | null>(null);
  const [isManageTokensActive, setIsManageTokensActive] = useState(false);

  const allAccountTokensWithBalance = useMemo(
    () => getTokensWithBalance(visibleAccountTokensWithGasToken),
    [visibleAccountTokensWithGasToken]
  );

  useEffect(() => {
    if (searchValue.length === 0) {
      setTokensAddresses(getListOfTokensAddresses(visibleAccountTokens));
    }
  }, [visibleAccountTokens, searchValue.length]);

  const handleLoadNewTokenMetadata = useCallback((metadata: TokenFormTypes) => {
    setNewToken({
      tokenAddress: metadata.tokenAddress,
      decimals: Number(metadata.decimals),
      isVisible: true,
      name: metadata.name,
      symbol: metadata.symbol,
      balance: createEntity('0')
    });
  }, []);

  const { getTokenMetadata, isLoadingMetadata } = useGetTokenMetadata(handleLoadNewTokenMetadata);

  const isTokenExistOnAccount = useMemo(
    () =>
      isDefined(
        allAccountTokensWithGasToken.find(
          token =>
            token.tokenAddress.toLowerCase().includes(searchValue.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
            token.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      ),
    [searchValue, allAccountTokensWithGasToken]
  );

  useEffect(() => {
    if (isAddress(searchValue) && !isTokenExistOnAccount) {
      getTokenMetadata(searchValue);
    } else {
      setNewToken(null);
    }
  }, [searchValue, isTokenExistOnAccount]);

  const filteredAccountTokens = useMemo(() => {
    if (isDefined(newToken) && isAddress(searchValue)) {
      return [newToken];
    }

    if (searchValue && isTokenExistOnAccount && visibleAccountTokensWithGasToken.length) {
      return filterAccountTokensByValue(
        isHideZeroBalance ? allAccountTokensWithBalance : allAccountTokensWithGasToken,
        searchValue
      );
    }

    return isHideZeroBalance ? allAccountTokensWithBalance : visibleAccountTokensWithGasToken;
  }, [
    newToken,
    searchValue,
    allAccountTokens,
    isTokenExistOnAccount,
    visibleAccountTokensWithGasToken,
    isHideZeroBalance,
    allAccountTokensWithBalance
  ]);

  const sortedTokens = useSortAccountTokensByBalance(filteredAccountTokens);

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
      const isNewToken = token.tokenAddress === newToken?.tokenAddress;
      const showButton = isNewToken ? false : !token.isVisible || !tokensAddresses.includes(token.tokenAddress);

      return (
        <AccountToken
          token={token}
          showButton={showButton}
          isNewToken={isNewToken}
          theme={TokenItemThemesEnum.Secondary}
        />
      );
    },
    [tokensAddresses, searchValue, newToken]
  );

  return (
    <ScreenContainer style={styles.screenContainer}>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Tokens" onBackButtonPress={goBack} />
        <HeaderAccountBalance />
      </HeaderContainer>

      <View style={styles.root}>
        <SearchPanel
          onPressEditIcon={setIsManageTokensActive}
          onPressActivityIcon={onPressActivityIcon}
          setSearchValue={setSearchValue}
          onSearchClose={onSearchClose}
          isEmptyList={!sortedTokens.length}
        />

        <Pressable onPress={onPressHideZeroBalances} disabled={isDefined(newToken)} style={styles.checkboxContainer}>
          <Row>
            <Icon
              name={isHideZeroBalance ? IconNameEnum.SelectedSquareCheckbox : IconNameEnum.EmptySquareCheckbox}
              color={isDefined(newToken) ? colors.grey : colors.orange}
            />
            <Text style={styles.checkboxText}>Hide 0 balances</Text>
          </Row>
        </Pressable>

        {isLoadingMetadata ? (
          <View style={styles.loading}>
            <Loader size={LoaderSizeEnum.Large} />
          </View>
        ) : (
          <FlatList
            data={sortedTokens}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        )}
      </View>

      <NavigationBar />
    </ScreenContainer>
  );
};
