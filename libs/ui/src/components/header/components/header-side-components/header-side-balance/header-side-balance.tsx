import React, { FC } from 'react';

import { ViewStyleProps } from '../../../../../interfaces/style.interface';
import { Column } from '../../../../column/column';
import { Dynamics } from '../../../../dynamics/dynamics';
import { Row } from '../../../../row/row';
import { MainText } from '../../../../text/text';

import { styles } from './header-side-balance.styles';

interface Props {
  style?: ViewStyleProps;
}

export const HeaderSideBalance: FC<Props> = ({ style }) => (
  <Column style={[styles.root, style]}>
    <MainText style={styles.title}>Total balance</MainText>
    <Row style={styles.wrapper}>
      <Dynamics value="1,345.98" percent={false} style={styles.amount} />
      <Dynamics value="10.2" />
    </Row>
    <Row>
      <MainText style={styles.balance}>401 987.01</MainText>
      <MainText style={styles.currency}>$</MainText>
    </Row>
  </Column>
);
