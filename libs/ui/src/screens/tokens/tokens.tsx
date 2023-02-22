import React, { FC, useState } from 'react';
import { View } from 'react-native';

import { LoaderSizeEnum } from '../../components/loader/enums';
import { Loader } from '../../components/loader/loader';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { HeaderAccountBalance } from '../../components/screen-components/header-container/components/header-account-balance/header-account-balance';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { SearchPanel } from '../../components/search-panel/search-panel';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useSearchNewToken } from '../../hooks/use-search-new-token.hook';
import { useAccountTokensAndGasTokenSelector } from '../../store/wallet/wallet.selectors';

import { AccountTokens } from './components/account-tokens/account-tokens';
import { ManageTokens } from './components/manage-tokens/manage-tokens';
import { styles } from './tokens.styles';

export const Tokens: FC = () => {
  const { navigate, goBack } = useNavigation();

  const allAccountTokensWithGasToken = useAccountTokensAndGasTokenSelector();

  const [isEmptyTokensList, setIsEmptyTokensList] = useState(false);
  const [isShowManageTokens, setIsShowManageTokens] = useState(false);

  const { newToken, isLoadingMetadata, searchValue, setSearchValue } = useSearchNewToken(allAccountTokensWithGasToken);

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
          isShowManageTokensIcon
        />

        {isLoadingMetadata ? (
          <Loader size={LoaderSizeEnum.Large} style={styles.loader} />
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
