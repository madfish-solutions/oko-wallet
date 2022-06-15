import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { Icon, IconProps } from '../icon/icon';

interface Props extends IconProps {
  onPress?: () => void;
}

export const TouchableIcon: FC<Props> = ({ onPress, ...iconProps }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon {...iconProps} />
  </TouchableOpacity>
);
