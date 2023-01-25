import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Divider } from '../../components/divider/divider';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Pressable } from '../../components/pressable/pressable';
import { Row } from '../../components/row/row';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { Tabs } from '../../components/tabs/tabs';
import { Text } from '../../components/text/text';
import { DATA_UPDATE_TIME } from '../../constants/update-time';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useTimerEffect } from '../../hooks/use-timer-effect.hook';
import { useTokenBalance } from '../../hooks/use-token-balance.hook';
import { ViewStyleProps } from '../../interfaces/style.interface';
import { useTokenMarketInfoSelector } from '../../store/tokens-market-info/token-market-info.selectors';
import { loadAccountTokenBalanceAction, loadGasTokenBalanceAction } from '../../store/wallet/wallet.actions';
import { useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';
import { colors } from '../../styles/colors';
import { checkIsGasToken } from '../../utils/check-is-gas-token.util';
import { getFiatBalanceToDisplay } from '../../utils/get-dollar-value-to-display.util';
import { getFormattedBalance } from '../../utils/units.utils';

import { Activity } from './components/activity/activity';
import { Balance } from './components/balance/balance';
import { HeaderSideToken } from './components/header-side-token/header-side-token';
import { NavigationBar } from './components/navigation-bar/navigation-bar';
import { TokenInfo } from './components/token-info/token-info';
import { styles } from './token.styles';

interface Props {
  style?: ViewStyleProps;
}

const tabs = [
  {
    id: 1,
    title: 'Activity',
    Component: Activity
  },
  {
    id: 2,
    title: 'Info',
    Component: TokenInfo
  }
];

export const Token: FC<Props> = ({ style }) => {
  const { goBack, navigate } = useNavigation();
  const {
    params: { token }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Token>>();
  const { chainId } = useSelectedNetworkSelector();
  const dispatch = useDispatch();

  const { name, symbol, tokenAddress, decimals, tokenId, thumbnailUri, balance } = token;

  const { price, usdPriceChange24h } = useTokenMarketInfoSelector(tokenAddress, chainId);
  const { tokenBalance, fiatBalance } = useTokenBalance(tokenAddress, tokenId);

  const formattedBalance = getFormattedBalance(tokenBalance.toString() ?? balance.data, decimals);
  const isGasToken = checkIsGasToken(tokenAddress);
  const fiatBalanceToDisplay = getFiatBalanceToDisplay(tokenBalance, fiatBalance);

  const getTokenBalanceFromContract = () => {
    if (isGasToken) {
      dispatch(loadGasTokenBalanceAction.submit());
    } else {
      dispatch(loadAccountTokenBalanceAction.submit({ token }));
    }
  };

  useTimerEffect(getTokenBalanceFromContract, DATA_UPDATE_TIME, [token, chainId]);

  const navigateToEditTokenScreen = () => navigate(ScreensEnum.EditToken, { token });

  return (
    <ScreenContainer style={[styles.root, style]}>
      <HeaderContainer isSelectors>
        <ScreenTitle title={symbol} onBackButtonPress={goBack} />
        <HeaderSideToken
          name={name}
          dynamics={usdPriceChange24h}
          price={price}
          thumbnailUri={thumbnailUri}
          isGasToken={isGasToken}
        />
      </HeaderContainer>

      <Balance balance={formattedBalance} fiatBalance={fiatBalanceToDisplay} />
      <NavigationBar token={token} />

      <Divider style={styles.divider} />

      <Tabs
        values={tabs}
        additionalTabHeader={
          <Pressable onPress={navigateToEditTokenScreen} disabled={isGasToken} style={styles.editTokenButton}>
            <Row>
              <Text style={[styles.editText, isGasToken && styles.disabled]}>Edit Token</Text>
              <Icon
                name={IconNameEnum.EditSmall}
                iconStyle={styles.editIcon}
                color={isGasToken ? colors.bgGrey5 : colors.orange}
              />
            </Row>
          </Pressable>
        }
        tabsStyle={styles.tabs}
      />
    </ScreenContainer>
  );
};
