import React, { FC } from 'react';

import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './currency.styles';

interface Props {
  amount: string;
}

export const Currency: FC<Props> = ({ amount }) => (
  <Row>
    <Text style={styles.amount}>{amount}</Text>
    <Text style={styles.currency}>$</Text>
  </Row>
);
