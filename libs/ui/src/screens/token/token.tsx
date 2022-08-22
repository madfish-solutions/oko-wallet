import { RouteProp, useRoute } from '@react-navigation/native';
import { formatUnits } from 'ethers/lib/utils';
import React, { FC } from 'react';

import { Divider } from '../../components/divider/divider';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { ViewStyleProps } from '../../interfaces/style.interface';
import { useTokenBalanceFromStore } from '../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../utils/token.utils';

import { Balance } from './components/balance/balance';
import { HeaderSideToken } from './components/header-side-token/header-side-token';
import { NavigationBar } from './components/navigation-bar/navigation-bar';
import { styles } from './token.styles';

interface Props {
  style?: ViewStyleProps;
}

export const Token: FC<Props> = ({ style }) => {
  const { goBack } = useNavigation();
  const {
    params: {
      token: { name, symbol, tokenAddress, decimals, tokenId, thumbnailUri, balance }
    }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Token>>();

  const balanceFromStore = useTokenBalanceFromStore(getTokenSlug(tokenAddress, tokenId));
  const formattedBalance = formatUnits(balanceFromStore, decimals);
  const tokenSlug = getTokenSlug(tokenAddress, tokenId);
  const isGasToken = tokenSlug === 'gas_token_0';

  return (
    <ScreenContainer style={[styles.root, style]}>
      <HeaderContainer isSelectors>
        <ScreenTitle title={symbol} onBackButtonPress={goBack} />
        <HeaderSideToken
          name={name}
          dynamics="20.43"
          price="0.34"
          thumbnailUri={thumbnailUri}
          isGasToken={isGasToken}
        />
      </HeaderContainer>

      <Balance balance={formattedBalance ?? balance} />
      <NavigationBar tokenSlug={tokenSlug} />
      <Divider style={styles.divider} />
    </ScreenContainer>
  );
};
