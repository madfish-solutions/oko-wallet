import React, { FC } from 'react';
import { View } from 'react-native';

import { Divider } from '../../../../components/divider/divider';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { NavigationBar } from '../../../../components/navigation-bar/navigation-bar';
import { Row } from '../../../../components/row/row';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { Text } from '../../../../components/text/text';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { getCustomSize } from '../../../../styles/format-size';
import { ItemContainer } from '../../components/item-container/item-container';
import { Item } from '../../components/item/item';
import { MadFishLogo } from '../../components/mad-fish-logo/mad-fish-logo';
import { Separator } from '../../components/separator/separator';
import { styles as settingsStyles } from '../../settings.styles';

import { styles } from './about-us.styles';
import { Version } from './components/version/version';
import {
  goToTermsOfUse,
  goToContact,
  goToCareers,
  goToPrivatePolicy,
  goToRepository,
  goToWebsite
} from './utils/go-to-oko-links.utils';

export const AboutUs: FC = () => {
  const { goBack } = useNavigation();

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="About Us" onBackButtonPress={goBack} />
      </HeaderContainer>

      <ScreenScrollView style={settingsStyles.root} contentContainerStyle={settingsStyles.rootContentContainer}>
        <View style={settingsStyles.root}>
          <View style={styles.content}>
            <ItemContainer>
              <Item title="Website" onPress={goToWebsite} />
              <Separator />
              <Item title="Repository" onPress={goToRepository} />
              <Separator />
              <Item title="Privacy Policy" onPress={goToPrivatePolicy} />
              <Separator />
              <Item title="Terms of Use" onPress={goToTermsOfUse} />
              <Separator />
              <Item title="Careers" onPress={goToCareers} />
              <Separator />
              <Item title="Contact" onPress={goToContact} />
            </ItemContainer>

            <Divider size={getCustomSize(2)} />

            <Version />
          </View>

          <View style={styles.footer}>
            <Row style={styles.walletNameContainer}>
              <Icon name={IconNameEnum.WalletLogoPlaceholder} size={getCustomSize(8)} />
              <Divider size={getCustomSize(0.125)} style={styles.verticalSeparator} />
              <Text style={styles.walletText}>
                <Text style={styles.redText}>Oko Wallet </Text>is an easy-to-use multiplatform & multichain wallet for
                interacting with crypto, WEB3 & NFT.
              </Text>
            </Row>

            <MadFishLogo />
          </View>
        </View>
      </ScreenScrollView>

      <NavigationBar />
    </ScreenContainer>
  );
};
