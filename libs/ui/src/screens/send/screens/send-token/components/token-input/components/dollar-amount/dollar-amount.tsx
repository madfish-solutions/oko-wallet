import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC } from 'react';

import { Row } from '../../../../../../../../components/row/row';
import { Text } from '../../../../../../../../components/text/text';

import { styles } from './dollar-amount.styles';

interface Props {
  amount: string;
  amountInDollar: string;
  isReadOnly?: boolean;
}

export const DollarAmount: FC<Props> = ({ amount, amountInDollar, isReadOnly = false }) => (
  <Row style={styles.root}>
    <Text style={styles.text}>≈</Text>
    <Text
      style={[
        styles.text,
        styles.amount,
        isNotEmptyString(amount) && styles.amountDefined,
        isReadOnly && styles.amountReadOnly
      ]}
    >
      {amountInDollar}
    </Text>
    <Text style={styles.text}>$</Text>
  </Row>
);
