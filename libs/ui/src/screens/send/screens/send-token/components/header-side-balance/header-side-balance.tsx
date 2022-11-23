import React, { FC } from 'react';
import { View } from 'react-native';

import { Row } from '../../../../../../components/row/row';
import { Text } from '../../../../../../components/text/text';

import { styles } from './header-side-balance.styles';

interface Props {
  symbol: string;
  balance: string;
  usdBalance: string;
}

export const HeaderSideBalance: FC<Props> = ({ symbol, balance, usdBalance }) => (
  <View style={styles.root}>
    <Text style={[styles.numbersFontText11, styles.grey]}>Available balance</Text>
    <Row style={styles.dollarContainer}>
      <Text style={styles.numbersFontText13}>{usdBalance}</Text>
      <Text style={[styles.numbersFontText13, styles.grey, styles.dollar]}>$</Text>
    </Row>
    <Row>
      <Text style={styles.numbersFontText15}>{balance}</Text>
      <Text numberOfLines={1} style={[styles.numbersFontText15, styles.symbol, styles.grey]}>
        {symbol}
      </Text>
    </Row>
  </View>
);
