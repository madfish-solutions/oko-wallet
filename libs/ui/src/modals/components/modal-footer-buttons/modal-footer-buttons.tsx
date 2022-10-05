import React, { FC } from 'react';

import { Button } from '../../../components/button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../../../components/button/enums';
import { Row } from '../../../components/row/row';

import { FooterButtons } from './modal-footer-buttons.interface';
import { styles } from './modal-footer-buttons.styles';

export const ModalFooterButtons: FC<FooterButtons> = ({
  isSubmitDisabled,
  submitTitle,
  onSubmitPress,
  onCancelPress
}) => (
  <Row style={styles.root}>
    <Button
      theme={ButtonThemesEnum.Primary}
      size={ButtonSizeEnum.Large}
      title="Cancel"
      onPress={onCancelPress}
      style={[styles.button, styles.cancelButton]}
    />
    <Button
      disabled={isSubmitDisabled}
      theme={ButtonThemesEnum.Secondary}
      size={ButtonSizeEnum.Large}
      title={submitTitle}
      onPress={onSubmitPress}
      style={styles.button}
    />
  </Row>
);
