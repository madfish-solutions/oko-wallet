import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, TextInputKeyPressEventData, NativeSyntheticEvent } from 'react-native';
import { isMobile, isWeb } from 'shared';

import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { PasswordInput } from '../../../components/text-input/components/password-input/password-input';
import { requiredFieldError } from '../../../constants/form-errors';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useConfirmAccess } from '../../../hooks/use-confirm-access.hook';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useBiometricEnabledSelector } from '../../../store/settings/settings.selectors';
import { useSelectedAccountPublicKeyHashSelector } from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { ModalActionsContainer } from '../../components/modal-actions-container/modal-actions-container';

import { styles } from './confirm-access.styles';
import { ConfirmAccessTestIDs } from './tests/confirm-access.test-ids';

interface Password {
  password: string;
}

const defaultValues = { password: '' };

export const ConfirmAccess: FC = () => {
  const { params: routeParams } = useRoute<RouteProp<ScreensParamList, ScreensEnum.ConfirmAccess>>();
  const { navigate } = useNavigation();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();

  const isBiometricEnabled = useBiometricEnabledSelector();

  const {
    control,
    watch,
    handleSubmit,
    setFocus,
    formState: { errors }
  } = useForm<Password>({
    mode: 'onChange',
    defaultValues
  });
  const { unlock, isLocked, errorMessage, setErrorMessage } = useConfirmAccess();

  const password = watch('password');

  const onUnlock = () => unlock(password);

  useEffect(() => {
    setErrorMessage('');
  }, [password]);

  useEffect(() => {
    if (!isLocked) {
      const { screen, options } = routeParams.destination;

      switch (screen) {
        case ScreensEnum.RevealPrivateKey: {
          return navigate(ScreensEnum.RevealPrivateKey, { publicKeyHash: options?.publicKeyHash ?? publicKeyHash });
        }
        default: {
          return navigate(ScreensEnum.RevealSeedPhrase);
        }
      }
    }
  }, [isLocked]);

  useEffect(() => void (isWeb && setFocus('password')), []);

  const onEnterPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
    isWeb ? event.nativeEvent.key === 'Enter' && onUnlock() : undefined;

  return (
    <ModalActionsContainer
      screenTitle="Confirm Access"
      onSubmitPress={handleSubmit(onUnlock)}
      submitTitle={routeParams.submitButtonText}
      isCancelButton={false}
      testID={ConfirmAccessTestIDs.ConfirmAccessTitle}
      testIDButton={ConfirmAccessTestIDs.RevealSensitiveDataButton}
    >
      <Row style={styles.root}>
        <Controller
          control={control}
          name="password"
          rules={{ required: requiredFieldError }}
          render={({ field }) => (
            <PasswordInput
              field={field}
              label="Password"
              prompt={routeParams.descriptionText}
              error={errorMessage || errors.password?.message}
              onKeyPress={onEnterPress}
              onSubmitEditing={onUnlock}
              testID={ConfirmAccessTestIDs.PasswordInput}
              style={styles.input}
            />
          )}
        />
        {isMobile && isBiometricEnabled && (
          <Pressable style={styles.iconContainer}>
            <Icon name={IconNameEnum.FaceId} iconStyle={styles.icon} size={getCustomSize(4)} />
          </Pressable>
        )}
      </Row>
    </ModalActionsContainer>
  );
};
