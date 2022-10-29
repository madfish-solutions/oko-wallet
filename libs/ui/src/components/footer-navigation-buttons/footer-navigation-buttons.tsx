import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';

import { Button } from '../button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../button/enums';
import { Row } from '../row/row';

import { styles } from './footer-navigation-buttons.styles';
import { FooterNavigationTestIDs } from './footer-navigation-testids';

export interface FooterButtonsInterface {
  submitTitle: string;
  isSubmitDisabled?: boolean;
  onSubmitPress: OnEventFn<GestureResponderEvent>;
  onCancelPress: OnEventFn<GestureResponderEvent>;
}

export const FooterNavigationButtons: FC<FooterButtonsInterface> = ({
  isSubmitDisabled,
  submitTitle,
  onSubmitPress,
  onCancelPress
}) => (
  <Row style={styles.root}>
    <Button
      style={[styles.cancelButton, styles.button]}
      theme={ButtonThemesEnum.Primary}
      size={ButtonSizeEnum.Large}
      title="Cancel"
      onPress={onCancelPress}
      testID={FooterNavigationTestIDs.cancelButton}
    />
    <Button
      style={styles.button}
      disabled={isSubmitDisabled}
      theme={ButtonThemesEnum.Secondary}
      size={ButtonSizeEnum.Large}
      title={submitTitle}
      onPress={onSubmitPress}
      testID={FooterNavigationTestIDs.nextButton}
    />
  </Row>
);
