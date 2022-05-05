import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity } from 'react-native';

import { BackStyles } from './back.styles';

type BackProps = {
  style?: StyleProp<TextStyle>;
};

export const Back: React.FC<BackProps> = ({ style }) => {
  const { goBack } = useNavigation();

  const handleBack = () => goBack();

  return (
    <TouchableOpacity onPress={handleBack} style={[BackStyles.root, style]}>
      <Text>{'< Back'}</Text>
    </TouchableOpacity>
  );
};
