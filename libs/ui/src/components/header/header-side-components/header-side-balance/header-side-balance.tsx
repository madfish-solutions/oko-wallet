import React, { FC } from 'react';
import { Text } from 'react-native';

import { StylePropsType } from '../../../../interfaces/style.interface';
import { Column } from '../../../column/column';
import { Row } from '../../../row/row';

import { styles } from './header-side-balance.styles';

interface Props {
  style?: StylePropsType;
}

export const HeaderSideBalance: FC<Props> = ({ style }) => (
  <Column style={[styles.root, style]}>
    <Text style={styles.title}>Total balance</Text>
    <Row style={styles.wrapper}>
      <Text style={[styles.dynamic, styles.amount]}>+ 1,345.98 $</Text>
      <Text style={styles.dynamic}>10.2%</Text>
    </Row>
    <Row>
      <Text style={styles.balance}>401 987.01</Text>
      <Text style={styles.currency}>$</Text>
    </Row>
  </Column>
);
