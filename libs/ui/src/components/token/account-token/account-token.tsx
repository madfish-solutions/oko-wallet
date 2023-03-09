import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { Token } from '../../../interfaces/token.interface';
import { getImageSource } from '../../../screens/wallet/components/assets-widget/utils/get-image-source.util';
import { changeTokenVisibilityAction } from '../../../store/wallet/wallet.actions';
import { checkIsGasToken } from '../../../utils/check-is-gas-token.util';
import { getFiatBalanceToDisplay } from '../../../utils/get-dollar-value-to-display.util';
import { getFormattedBalance } from '../../../utils/units.utils';
import { Switch } from '../../switch/switch';
import { TokenItemThemesEnum } from '../token-item/enums';
import { TokenItem } from '../token-item/token-item';

interface Props {
  token: Token;
  showButton?: boolean;
  theme?: TokenItemThemesEnum;
  onPress?: OnEventFn<GestureResponderEvent>;
  onPressSwitch?: OnEventFn<void>;
  isNewToken?: boolean;
}

export const AccountToken: FC<Props> = ({ token, showButton, theme, onPress, onPressSwitch, isNewToken = false }) => {
  const dispatch = useDispatch();

  const { thumbnailUri, symbol, name, tokenAddress, fiatBalance, decimals } = token;

  const isGasToken = checkIsGasToken(tokenAddress);
  const fiatBalanceToDispaly = getFiatBalanceToDisplay(token.balance.data, fiatBalance ?? 0);
  const formattedBalance = getFormattedBalance(token.balance.data, decimals);
  const imageSource = getImageSource(thumbnailUri);

  const handleSwitch = () => {
    if (!isNewToken) {
      dispatch(changeTokenVisibilityAction(token));
    }

    onPressSwitch?.();
  };

  return (
    <Pressable onPress={onPress}>
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
          <Switch onPress={handleSwitch} isActive={token.isVisible} />
        ) : undefined}
      </TokenItem>
    </Pressable>
  );
};
