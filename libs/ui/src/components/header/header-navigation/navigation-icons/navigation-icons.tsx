import React, { FC } from 'react';

import { StylePropsType } from '../../../../interfaces/style.interface';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Row } from '../../../row/row';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './navigation-icons.styles';

interface Props {
  style?: StylePropsType;
}

export const NavigationIcons: FC<Props> = ({ style }) => (
  <Row style={style}>
    <TouchableIcon name={IconNameEnum.Search} style={styles.icon} />
    <TouchableIcon name={IconNameEnum.Qrcode} style={styles.icon} />
    <TouchableIcon name={IconNameEnum.Qrscan} />
  </Row>
);
