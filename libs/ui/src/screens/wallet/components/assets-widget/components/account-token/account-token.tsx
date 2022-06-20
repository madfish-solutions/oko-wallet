import React, { FC, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Row } from '../../../../../../components/row/row';
import { Token } from '../../../../../../interfaces/token.interface';
import { loadAccountTokenBalanceAction } from '../../../../../../store/wallet/wallet.actions';
import { formatUnits } from '../../../../../../utils/units.utils';
import { styles } from '../../assets-widget.styles';
import { getImagePath } from '../../utils/get-image-path.util';

interface Props {
  token: Token;
}

export const AccountToken: FC<Props> = ({ token }) => {
  const dispatch = useDispatch();
  const { decimals, thumbnailUri, balance, symbol } = token;

  const imagePath = getImagePath(thumbnailUri);
  const formattedBalance = formatUnits(balance.data, decimals);

  useEffect(() => {
    dispatch(loadAccountTokenBalanceAction.submit({ token }));
  }, []);

  return (
    <Row style={styles.tokenInfoContainer}>
      <Row style={styles.token}>
        <Image style={styles.tokenImage} source={imagePath} />
        <Text style={styles.text}>{symbol}</Text>
      </Row>

      <View style={styles.balanceContainer}>
        <Text style={styles.text}>{formattedBalance}</Text>
        <Text style={[styles.text, styles.usdBalance]}>1000$</Text>
      </View>
    </Row>
  );
};
