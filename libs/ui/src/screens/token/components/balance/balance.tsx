import React, { FC } from 'react';

import { Column } from '../../../../components/column/column';
import { Currency } from '../../../../components/currency/currency';
import { Text } from '../../../../components/text/text';

import { styles } from './balance.styles';

interface Props {
  balance: string;
}

export const Balance: FC<Props> = ({ balance }) => (
  <Column style={styles.root}>
    <Text style={styles.title}>Available balance</Text>
    <Currency amount="410 M" />
    <Text style={styles.balance}>{balance}</Text>
  </Column>
);
