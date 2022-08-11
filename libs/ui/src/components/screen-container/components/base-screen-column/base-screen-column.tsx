import React, { FC } from 'react';

import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { Column } from '../../../column/column';

import { styles } from './base-screen-column.styles';

interface Props {
  style?: ViewStyleProps;
}

export const BaseScreenColumn: FC<Props> = ({ children, style }) => (
  <Column style={[styles.root, style]}>{children}</Column>
);
