import React, { FC } from 'react';
import { StyleProp, ViewStyle, ScrollView } from 'react-native';

import { ScreenContainerStyles } from './screen-container.styles';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const ScreenContainer: FC<Props> = ({ children, style }) => (
  <ScrollView style={[ScreenContainerStyles.root, style]}> {children} </ScrollView>
);
