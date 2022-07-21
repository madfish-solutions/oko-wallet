import React, { FC } from 'react';

import { Button } from '../../../components/button/button';
import { Row } from '../../../components/row/row';

import { FooterButtons } from './modal-footer-buttons.interface';
import { styles } from './modal-footer-buttons.styles';

export const ModalFooterButtons: FC<FooterButtons> = ({
  isSubmitDisabled,
  submitTitle,
  onSubmitPress,
  onCancelPress
}) => (
  <Row>
    <Button style={styles.cancelButton} theme="primary" size="large" title="Cancel" onPress={onCancelPress} />
    <Button disabled={isSubmitDisabled} theme="secondary" size="large" title={submitTitle} onPress={onSubmitPress} />
  </Row>
);
