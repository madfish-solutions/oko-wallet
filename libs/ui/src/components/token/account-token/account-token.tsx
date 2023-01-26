import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { TokenWithFiatBalance } from '../../../interfaces/token.interface';
import { getImageSource } from '../../../screens/wallet/components/assets-widget/utils/get-image-source.util';
import { changeTokenVisibilityAction } from '../../../store/wallet/wallet.actions';
import { checkIsGasToken } from '../../../utils/check-is-gas-token.util';
import { getFiatBalanceToDisplay } from '../../../utils/get-dollar-value-to-display.util';
import { getFormattedBalance } from '../../../utils/units.utils';
import { Switch } from '../../switch/switch';
import { TokenItemThemesEnum } from '../token-item/enums';
import { TokenItem } from '../token-item/token-item';

interface Props {
  token: TokenWithFiatBalance;
  showButton?: boolean;
  theme?: TokenItemThemesEnum;
}

export const AccountToken: FC<Props> = ({ token, showButton, theme }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const { thumbnailUri, symbol, name, tokenAddress, fiatBalance } = token;

  const isGasToken = checkIsGasToken(tokenAddress);
  const fiatBalanceToDispaly = getFiatBalanceToDisplay(token.balance.data, fiatBalance);
  const formattedBalance = getFormattedBalance(token.balance.data, token.decimals);
  const imageSource = getImageSource(thumbnailUri);

  const handleTokenVisibility = () => dispatch(changeTokenVisibilityAction(token));

  const navigateToTokenDetails = () =>
    navigate(ScreensEnum.Token, { tokenAddress: token.tokenAddress, tokenId: token.tokenId });

  return (
    <Pressable onPress={navigateToTokenDetails}>
      <TokenItem
        imageSource={imageSource}
        balance={formattedBalance}
        symbol={symbol}
        theme={theme}
        name={name}
        fiatBalance={fiatBalanceToDispaly}
        isGasToken={isGasToken}
      >
        {isDefined(showButton) && showButton && !isGasToken ? (
          <Switch onPress={handleTokenVisibility} isActive={token.isVisible} />
        ) : undefined}
      </TokenItem>
    </Pressable>
  );
};
