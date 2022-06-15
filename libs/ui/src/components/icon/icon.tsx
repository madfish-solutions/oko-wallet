import React, { FC, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

import { getCustomSize } from '../../styles/format-size';

import { iconNameMap } from './icon-name-map';
import { IconNameEnum } from './icon-name.enum';

interface Props {
  name: IconNameEnum;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  style?: ViewStyle;
}

export const Icon: FC<Props> = ({ name, size = getCustomSize(3), width = size, height = size, color, style }) => {
  const Svg = useMemo(() => iconNameMap[name], [name]);

  return (
    <View style={style}>
      <Svg width={width} height={height} color={color} />
    </View>
  );
};
