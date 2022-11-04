import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';

import { ViewStyleProps } from '../../../interfaces/style.interface';
import { ModalContainer } from '../modal-container/modal-container';
import { ModalFooterButtons } from '../modal-footer-buttons/modal-footer-buttons';
import { FooterButtons } from '../modal-footer-buttons/modal-footer-buttons.interface';

import { styles } from './modal-action-container.styles';

interface Props extends FooterButtons {
  screenTitle: string;
  style?: ViewStyleProps;
  isBackButton?: boolean;
}

export const ModalActionContainer: FC<Props> = ({
  screenTitle,
  submitTitle,
  cancelTitle,
  isSubmitDisabled,
  onSubmitPress,
  onCancelPress,
  isBackButton = true,
  style,
  children
}) => (
  <ModalContainer screenTitle={screenTitle} isBackButton={isBackButton}>
    <View style={[styles.root, style]}>
      <ScrollView style={styles.content}>{children}</ScrollView>

      <ModalFooterButtons
        submitTitle={submitTitle}
        onCancelPress={onCancelPress}
        onSubmitPress={onSubmitPress}
        isSubmitDisabled={isSubmitDisabled}
        cancelTitle={cancelTitle}
      />
    </View>
  </ModalContainer>
);
