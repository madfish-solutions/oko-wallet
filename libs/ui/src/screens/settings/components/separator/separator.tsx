import React, { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { Divider } from '../../../../components/divider/divider';
import { getCustomSize } from '../../../../styles/format-size';

import { styles } from './separator.styles';

interface Props {
  style?: StyleProp<TextStyle>;
}

export const Separator: FC<Props> = ({ style }) => <Divider size={getCustomSize(0.125)} style={[styles.root, style]} />;
