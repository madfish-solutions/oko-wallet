import React, { FC } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';

type Props = {
  style?: StyleProp<TextStyle>;
};

export const Column: FC<Props> = ({ style, children }) => <View style={style}>{children}</View>;
