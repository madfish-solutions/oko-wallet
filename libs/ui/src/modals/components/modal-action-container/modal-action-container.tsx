import React, { FC, PropsWithChildren, RefObject } from 'react';
import { View, ScrollView } from 'react-native';

import { ViewStyleProps } from '../../../interfaces/style.interface';
import { ModalContainer } from '../modal-container/modal-container';
import { ModalFooterButtons } from '../modal-footer-buttons/modal-footer-buttons';
import { FooterButtons } from '../modal-footer-buttons/modal-footer-buttons.interface';

import { styles } from './modal-action-container.styles';

type Props = PropsWithChildren<{
  screenTitle: string;
  isBackButton?: boolean;
  style?: ViewStyleProps;
  scrollViewRef?: RefObject<ScrollView>;
}> &
  FooterButtons;

export const ModalActionContainer: FC<Props> = ({
  screenTitle,
  submitTitle,
  cancelTitle,
  isSubmitDisabled,
  isCancelDisabled,
  onSubmitPress,
  onCancelPress,
  isBackButton = true,
  scrollViewRef,
  style,
  children
}) => (
  <ModalContainer screenTitle={screenTitle} isBackButton={isBackButton}>
    <View style={[styles.root, style]}>
      <ScrollView ref={scrollViewRef} style={styles.content}>
        {children}
      </ScrollView>

      <ModalFooterButtons
        submitTitle={submitTitle}
        onCancelPress={onCancelPress}
        onSubmitPress={onSubmitPress}
        isSubmitDisabled={isSubmitDisabled}
        isCancelDisabled={isCancelDisabled}
        cancelTitle={cancelTitle}
      />
    </View>
  </ModalContainer>
);
