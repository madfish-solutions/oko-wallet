import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { StylePropsType } from '../../interfaces/style.interface';
import { Icon } from '../icon/icon';
import { IconProps } from '../icon/icon.interface';

interface Props extends IconProps {
  onPress?: () => void;
  style?: StylePropsType;
}

export const TouchableIcon: FC<Props> = ({ onPress, style, ...iconProps }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Icon {...iconProps} />
  </TouchableOpacity>
);
