import { isDefined } from '@rnw-community/shared';
import { isAddress } from 'ethers/lib/utils';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import { LoaderSizeEnum } from '../../components/loader/enums';
import { Loader } from '../../components/loader/loader';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { HeaderAccountBalance } from '../../components/screen-components/header-container/components/header-account-balance/header-account-balance';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { SearchPanel } from '../../components/search-panel/search-panel';
import { EMPTY_STRING } from '../../constants/defaults';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useGetTokenMetadata } from '../../hooks/use-get-token-metadata.hook';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { Token as TokenInterface } from '../../interfaces/token.interface';
import { TokenFormTypes } from '../../modals/screens/token/types/form-types.interface';
import { createEntity } from '../../store/utils/entity.utils';
import { useAccountTokensAndGasTokenSelector } from '../../store/wallet/wallet.selectors';

import { AccountTokens } from './components/account-tokens/account-tokens';
import { ManageTokens } from './components/manage-tokens/manage-tokens';
import { styles } from './tokens.styles';
import { compare } from './utils/compare.util';

export const Tokens: FC = () => {
  const { navigate, goBack } = useNavigation();

  const allAccountTokensWithGasToken = useAccountTokensAndGasTokenSelector();

  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [newToken, setNewToken] = useState<TokenInterface | null>(null);
  const [isEmptyTokensList, setIsEmptyTokensList] = useState(false);
  const [isShowManageTokens, setIsShowManageTokens] = useState(false);

  const handleLoadNewTokenMetadata = useCallback((metadata: TokenFormTypes) => {
    setNewToken({
      tokenAddress: metadata.tokenAddress,
      decimals: Number(metadata.decimals),
      isVisible: false,
      name: metadata.name,
      symbol: metadata.symbol,
      balance: createEntity('0'),
      thumbnailUri: metadata.thumbnailUri
    });
  }, []);

  const { getTokenMetadata, isLoadingMetadata } = useGetTokenMetadata(handleLoadNewTokenMetadata);

  const isTokenExistOnAccount = useMemo(
    () => isDefined(allAccountTokensWithGasToken.find(token => compare(token, searchValue))),
    [searchValue, allAccountTokensWithGasToken]
  );

  useEffect(() => {
    if (isAddress(searchValue) && !isTokenExistOnAccount) {
      getTokenMetadata(searchValue);
    } else {
      setNewToken(null);
    }
  }, [searchValue, isTokenExistOnAccount]);

  const onPressActivityIcon = () => navigate(ScreensEnum.Activity);

  return (
    <ScreenContainer style={styles.screenContainer}>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Tokens" onBackButtonPress={goBack} />
        <HeaderAccountBalance />
      </HeaderContainer>

      <View style={styles.root}>
        <SearchPanel
          onPressActivityIcon={onPressActivityIcon}
          setSearchValue={setSearchValue}
          isEmptyList={isEmptyTokensList && !isLoadingMetadata}
          setIsShowManageTokens={setIsShowManageTokens}
        />

        {isLoadingMetadata ? (
          <View style={styles.loading}>
            <Loader size={LoaderSizeEnum.Large} />
          </View>
        ) : isShowManageTokens ? (
          <ManageTokens searchValue={searchValue} newToken={newToken} setIsEmptyTokensList={setIsEmptyTokensList} />
        ) : (
          <AccountTokens searchValue={searchValue} newToken={newToken} setIsEmptyTokensList={setIsEmptyTokensList} />
        )}
      </View>

      <NavigationBar />
    </ScreenContainer>
  );
};
