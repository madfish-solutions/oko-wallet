import React from 'react';
import { Text, View } from 'react-native';

import { TitleStyles } from './title.styles';

type TitleProps = {
  description?: string
};

export const Title: React.FC<TitleProps> = ({
  description,
  children,
}) => (
  <View style={TitleStyles.root}>
    <Text style={[TitleStyles.title, description ? TitleStyles.titleMarginBottom : null]}>
      {children}
    </Text>
    {description && (
      <Text style={TitleStyles.description}>{description}</Text>
    )}
  </View>
);
