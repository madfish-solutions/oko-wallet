import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '../../../hooks/use-navigation.hook';

import { styles } from './header-title.styles';

interface Props {
  text: string;
}

export const HeaderTitle: FC<Props> = ({ text }) => {
  const { goBack } = useNavigation();

  return (
    <View style={styles.root}>
      {/* Add goBack svg */}
      <Text style={styles.icon} onPress={goBack}>
        go-back
      </Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
