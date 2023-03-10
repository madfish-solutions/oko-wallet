import { useNavigation } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';

import { Button } from '../../../components/button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../../../components/button/enums';
import { Row } from '../../../components/row/row';
import { ViewStyleProps } from '../../../interfaces/style.interface';
import { TestIDProps } from '../../../interfaces/test-id.props';

import { FooterButtons } from './modal-footer-buttons.interface';
import { styles } from './modal-footer-buttons.styles';

interface Props extends FooterButtons, TestIDProps {
  style?: ViewStyleProps;
}

export const ModalFooterButtons: FC<Props> = ({
  isSubmitDisabled,
  isCancelDisabled,
  submitTitle,
  cancelTitle = 'Cancel',
  isCancelButton = true,
  onSubmitPress,
  onCancelPress,
  style,
  testID
}) => {
  const { goBack } = useNavigation();

  return (
    <Row style={[styles.root, style]}>
      {isCancelButton && (
        <Button
          disabled={isCancelDisabled}
          theme={ButtonThemesEnum.Primary}
          size={ButtonSizeEnum.Large}
          title={cancelTitle}
          onPress={onCancelPress ?? goBack}
          style={[styles.button, styles.cancelButton]}
        />
      )}
      {isDefined(onSubmitPress) && (
        <Button
          disabled={isSubmitDisabled}
          theme={ButtonThemesEnum.Secondary}
          size={ButtonSizeEnum.Large}
          title={submitTitle}
          onPress={onSubmitPress}
          style={styles.button}
          testID={testID}
        />
      )}
    </Row>
  );
};
