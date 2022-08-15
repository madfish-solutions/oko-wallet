import React, { FC } from 'react';

import { ViewStyleProps } from '../../../interfaces/style.interface';
import { Column } from '../../column/column';

import { styles } from './screen-container.styles';

interface Props {
  style?: ViewStyleProps;
}

export const ScreenContainer: FC<Props> = ({ children, style }) => (
  <Column style={[styles.root, style]}>{children}</Column>
);
