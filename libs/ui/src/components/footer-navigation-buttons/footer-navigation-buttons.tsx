import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';

import { Button } from '../button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../button/enums';
import { Row } from '../row/row';

import { styles } from './footer-navigation-buttons.styles';

export interface FooterButtonsInterface {
  submitTitle: string;
  isSubmitDisabled?: boolean;
  onSubmitPress: OnEventFn<GestureResponderEvent>;
  onCancelPress: OnEventFn<GestureResponderEvent>;
  submitButtonTestID?: string;
  cancelButtonTestID?: string;
}

export const FooterNavigationButtons: FC<FooterButtonsInterface> = ({
  isSubmitDisabled,
  submitTitle,
  onSubmitPress,
  onCancelPress,
  submitButtonTestID,
  cancelButtonTestID
}) => (
  <Row style={styles.root}>
    <Button
      style={[styles.cancelButton, styles.button]}
      theme={ButtonThemesEnum.Primary}
      size={ButtonSizeEnum.Large}
      title="Cancel"
      onPress={onCancelPress}
      testID={cancelButtonTestID}
    />
    <Button
      style={styles.button}
      disabled={isSubmitDisabled}
      theme={ButtonThemesEnum.Secondary}
      size={ButtonSizeEnum.Large}
      title={submitTitle}
      onPress={onSubmitPress}
      testID={submitButtonTestID}
    />
  </Row>
);
