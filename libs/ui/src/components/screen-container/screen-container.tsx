import React, { FC } from 'react';
import { StyleProp, ViewStyle, ScrollView, ScrollViewProps } from 'react-native';

import { ScreenContainerStyles } from './screen-container.styles';

interface Props extends ScrollViewProps {
  style?: StyleProp<ViewStyle>;
}

export const ScreenContainer: FC<Props> = ({ style, children, ...props }) => (
  <ScrollView {...props} style={[ScreenContainerStyles.root, style]}>
    {children}
  </ScrollView>
);
