import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';

import { Back } from '../back';

import { TitleStyles } from './title.styles';

type TitleProps = {
  style?: StyleProp<TextStyle>;
};

export const Title: React.FC<TitleProps> = ({ children }) => {
  const { canGoBack } = useNavigation();

  return (
    <View style={TitleStyles.root}>
      {canGoBack() && <Back style={TitleStyles.back} />}
      <Text style={TitleStyles.title}>{children}</Text>
    </View>
  );
};
