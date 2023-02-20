import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Row } from '../../components/row/row';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { SearchPanel } from '../../components/search-panel/search-panel';
import { Switch } from '../../components/switch/switch';
import { Token } from '../../components/token/token';
import { useFilterAccountTokens } from '../../hooks/use-filter-tokens.hook';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { Token as TokenInterface } from '../../interfaces/token.interface';
import { changeTokenVisibilityAction, sortAccountTokensByVisibility } from '../../store/wallet/wallet.actions';
import { useAccountTokensAndGasTokenSelector } from '../../store/wallet/wallet.selectors';
import { checkIsGasToken } from '../../utils/check-is-gas-token.util';
import { getTokenSlug } from '../../utils/token.utils';

import { styles } from './manage-tokens.styles';

export const ManageTokens: FC = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const accountTokensAndGasToken = useAccountTokensAndGasTokenSelector();
  const { accountTokens, setSearchValue } = useFilterAccountTokens(accountTokensAndGasToken);

  const handleTokenVisibility = (token: TokenInterface) => dispatch(changeTokenVisibilityAction(token));

  useEffect(() => {
    dispatch(sortAccountTokensByVisibility());
  }, []);

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Edit Token List" onBackButtonPress={goBack} />
      </HeaderContainer>

      <SearchPanel setSearchValue={setSearchValue} style={styles.searchPanel} isEmptyList={!accountTokens.length} />

      <ScreenScrollView style={styles.container}>
        {accountTokens.map((token, i) => {
          const isGasToken = checkIsGasToken(token.tokenAddress);

          return (
            <Row
              key={getTokenSlug(token.tokenAddress, token.tokenId)}
              style={[styles.token, i !== accountTokens.length - 1 && styles.borderBottom]}
            >
              <Token uri={token.thumbnailUri} symbol={token.symbol} name={token.name} gasToken={isGasToken} />
              <Switch onPress={() => handleTokenVisibility(token)} isActive={token.isVisible} disabled={isGasToken} />
            </Row>
          );
        })}
      </ScreenScrollView>

      <NavigationBar />
    </ScreenContainer>
  );
};
