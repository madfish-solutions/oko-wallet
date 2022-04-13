import React from 'react';
import { View } from 'react-native';

import { WrapperStyles } from './wrapper.styles';

export const Wrapper: React.FC = ({
  children,
}) => (
  <View style={WrapperStyles.root}>
    {children}
  </View>
);
