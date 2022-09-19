import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Row } from '../../components/row/row';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { SearchPanel } from '../../components/search-panel/search-panel';
import { SwitchThemesEnum } from '../../components/switch/enum';
import { Switch } from '../../components/switch/switch';
import { Token } from '../../components/token/token';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { GAS_TOKEN_ADDRESS } from '../../constants/defaults';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useFilterAccountTokens } from '../../hooks/use-filter-tokens.hook';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { Token as TokenInterface } from '../../interfaces/token.interface';
import { changeTokenVisibilityAction } from '../../store/wallet/wallet.actions';
import { useAccountTokensAndGasTokenSelector } from '../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../utils/token.utils';

import { styles } from './manage-tokens.styles';

export const ManageTokens: FC = () => {
  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();
  const accountTokensAndGasTokenSelector = useAccountTokensAndGasTokenSelector();
  const { accountTokens, setSearchValue } = useFilterAccountTokens(accountTokensAndGasTokenSelector);

  const navigateToEditTokenScreen = (token: TokenInterface) => navigate(ScreensEnum.EditToken, { token });

  const handleTokenVisibility = (token: TokenInterface) => dispatch(changeTokenVisibilityAction(token));

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Edit Token List" onBackButtonPress={goBack} />
      </HeaderContainer>

      <SearchPanel setSearchValue={setSearchValue} style={styles.searchPanel} isEmptyList={!accountTokens.length} />

      <ScreenScrollView style={styles.root}>
        {accountTokens.map((token, i) => {
          const isGasToken = token.tokenAddress === GAS_TOKEN_ADDRESS;

          return (
            <Row
              key={getTokenSlug(token.tokenAddress, token.tokenId)}
              style={[styles.token, i !== accountTokens.length - 1 && styles.borderBottom]}
            >
              <Token uri={token.thumbnailUri} symbol={token.symbol} name={token.name} gasToken={isGasToken} />
              <Row>
                <TouchableIcon
                  onPress={() => navigateToEditTokenScreen(token)}
                  name={IconNameEnum.Edit}
                  style={styles.editIcon}
                  disabled={isGasToken}
                />
                <Switch
                  onPress={() => handleTokenVisibility(token)}
                  theme={SwitchThemesEnum.Primary}
                  isActive={token.isVisible}
                  disabled={isGasToken}
                />
              </Row>
            </Row>
          );
        })}
      </ScreenScrollView>

      <NavigationBar />
    </ScreenContainer>
  );
};
