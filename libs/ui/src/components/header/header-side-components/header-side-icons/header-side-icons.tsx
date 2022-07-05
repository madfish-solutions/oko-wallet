import React, { FC } from 'react';

import { StylePropsType } from '../../../../interfaces/style.interface';
import { Row } from '../../../row/row';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';
import { HeaderIconsProps } from '../../header.interface';

import { styles } from './header-side-icons.styles';

interface Props extends Required<HeaderIconsProps> {
  style?: StylePropsType;
}

export const HeaderSideIcons: FC<Props> = ({ icons, style }) => (
  <Row style={style}>
    {icons.map(
      (name, idx) => name && <TouchableIcon key={name} name={name} style={idx !== icons.length - 1 && styles.icon} />
    )}
  </Row>
);
