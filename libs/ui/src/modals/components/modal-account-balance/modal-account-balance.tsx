import React, { FC } from 'react';
import { Text } from 'react-native';

import { styles } from './modal-account-balance.styles';

interface Props {
  balance?: string;
}

export const ModalAccountBalance: FC<Props> = ({ balance }) => (
  <>
    <Text style={[styles.text, styles.amount]}>{balance ?? '401 987.01'}</Text>
    <Text style={styles.text}>$</Text>
  </>
);
