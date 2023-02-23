import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC } from 'react';
import { View } from 'react-native';

import { Text } from '../../../../../../components/text/text';
import { Token } from '../../../../../../interfaces/token.interface';
import { DollarAmount } from '../token-input/components/dollar-amount/dollar-amount';
import { SelectToken } from '../token-input/components/select-token/select-token';

import { styles } from './read-only-token-input.styles';

interface Props {
  token?: Token;
  navigationKey?: string;
  amount: string;
  amountInDollar: string;
  availableFormattedBalance?: string;
}

export const ReadOnlyTokenInput: FC<Props> = ({
  token,
  navigationKey,
  amount,
  amountInDollar,
  availableFormattedBalance
}) => (
  <View style={styles.root}>
    <View style={styles.select}>
      <SelectToken
        token={token}
        navigationKey={navigationKey}
        isReadOnly
        availableBalance={availableFormattedBalance}
      />
    </View>
    <View style={styles.input}>
      <DollarAmount amount={amount} amountInDollar={amountInDollar} isReadOnly />
      <View>
        <Text style={styles.amount}>{isNotEmptyString(amount) ? amount : '0.00'}</Text>
      </View>
    </View>
  </View>
);
