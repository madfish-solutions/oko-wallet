import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { View, Pressable } from 'react-native';

import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { TestIDProps } from '../../../../interfaces/test-id.props';
import { Row } from '../../../row/row';
import { Text } from '../../../text/text';
import { HeaderBackButton } from '../header-back-button/header-back-button';
import { HeaderCloseButton } from '../header-close-button/header-close-button';

import { styles } from './header-title.styles';

interface Props extends TestIDProps {
  name: string;
  isBackButton?: boolean;
  onCloseButtonPress?: OnEventFn<void>;
}

export const HeaderTitle: FC<Props> = ({ name, isBackButton = false, onCloseButtonPress, testID }) => {
  const { goBack } = useNavigation();

  return (
    <View style={styles.root}>
      <Pressable onPress={goBack} style={styles.backgroundSpace} />
      <Row style={styles.container}>
        {isBackButton && <HeaderBackButton />}
        <Text style={styles.title} numberOfLines={1} lineBreakMode="tail" testID={testID}>
          {name}
        </Text>
        <View style={styles.closeButton}>
          <HeaderCloseButton onCloseButtonPress={onCloseButtonPress} />
        </View>
      </Row>
    </View>
  );
};
