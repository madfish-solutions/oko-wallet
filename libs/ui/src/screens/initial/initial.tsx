import React, { FC } from 'react';
import { View } from 'react-native';

import { Button } from '../../components/button/button';
import { ButtonThemesEnum } from '../../components/button/enums';
import { IconWithBorder } from '../../components/icon-with-border/icon-with-border';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { getCustomSize } from '../../styles/format-size';
import { isMobile } from '../../utils/platform.utils';
import { MadFishLogo } from '../settings/components/mad-fish-logo/mad-fish-logo';

import { styles } from './initial.styles';

export const Initial: FC = () => {
  const { navigate } = useNavigation();
  const navigateToCreateWallet = () => navigate(ScreensEnum.CreateANewWallet);
  const navigateToImportAccount = () => navigate(ScreensEnum.ImportWallet);

  return (
    <View style={styles.root}>
      <View style={styles.logoContainer}>
        <IconWithBorder style={styles.logo}>
          <Icon name={IconNameEnum.WalletLogoPlaceholderSquare} size={getCustomSize(9)} iconStyle={styles.icon} />
        </IconWithBorder>
      </View>
      <View style={styles.bottomBlock}>
        <Button
          title="CREATE NEW WALLET"
          theme={ButtonThemesEnum.Secondary}
          style={styles.button}
          onPress={navigateToCreateWallet}
        />
        <Button title="IMPORT EXISTING WALLET" style={styles.button} onPress={navigateToImportAccount} />
        {isMobile && <Button title="IMPORT FROM NAMEHERE EXTENSION" style={styles.button} />}
        <MadFishLogo style={styles.madLogo} isDark />
      </View>
    </View>
  );
};
