import React, { FC, PropsWithChildren } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';

import { RowStyles } from './row.styles';

type Props = PropsWithChildren<{
  style?: StyleProp<TextStyle>;
}>;

export const Row: FC<Props> = ({ style, children }) => <View style={[RowStyles.root, style]}>{children}</View>;
