import React, { FC } from 'react';
import { View } from 'react-native';

import { Button } from '../../components/button/button';
import { ButtonThemesEnum } from '../../components/button/enums';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { isFullpage } from '../../utils/location.utils';
import { openMaximiseScreen } from '../../utils/open-maximise-screen.util';
import { MadFishLogo } from '../settings/components/mad-fish-logo/mad-fish-logo';

import { styles } from './initial.styles';
import { InitialTestIDs } from './initial.test-ids';

export const Initial: FC = () => {
  const { navigate } = useNavigation();
  const navigateToCreateWallet = () => {
    if (!isFullpage) {
      openMaximiseScreen();
    }
    navigate(ScreensEnum.CreateANewWallet);
  };
  const navigateToImportAccount = () => {
    if (!isFullpage) {
      openMaximiseScreen();
    }
    navigate(ScreensEnum.ImportWallet);
  };

  return (
    <View style={styles.root}>
      <View style={styles.logoContainer}>
        <Icon name={IconNameEnum.WalletLogoPlaceholder} size={getCustomSize(11)} />
      </View>
      <View style={styles.bottomBlock}>
        <Button
          title="CREATE NEW WALLET"
          theme={ButtonThemesEnum.Secondary}
          style={styles.button}
          onPress={navigateToCreateWallet}
          testID={InitialTestIDs.CrateNewWalletButton}
        />
        <Button
          title="IMPORT EXISTING WALLET"
          style={styles.button}
          onPress={navigateToImportAccount}
          testID={InitialTestIDs.ImportExistingWalletButton}
        />
        <MadFishLogo style={styles.madLogo} color={colors.bgGrey3} />
      </View>
    </View>
  );
};
