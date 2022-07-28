import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { colors } from '../../styles/colors';
import { Icon } from '../icon/icon';
import { IconProps } from '../icon/icon.interface';

interface Props extends IconProps {
  onPress?: OnEventFn<GestureResponderEvent>;
  disabled?: boolean;
  style?: ViewStyleProps;
}

export const TouchableIcon: FC<Props> = ({ onPress, style, name, disabled, width, height, size, color, iconStyle }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled} style={style}>
    <Icon
      name={name}
      width={width}
      height={height}
      size={size}
      color={isDefined(disabled) ? colors.bgGrey5 : color}
      iconStyle={iconStyle}
    />
  </TouchableOpacity>
);
