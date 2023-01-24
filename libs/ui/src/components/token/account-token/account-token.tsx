import { isDefined } from '@rnw-community/shared';
import { BigNumber } from 'bignumber.js';
import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { TokenWithBigNumberBalance } from '../../../interfaces/token.interface';
import { getImageSource } from '../../../screens/wallet/components/assets-widget/utils/get-image-source.util';
import { changeTokenVisibilityAction } from '../../../store/wallet/wallet.actions';
import { checkIsGasToken } from '../../../utils/check-is-gas-token.util';
import { getValueInDollarToDisplay } from '../../../utils/get-dollar-value-to-display.util';
import { getFormattedBalance } from '../../../utils/units.utils';
import { Switch } from '../../switch/switch';
import { TokenItemThemesEnum } from '../token-item/enums';
import { TokenItem } from '../token-item/token-item';

interface Props {
  token: TokenWithBigNumberBalance;
  showButton?: boolean;
  theme?: TokenItemThemesEnum;
}

export const AccountToken: FC<Props> = ({ token, showButton, theme }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { decimals, thumbnailUri, balance, symbol, name, tokenAddress, valueInDollar } = token;
  const isGasToken = checkIsGasToken(tokenAddress);

  const valueInDollarToDispaly = getValueInDollarToDisplay(new BigNumber(token.balance.data), valueInDollar);
  const imageSource = getImageSource(thumbnailUri);
  const formattedBalance = getFormattedBalance(balance?.data ?? 0, decimals);

  const handleTokenVisibility = () => dispatch(changeTokenVisibilityAction(token));

  const navigateToTokenDetails = () =>
    navigate(ScreensEnum.Token, { token: { ...token, valueInDollar: valueInDollar.toString() } });

  return (
    <Pressable onPress={navigateToTokenDetails}>
      <TokenItem
        imageSource={imageSource}
        balance={formattedBalance}
        symbol={symbol}
        theme={theme}
        name={name}
        valueInDollar={valueInDollarToDispaly}
        isGasToken={isGasToken}
      >
        {isDefined(showButton) && showButton && !isGasToken ? (
          <Switch onPress={handleTokenVisibility} isActive={token.isVisible} />
        ) : undefined}
      </TokenItem>
    </Pressable>
  );
};
