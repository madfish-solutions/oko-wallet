import { OnEventFn } from '@rnw-community/shared';
import React, { FC, PropsWithChildren, RefObject } from 'react';
import { GestureResponderEvent, ScrollView, View } from 'react-native';

import { Button } from '../../../components/button/button';
import { ButtonThemesEnum } from '../../../components/button/enums';
import { ViewStyleProps } from '../../../interfaces/style.interface';
import { ModalContainer } from '../modal-container/modal-container';

import { styles } from './modal-action-container.styles';

type Props = PropsWithChildren<{
  screenTitle: string;
  buttonTitle: string;
  onPress: OnEventFn<GestureResponderEvent>;
  buttonTheme?: ButtonThemesEnum;
  contentContainerStyle?: ViewStyleProps;
  isBackButton?: boolean;
  scrollViewRef?: RefObject<ScrollView>;
}>;

export const ModalActionContainer: FC<Props> = ({
  screenTitle,
  onPress,
  buttonTitle,
  buttonTheme = ButtonThemesEnum.Primary,
  children,
  contentContainerStyle,
  scrollViewRef,
  isBackButton = false
}) => (
  <ModalContainer screenTitle={screenTitle} isBackButton={isBackButton}>
    <ScrollView ref={scrollViewRef} contentContainerStyle={contentContainerStyle} style={styles.root}>
      <View style={styles.children}>{children}</View>
    </ScrollView>

    <View style={styles.button}>
      <Button title={buttonTitle} onPress={onPress} theme={buttonTheme} />
    </View>
  </ModalContainer>
);
