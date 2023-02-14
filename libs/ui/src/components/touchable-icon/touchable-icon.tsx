import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { TestIDProps } from '../../interfaces/test-id.props';
import { colors } from '../../styles/colors';
import { Icon } from '../icon/icon';
import { IconProps } from '../icon/icon.interface';

interface Props extends IconProps, TestIDProps {
  onPress?: OnEventFn<GestureResponderEvent>;
  disabled?: boolean;
  style?: ViewStyleProps;
}

export const TouchableIcon: FC<Props> = ({
  onPress,
  style,
  name,
  disabled = false,
  width,
  height,
  size,
  color,
  iconStyle,
  testID
}) => (
  <TouchableOpacity onPress={onPress} disabled={disabled} style={style} testID={testID}>
    <Icon
      name={name}
      width={width}
      height={height}
      size={size}
      color={disabled ? colors.bgGrey5 : color}
      iconStyle={iconStyle}
    />
  </TouchableOpacity>
);
