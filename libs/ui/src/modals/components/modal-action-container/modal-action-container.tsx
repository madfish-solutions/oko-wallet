import React, { FC } from 'react';
import { View } from 'react-native';

import { ModalContainer } from '../modal-container/modal-container';
import { ModalFooterButtons } from '../modal-footer-buttons/modal-footer-buttons';
import { FooterButtons } from '../modal-footer-buttons/modal-footer-buttons.interface';

import { styles } from './modal-action-container.styles';

interface Props extends FooterButtons {
  screenTitle: string;
}

export const ModalActionContainer: FC<Props> = ({
  screenTitle,
  children,
  submitTitle,
  isSubmitDisabled,
  onSubmitPress,
  onCancelPress
}) => (
  <ModalContainer screenTitle={screenTitle} isBackButton>
    <View style={styles.root}>
      <View style={styles.content}>{children}</View>

      <ModalFooterButtons
        submitTitle={submitTitle}
        onCancelPress={onCancelPress}
        onSubmitPress={onSubmitPress}
        isSubmitDisabled={isSubmitDisabled}
      />
    </View>
  </ModalContainer>
);
