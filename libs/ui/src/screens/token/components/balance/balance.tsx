import React, { FC } from 'react';

import { Column } from '../../../../components/column/column';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';

import { styles } from './balance.styles';

interface Props {
  balance: string;
}

export const Balance: FC<Props> = ({ balance }) => (
  <Column style={styles.root}>
    <Text style={styles.title}>Available balance</Text>
    <Row>
      <Text style={styles.balanceInUsd}>410 M</Text>
      <Text style={styles.currency}>$</Text>
    </Row>
    <Text style={styles.balance}>{balance}</Text>
  </Column>
);
