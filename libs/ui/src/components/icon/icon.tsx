import React, { FC, useMemo } from 'react';
import { View } from 'react-native';

import { getCustomSize } from '../../styles/format-size';

import { iconNameMap } from './icon-name-map';
import { IconProps } from './icon.interface';

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
