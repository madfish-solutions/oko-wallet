import React, { FC, PropsWithChildren } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';

import { styles } from './column.styles';

type Props = PropsWithChildren<{
  style?: StyleProp<TextStyle>;
}>;

export const Column: FC<Props> = ({ style, children }) => <View style={[styles.root, style]}>{children}</View>;
