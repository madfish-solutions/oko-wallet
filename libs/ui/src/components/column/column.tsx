import React, { FC } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';

import { styles } from './column.styles';

interface Props {
  style?: StyleProp<TextStyle>;
}

export const Column: FC<Props> = ({ style, children }) => <View style={[styles.root, style]}>{children}</View>;
