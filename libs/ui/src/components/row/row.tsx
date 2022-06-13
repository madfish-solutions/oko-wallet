import React, { FC } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';

import { RowStyles } from './row.styles';

interface Props {
  style?: StyleProp<TextStyle>;
}

export const Row: FC<Props> = ({ style, children }) => <View style={[RowStyles.root, style]}>{children}</View>;
