import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { TitleStyles } from './title.styles';

interface Props {
  text: string;
}

export const Title: FC<Props> = ({ text }) => (
  <View style={TitleStyles.root}>
    {/* Add goBack svg */}
    <Text style={TitleStyles.icon}>CC</Text>
    <Text style={TitleStyles.text}>{text}</Text>
  </View>
);
