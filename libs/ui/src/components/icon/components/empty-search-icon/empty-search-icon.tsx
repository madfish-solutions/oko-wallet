import React, { FC } from 'react';

import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { getCustomSize } from '../../../../styles/format-size';
import { Icon } from '../../icon';
import { IconNameEnum } from '../../icon-name.enum';

import { styles } from './empty-search-icon.styles';

interface Props {
  style?: ViewStyleProps;
}

export const EmptySearchIcon: FC<Props> = ({ style }) => (
  <Icon name={IconNameEnum.EmptySearch} size={getCustomSize(36)} iconStyle={[styles.root, style]} />
);
