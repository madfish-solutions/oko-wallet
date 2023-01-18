import { isDefined, isEmptyString } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { DATA_UPDATE_TIME } from '../../../constants/update-time';
import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useTimerEffect } from '../../../hooks/use-timer-effect.hook';
import { Token } from '../../../interfaces/token.interface';
import { getImageSource } from '../../../screens/wallet/components/assets-widget/utils/get-image-source.util';
import { TokenPriceInfo } from '../../../store/tokens-market-info/tokens-market-info.state';
import {
  changeTokenVisibilityAction,
  loadAccountTokenBalanceAction,
  loadGasTokenBalanceAction
} from '../../../store/wallet/wallet.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';
import { checkIsGasToken } from '../../../utils/check-is-gas-token.util';
import { getDollarValue } from '../../../utils/get-dollar-amount.util';
import { getFormattedBalance } from '../../../utils/units.utils';
import { Switch } from '../../switch/switch';
import { TokenItemThemesEnum } from '../token-item/enums';
import { TokenItem } from '../token-item/token-item';

interface Props {
  token: Token;
  marketInfo?: TokenPriceInfo;
  showButton?: boolean;
  loadBalance?: boolean;
  theme?: TokenItemThemesEnum;
}

export const AccountToken: FC<Props> = ({ token, showButton, loadBalance = false, theme, marketInfo = {} }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { rpcUrl } = useSelectedNetworkSelector();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { price } = marketInfo;
  const { decimals, thumbnailUri, balance, symbol, name, tokenAddress } = token;
  const isGasToken = checkIsGasToken(tokenAddress);

  const imageSource = getImageSource(thumbnailUri);
  const formattedBalance = getFormattedBalance(balance?.data ?? 0, decimals);
  const usdBalance = getDollarValue({ amount: balance?.data ?? 0, price, decimals });

  const getTokenBalance = () => {
    if (!loadBalance || isEmptyString(publicKeyHash)) {
      return;
    }

    // if (isGasToken) {
    //   dispatch(loadGasTokenBalanceAction.submit());
    // }
  };

  useTimerEffect(getTokenBalance, DATA_UPDATE_TIME, [rpcUrl, publicKeyHash]);

  const handleTokenVisibility = () => dispatch(changeTokenVisibilityAction(token));

  const navigateToTokenDetails = () => navigate(ScreensEnum.Token, { token });

  return (
    <Pressable onPress={navigateToTokenDetails}>
      <TokenItem
        imageSource={imageSource}
        balance={formattedBalance}
        symbol={symbol}
        theme={theme}
        name={name}
        usdBalance={usdBalance}
        isGasToken={isGasToken}
      >
        {isDefined(showButton) && showButton && !isGasToken ? (
          <Switch onPress={handleTokenVisibility} isActive={token.isVisible} />
        ) : undefined}
      </TokenItem>
    </Pressable>
  );
};
