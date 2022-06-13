import React, { FC, useMemo } from 'react';
import { ViewStyle } from 'react-native';

import { getCustomSize } from '../../styles/format-size';

// import { formatSize } from '../../styles/format-size';
import { iconNameMap } from './icon-name-map';
import { IconNameEnum } from './icon-name.enum';

export interface IconProps {
  name: IconNameEnum;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  style?: ViewStyle;
}

export const Icon: FC<IconProps> = ({ name, size = getCustomSize(3), width = size, height = size, color }) => {
  const Svg = useMemo(() => iconNameMap[name], [name]);
  console.log(Svg, 'svg');
  console.log(name);
  console.log(iconNameMap[name], 'icon');

  return <Svg width={width} height={height} color={color} />;
};
