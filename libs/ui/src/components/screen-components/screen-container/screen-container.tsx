import React, { FC } from 'react';

import { ViewStyleProps } from '../../../interfaces/style.interface';
import { Column } from '../../column/column';

import { ScreenContainerThemesEnum } from './enums';
import { styles } from './screen-container.styles';

interface Props {
  style?: ViewStyleProps;
  theme?: ScreenContainerThemesEnum;
}

export const ScreenContainer: FC<Props> = ({ children, theme = ScreenContainerThemesEnum.Primary, style }) => (
  <Column style={[styles.root, styles[theme], style]}>{children}</Column>
);
