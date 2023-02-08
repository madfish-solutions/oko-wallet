import React, { FC } from 'react';
import { Line, Svg } from 'react-native-svg';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';

import { styles } from './vertircal-line.styles';

interface Props {
  height: number;
}

export const VerticalLine: FC<Props> = ({ height }) => (
  <Svg height={height} width={1} style={styles.root}>
    <Line
      stroke={colors.border2}
      strokeWidth={getCustomSize(0.25)}
      strokeDasharray="4, 2"
      x1="0"
      y1="0"
      x2="0"
      y2={height}
    />
  </Svg>
);
