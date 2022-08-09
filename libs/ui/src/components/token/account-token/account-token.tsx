import { isString } from '@rnw-community/shared';
import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Token } from '../../../interfaces/token.interface';
import { AddHideButtonsEnum } from '../../../screens/tokens/enums';
import { getImageSource } from '../../../screens/wallet/components/assets-widget/utils/get-image-source.util';
import { changeTokenVisibilityAction, loadAccountTokenBalanceAction } from '../../../store/wallet/wallet.actions';
import { formatUnits } from '../../../utils/units.utils';
import { Button } from '../../button/button';
import { ButtonSizeEnum } from '../../button/enums';
import { TokenItemThemesEnum } from '../token-item/enums';
import { TokenItem } from '../token-item/token-item';

import { styles } from './account-token.styles';

interface Props {
  token: Token;
  showButton?: AddHideButtonsEnum | null;
  loadBalance?: boolean;
  theme?: TokenItemThemesEnum;
}

export const AccountToken: FC<Props> = ({ token, showButton, loadBalance = false, theme }) => {
  const dispatch = useDispatch();
  const { decimals, thumbnailUri, balance, symbol, name } = token;

  const imageSource = getImageSource(thumbnailUri);
  const formattedBalance = formatUnits(balance.data, decimals);

  useEffect(() => {
    if (loadBalance) {
      dispatch(loadAccountTokenBalanceAction.submit({ token }));
    }
  }, []);

  const handleTokenVisibility = () => dispatch(changeTokenVisibilityAction(token));

  return (
    <TokenItem imageSource={imageSource} balance={formattedBalance} symbol={symbol} theme={theme} name={name}>
      {isString(showButton) ? (
        <View style={styles.buttonContainer}>
          <Button
            title={showButton}
            size={ButtonSizeEnum.Small}
            onPress={handleTokenVisibility}
            styleText={[styles.buttonText, showButton === AddHideButtonsEnum.Hide && styles.redText]}
          />
        </View>
      ) : undefined}
    </TokenItem>
  );
};
