import React, { FC } from 'react';

import { getCustomSize } from '../../../../styles/format-size';
import { Icon } from '../../icon';
import { IconNameEnum } from '../../icon-name.enum';

import { styles } from './empty-search-icon.styles';

export const EmptySearchIcon: FC = () => (
  <Icon name={IconNameEnum.EmptySearch} size={getCustomSize(20)} iconStyle={styles.root} />
);
