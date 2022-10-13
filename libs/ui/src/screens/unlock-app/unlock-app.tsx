import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button } from '../../components/button/button';
import { ButtonThemesEnum } from '../../components/button/enums';
import { IconWithBorder } from '../../components/icon-with-border/icon-with-border';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Row } from '../../components/row/row';
import { TextInput } from '../../components/text-input/text-input';
import { Text } from '../../components/text/text';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useUnlock } from '../../hooks/use-unlock.hook';
import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { MadFishLogo } from '../settings/components/mad-fish-logo/mad-fish-logo';

import { styles } from './unlock.styles';

interface Password {
  password: string;
}

const defaultValues = { password: '' };

export const UnlockApp: FC = () => {
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const handleTogglePasswordVisibility = () => setIsSecurePassword(prev => !prev);
  const { unlock } = useUnlock();
  const { navigate } = useNavigation();

  const { control, watch } = useForm<Password>({
    mode: 'onChange',
    defaultValues
  });

  const password = watch('password');

  const onUnlock = () => unlock(password);
  const onResetWallet = () => navigate(ScreensEnum.SettingsResetWalletConfirm);

  return (
    <View style={styles.root}>
      <View style={styles.logoContainer}>
        <IconWithBorder style={styles.logo}>
          <Icon name={IconNameEnum.WalletLogoPlaceholderSquare} size={getCustomSize(9)} iconStyle={styles.icon} />
        </IconWithBorder>
      </View>
      <View style={styles.bottomBlock}>
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
              />
              <TouchableIcon
                name={isSecurePassword ? IconNameEnum.EyeOpen : IconNameEnum.EyeClosed}
                onPress={handleTogglePasswordVisibility}
                iconStyle={styles.eyeIcon}
              />
            </Row>
          )}
        />
        <Button title="UNLOCK WALLET" theme={ButtonThemesEnum.Secondary} style={styles.button} onPress={onUnlock} />
        <Row style={styles.textContainer}>
          <Text style={styles.commonText}>Having troubles? </Text>
          <Text style={styles.linkText} onPress={onResetWallet}>
            Reset a wallet
          </Text>
        </Row>
        <MadFishLogo style={styles.madLogo} color={colors.logoDark} />
      </View>
    </View>
  );
};
