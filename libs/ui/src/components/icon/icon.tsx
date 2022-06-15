import React, { FC, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

import { getCustomSize } from '../../styles/format-size';

import { iconNameMap } from './icon-name-map';
import { IconNameEnum } from './icon-name.enum';

export interface IconProps {
  name: IconNameEnum;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  iconStyle?: ViewStyle;
}

export const Icon: FC<IconProps> = ({
  name,
  size = getCustomSize(3),
  width = size,
  height = size,
  color,
  iconStyle
}) => {
  const Svg = useMemo(() => iconNameMap[name], [name]);

  return (
    <View style={iconStyle}>
      <Svg width={width} height={height} color={color} />
    </View>
  );
};
