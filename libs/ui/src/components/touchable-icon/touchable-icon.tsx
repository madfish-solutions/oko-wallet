import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { Icon } from '../icon/icon';
import { IconProps } from '../icon/icon.interface';

interface Props extends IconProps {
  onPress?: () => void;
  style?: ViewStyleProps;
}

export const TouchableIcon: FC<Props> = ({ onPress, style, name, width, height, size, color, iconStyle }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Icon name={name} width={width} height={height} size={size} color={color} iconStyle={iconStyle} />
  </TouchableOpacity>
);
