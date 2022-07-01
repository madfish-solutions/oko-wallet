import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { Icon } from '../icon/icon';
import { IconProps } from '../icon/icon.interface';

interface Props extends IconProps {
  onPress?: () => void;
}

export const TouchableIcon: FC<Props> = ({ onPress, ...iconProps }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon {...iconProps} />
  </TouchableOpacity>
);
