import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';

import { Icon } from '../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../components/icon/icon-name.enum';
import { IconWithBorderEnum } from '../../../../../components/icon-with-border/enums';
import { IconWithBorder } from '../../../../../components/icon-with-border/icon-with-border';
import { getCustomSize } from '../../../../../styles/format-size';

import { styles } from './network-image.styles';

interface Props {
  iconName?: IconNameEnum;
  type?: IconWithBorderEnum;
}

export const NetworkImage: FC<Props> = ({ iconName, type }) => {
  const isQuaternary = type === IconWithBorderEnum.Quaternary;
  const iconSize = isQuaternary && isDefined(iconName) ? getCustomSize(6) : getCustomSize(3);

  return (
    <IconWithBorder type={type} style={styles.root}>
      <Icon name={iconName ?? IconNameEnum.NetworkFallback} size={iconSize} />
    </IconWithBorder>
  );
};
