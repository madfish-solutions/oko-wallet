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
import { ScreensEnum } from '../../enums/screens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useSearchNewToken } from '../../hooks/use-search-new-token.hook';
import { Token } from '../../interfaces/token.interface';
import { getTokenSlug } from '../../utils/token.utils';

import { AccountTokens } from './components/account-tokens/account-tokens';
import { ManageTokens } from './components/manage-tokens/manage-tokens';
import { styles } from './tokens.styles';

const keyExtractor = ({ tokenAddress, tokenId }: Token) => getTokenSlug(tokenAddress, tokenId);

export const Tokens: FC = () => {
  const { navigate, goBack } = useNavigation();

  const [isEmptyTokensList, setIsEmptyTokensList] = useState(false);
  const [isShowManageTokens, setIsShowManageTokens] = useState(false);

  const { newToken, isLoadingMetadata, searchValue, setSearchValue } = useSearchNewToken();

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
          placeholder="Search by name or address"
          isShowManageTokensIcon
        />

        {isLoadingMetadata ? (
          <Loader size={LoaderSizeEnum.Large} style={styles.loader} />
        ) : isShowManageTokens ? (
          <ManageTokens
            searchValue={searchValue}
            newToken={newToken}
            setIsEmptyTokensList={setIsEmptyTokensList}
            keyExtractor={keyExtractor}
          />
        ) : (
          <AccountTokens
            searchValue={searchValue}
            newToken={newToken}
            setIsEmptyTokensList={setIsEmptyTokensList}
            keyExtractor={keyExtractor}
          />
        )}
      </View>

      <NavigationBar />
    </ScreenContainer>
  );
};
