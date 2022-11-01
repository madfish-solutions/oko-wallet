import React, { FC } from 'react';

import { Amount } from '../../../../components/amount/amount';
import { Column } from '../../../../components/column/column';
import { Currency } from '../../../../components/currency/currency';
import { Text } from '../../../../components/text/text';

import { styles } from './balance.styles';

interface Props {
  balance: string;
  usdBalance: string;
}

export const Balance: FC<Props> = ({ balance, usdBalance }) => (
  <Column style={styles.root}>
    <Text style={styles.title}>Available balance</Text>
    <Currency amount={usdBalance} />
    <Amount value={balance} style={styles.balance} />
  </Column>
);
