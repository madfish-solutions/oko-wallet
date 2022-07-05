import React, { FC } from 'react';
import { Text } from 'react-native';

import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { Column } from '../../../column/column';
import { Dynamics } from '../../../dynamics/dynamics';
import { Row } from '../../../row/row';

import { styles } from './header-side-balance.styles';

interface Props {
  style?: ViewStyleProps;
}

export const HeaderSideBalance: FC<Props> = ({ style }) => (
  <Column style={[styles.root, style]}>
    <Text style={styles.title}>Total balance</Text>
    <Row style={styles.wrapper}>
      <Dynamics value="1,345.98" percent={false} style={styles.amount} />
      <Dynamics value="10.2" />
    </Row>
    <Row>
      <Text style={styles.balance}>401 987.01</Text>
      <Text style={styles.currency}>$</Text>
    </Row>
  </Column>
);
