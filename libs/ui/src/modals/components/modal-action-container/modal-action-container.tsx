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
}

export const ModalActionContainer: FC<Props> = ({
  screenTitle,
  children,
  submitTitle,
  cancelTitle,
  isSubmitDisabled,
  onSubmitPress,
  onCancelPress,
  style
}) => (
  <ModalContainer screenTitle={screenTitle} isBackButton>
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
