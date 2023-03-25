import React, { FC } from 'react';
import { View } from 'react-native';
import { isMobile } from 'shared';

import { Button } from '../../components/button/button';
import { ButtonThemesEnum } from '../../components/button/enums';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Row } from '../../components/row/row';
import { Text } from '../../components/text/text';
import { windowWidth } from '../../constants/dimensions';
import { ScreensEnum } from '../../enums/screens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { MadFishLogo } from '../settings/components/mad-fish-logo/mad-fish-logo';

import { styles } from './welcome.styles';
import { WelcomeTestIds } from './welcome.test-ids';

const logoWidth = isMobile ? windowWidth : getCustomSize(27.5);
const logoHeight = isMobile ? getCustomSize(31.625) : getCustomSize(21.725);

export const Welcome: FC = () => {
  const { navigate } = useNavigation();

  const navigateToCreateWallet = () => navigate(ScreensEnum.CreateANewWallet);

  const navigateToImportAccount = () => navigate(ScreensEnum.ImportWallet);

  return (
    <View style={styles.root}>
      <View style={styles.logoContainer}>
        <Icon name={IconNameEnum.IllustrationWelcomeScreen} width={logoWidth} height={logoHeight} />

        <Row style={styles.titleContainer}>
          <Text style={styles.oko}>Oko</Text>
          <Text style={styles.wallet}>Wallet</Text>
        </Row>
        <Text style={styles.description}>Open your eyes on the finance</Text>
      </View>
      <View style={styles.bottomBlock}>
        <Button
          title="CREATE NEW WALLET"
          theme={ButtonThemesEnum.Secondary}
          style={styles.button}
          onPress={navigateToCreateWallet}
          testID={WelcomeTestIds.CrateNewWalletButton}
        />
        <Button
          title="IMPORT EXISTING WALLET"
          style={styles.button}
          onPress={navigateToImportAccount}
          testID={WelcomeTestIds.ImportExistingWalletButton}
        />
        <MadFishLogo style={styles.madLogo} color={colors.bgGrey3} />
      </View>
    </View>
  );
};
