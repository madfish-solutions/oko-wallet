import React, { FC } from 'react';

import { Button } from '../../../components/button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../../../components/button/enums';
import { Row } from '../../../components/row/row';
import { ViewStyleProps } from '../../../interfaces/style.interface';

import { FooterButtons } from './modal-footer-buttons.interface';
import { styles } from './modal-footer-buttons.styles';

interface Props extends FooterButtons {
  style?: ViewStyleProps;
}

export const ModalFooterButtons: FC<Props> = ({
  isSubmitDisabled,
  isCancelDisabled,
  submitTitle,
  cancelTitle = 'Cancel',
  onSubmitPress,
  onCancelPress,
  style
}) => (
  <Row style={[styles.root, style]}>
    <Button
      disabled={isCancelDisabled}
      theme={ButtonThemesEnum.Primary}
      size={ButtonSizeEnum.Large}
      title={cancelTitle}
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
