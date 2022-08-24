import { isDefined } from '@rnw-community/shared';
import React, { FC, useEffect } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { Token } from '../../../interfaces/token.interface';
import { getImageSource } from '../../../screens/wallet/components/assets-widget/utils/get-image-source.util';
import { changeTokenVisibilityAction, loadAccountTokenBalanceAction } from '../../../store/wallet/wallet.actions';
import { formatBalances, formatUnits } from '../../../utils/units.utils';
import { SwitchThemesEnum } from '../../switch/enum';
import { Switch } from '../../switch/switch';
import { TokenItemThemesEnum } from '../token-item/enums';
import { TokenItem } from '../token-item/token-item';

interface Props {
  token: Token;
  showButton?: boolean;
  loadBalance?: boolean;
  theme?: TokenItemThemesEnum;
}

export const AccountToken: FC<Props> = ({ token, showButton, loadBalance = false, theme }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { decimals, thumbnailUri, balance, symbol, name } = token;

  const imageSource = getImageSource(thumbnailUri);
  const formattedBalance = formatBalances(Number(formatUnits(balance.data, decimals)));

  useEffect(() => {
    if (loadBalance) {
      dispatch(loadAccountTokenBalanceAction.submit({ token }));
    }
  }, []);

  const handleTokenVisibility = () => dispatch(changeTokenVisibilityAction(token));

  const navigateToTokenDetails = () => navigate(ScreensEnum.Token, { token: { ...token, balance: formattedBalance } });

  return (
    <Pressable onPress={navigateToTokenDetails}>
      <TokenItem imageSource={imageSource} balance={formattedBalance} symbol={symbol} theme={theme} name={name}>
        {isDefined(showButton) && showButton ? (
          <Switch onPress={handleTokenVisibility} theme={SwitchThemesEnum.Primary} isActive={token.isVisible} />
        ) : undefined}
      </TokenItem>
    </Pressable>
  );
};
