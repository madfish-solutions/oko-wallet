import React, { FC } from 'react';

import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { ViewStyleProps } from '../../../../interfaces/style.interface';

import { styles } from './header-side-icons.styles';

interface Props {
  style?: ViewStyleProps;
  icons: IconNameEnum[];
}

export const HeaderSideIcons: FC<Props> = ({ icons, style }) => (
  <Row style={style}>
    {icons.map(
      (name, idx) => name && <TouchableIcon key={name} name={name} style={idx !== icons.length - 1 && styles.icon} />
    )}
  </Row>
);
