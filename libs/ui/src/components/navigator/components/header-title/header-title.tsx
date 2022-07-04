import { useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text, View, Pressable } from 'react-native';

import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Row } from '../../../row/row';
import { HeaderCloseButton } from '../header-close-button/header-close-button';

import { styles } from './header-title.styles';

export const HeaderTitle: FC = () => {
  const { name } = useRoute();
  const { goBack } = useNavigation();

  return (
    <View style={styles.root}>
      <Pressable onPress={goBack} style={styles.backgroundSpace} />
      <Row style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <HeaderCloseButton />
      </Row>
    </View>
  );
};
