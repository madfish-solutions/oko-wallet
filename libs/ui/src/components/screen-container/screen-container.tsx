import React, { FC } from 'react';
import { StyleProp, ViewStyle, ScrollView, ScrollViewProps } from 'react-native';

import { ScreenContainerStyles } from './screen-container.styles';

type Props = {
  style?: StyleProp<ViewStyle>;
} & ScrollViewProps;

export const ScreenContainer: FC<Props> = ({ children, style, ...props }) => (
  <ScrollView {...props} style={[ScreenContainerStyles.root, style]}>
    {children}
  </ScrollView>
);
