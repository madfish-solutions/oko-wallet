import { RouteProp, useRoute } from '@react-navigation/native';
import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { View, Pressable } from 'react-native';

import { ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { TestIDProps } from '../../../../interfaces/test-id.props';
import { Row } from '../../../row/row';
import { Text } from '../../../text/text';
import { useNavigationFromSensetiveScreens } from '../../hooks/use-navigation-from-sensetive-screens.hook';
import { HeaderBackButton } from '../header-back-button/header-back-button';
import { HeaderCloseButton } from '../header-close-button/header-close-button';

import { styles } from './header-title.styles';

interface Props extends TestIDProps {
  name: string;
  isBackButton?: boolean;
  onCloseButtonPress?: OnEventFn<void>;
}

export const HeaderTitle: FC<Props> = ({ name, isBackButton = false, onCloseButtonPress, testID }) => {
  const { name: routeName } = useRoute<RouteProp<ScreensParamList>>();

  const { checkScreenAndRedirect } = useNavigationFromSensetiveScreens();
  const { goBack } = useNavigation();

  const onEmptySpacePress = () => checkScreenAndRedirect(routeName, goBack);

  return (
    <View style={styles.root}>
      <Pressable onPress={onEmptySpacePress} style={styles.backgroundSpace} />
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
