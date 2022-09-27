import React, { FC } from 'react';
import { Text, View, Pressable } from 'react-native';

import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Row } from '../../../row/row';
import { HeaderBackButton } from '../header-back-button/header-back-button';
import { HeaderCloseButton } from '../header-close-button/header-close-button';

import { styles } from './header-title.styles';

interface Props {
  name: string;
  isBackButton?: boolean;
}

export const HeaderTitle: FC<Props> = ({ name, isBackButton = false }) => {
  const { goBack } = useNavigation();

  return (
    <View style={styles.root}>
      <Pressable onPress={goBack} style={styles.backgroundSpace} />
      <Row style={styles.container}>
        {isBackButton && <HeaderBackButton />}
        <Text style={styles.title} numberOfLines={1} lineBreakMode="tail">
          {name}
        </Text>
        <View style={styles.closeButton}>
          <HeaderCloseButton />
        </View>
      </Row>
    </View>
  );
};
