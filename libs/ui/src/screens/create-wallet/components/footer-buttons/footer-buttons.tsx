import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';

import { Button } from '../../../../components/button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../../../../components/button/enums';
import { Row } from '../../../../components/row/row';

import { styles } from './footer-buttons.styles';

export interface FooterButtonsInterface {
  submitTitle: string;
  isSubmitDisabled?: boolean;
  onSubmitPress: OnEventFn<GestureResponderEvent>;
  onCancelPress: OnEventFn<GestureResponderEvent>;
}

export const FooterButtons: FC<FooterButtonsInterface> = ({
  isSubmitDisabled,
  submitTitle,
  onSubmitPress,
  onCancelPress
}) => (
  <Row style={styles.root}>
    <Button
      style={styles.cancelButton}
      theme={ButtonThemesEnum.Primary}
      size={ButtonSizeEnum.Large}
      title="Cancel"
      onPress={onCancelPress}
    />
    <Button
      disabled={isSubmitDisabled}
      theme={ButtonThemesEnum.Secondary}
      size={ButtonSizeEnum.Large}
      title={submitTitle}
      onPress={onSubmitPress}
    />
  </Row>
);
