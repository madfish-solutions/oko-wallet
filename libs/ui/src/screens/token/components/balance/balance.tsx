import React, { FC } from 'react';

import { Column } from '../../../../components/column/column';
import { Currency } from '../../../../components/currency/currency';
import { Text } from '../../../../components/text/text';
import { TokenAmount } from '../../../../components/token-amount/token-amount';

import { styles } from './balance.styles';

interface Props {
  balance: string;
  valueInDollar: string;
}

export const Balance: FC<Props> = ({ balance, valueInDollar }) => (
  <Column style={styles.root}>
    <Text style={styles.title}>Available balance</Text>
    <Currency amount={valueInDollar} />
    <TokenAmount value={balance} style={styles.balance} />
  </Column>
);
