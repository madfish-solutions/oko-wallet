import React, { FC } from 'react';

import { StylePropsType } from '../../../../interfaces/style.interface';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Row } from '../../../row/row';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './header-side-icons.styles';

interface Props {
  icons: [IconNameEnum, IconNameEnum?, IconNameEnum?];
  style?: StylePropsType;
}

export const HeaderSideIcons: FC<Props> = ({ icons, style }) => (
  <Row style={style}>
    {icons.map(
      (name, idx) => name && <TouchableIcon key={name} name={name} style={idx !== icons.length - 1 && styles.icon} />
    )}
  </Row>
);
