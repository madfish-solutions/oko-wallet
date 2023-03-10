import React, { FC, PropsWithChildren, RefObject } from 'react';
import { View, ScrollView } from 'react-native';

import { ViewStyleProps } from '../../../interfaces/style.interface';
import { TestIDProps } from '../../../interfaces/test-id.props';
import { ModalContainer } from '../modal-container/modal-container';
import { ModalFooterButtons } from '../modal-footer-buttons/modal-footer-buttons';
import { FooterButtons } from '../modal-footer-buttons/modal-footer-buttons.interface';

import { styles } from './modal-actions-container.styles';

type Props = PropsWithChildren<{
  screenTitle: string;
  isBackButton?: boolean;
  style?: ViewStyleProps;
  scrollViewRef?: RefObject<ScrollView>;
  testIDButton?: string;
}> &
  FooterButtons &
  TestIDProps;

export const ModalActionsContainer: FC<Props> = ({
  screenTitle,
  submitTitle,
  cancelTitle,
  isSubmitDisabled,
  isCancelDisabled,
  onSubmitPress,
  onCancelPress,
  isBackButton = false,
  scrollViewRef,
  isCancelButton,
  style,
  children,
  testIDButton,
  testID
}) => (
  <ModalContainer screenTitle={screenTitle} isBackButton={isBackButton} testID={testID}>
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
        isCancelButton={isCancelButton}
        testID={testIDButton}
      />
    </View>
  </ModalContainer>
);
