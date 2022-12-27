import { isDefined } from '@rnw-community/shared';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, NativeSyntheticEvent, Pressable, TextInputKeyPressEventData, View } from 'react-native';

import { Button } from '../../components/button/button';
import { ButtonThemesEnum } from '../../components/button/enums';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Row } from '../../components/row/row';
import { TextInput } from '../../components/text-input/text-input';
import { Text } from '../../components/text/text';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useUnlock } from '../../hooks/use-unlock.hook';
import { useBiometricEnabledSelector } from '../../store/settings/settings.selectors';
import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { isMobile, isIOS, isWeb } from '../../utils/platform.utils';
import { MadFishLogo } from '../settings/components/mad-fish-logo/mad-fish-logo';

import { styles } from './unlock.styles';

interface Password {
  password: string;
}

const defaultValues = { password: '' };

const behavior = isIOS ? 'padding' : 'height';

export const UnlockApp: FC = () => {
  const isBiometricEnabled = useBiometricEnabledSelector();
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const handleTogglePasswordVisibility = () => setIsSecurePassword(prev => !prev);
  const { unlock, unlockError, setUnlockError, isLocked } = useUnlock();
  const { navigate, goBack } = useNavigation();

  const {
    control,
    watch,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitted }
  } = useForm<Password>({
    mode: 'onChange',
    defaultValues
  });

  useEffect(() => void (!isLocked && goBack()), [isLocked]);

  useEffect(() => void (isWeb && setFocus('password')), []);

  const password = watch('password');

  const onUnlock = () => unlock(password);
  const onResetWallet = () => navigate(ScreensEnum.SettingsResetWalletConfirm);

  const isSubmitDisabled = (Object.keys(errors).length > 0 && isSubmitted) || isDefined(unlockError);

  const onEnterPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
    isWeb ? event.nativeEvent.key === 'Enter' && onUnlock() : undefined;

  return (
    <KeyboardAvoidingView behavior={behavior} style={styles.root}>
      <View style={styles.logoContainer}>
        <Icon name={IconNameEnum.WalletLogoPlaceholder} size={getCustomSize(11)} />
      </View>
      <View style={styles.bottomBlock}>
        <Row style={styles.password}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Row style={styles.inputContainer}>
                <TextInput
                  field={field}
                  label="Password"
                  secureTextEntry={isSecurePassword}
                  placeholder="Password"
                  prompt="Enter your password to unlock wallet"
                  containerStyle={styles.input}
                  clearIconStyles={styles.clearIcon}
                  labelContainerStyle={styles.label}
                  error={unlockError}
                  onKeyPress={onEnterPress}
                  onSubmitEditing={onUnlock}
                  onChange={() => setUnlockError(undefined)}
                />
                <TouchableIcon
                  name={isSecurePassword ? IconNameEnum.EyeOpen : IconNameEnum.EyeClosed}
                  onPress={handleTogglePasswordVisibility}
                  iconStyle={styles.eyeIcon}
                />
              </Row>
            )}
          />
          {isMobile && isBiometricEnabled && (
            <Pressable style={styles.iconContainer}>
              <Icon name={IconNameEnum.FaceId} iconStyle={styles.icon} size={getCustomSize(4)} />
            </Pressable>
          )}
        </Row>
        <Button
          title="UNLOCK WALLET"
          theme={ButtonThemesEnum.Secondary}
          style={styles.button}
          onPress={handleSubmit(onUnlock)}
          disabled={isSubmitDisabled}
        />
        <Row style={styles.textContainer}>
          <Text style={styles.commonText}>
            Having troubles?{' '}
            <Text style={styles.linkText} onPress={onResetWallet}>
              Reset a wallet
            </Text>
          </Text>
        </Row>
        <MadFishLogo style={styles.madLogo} color={colors.bgGrey3} />
      </View>
    </KeyboardAvoidingView>
  );
};
