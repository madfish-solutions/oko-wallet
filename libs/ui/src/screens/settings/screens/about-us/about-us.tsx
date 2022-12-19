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

export const AboutUs: FC = () => {
  const { goBack } = useNavigation();

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="About Us" onBackButtonPress={goBack} />
      </HeaderContainer>

      <ScreenScrollView style={settingsStyles.root} contentContainerStyle={settingsStyles.rootContentContainer}>
        <View style={settingsStyles.root}>
          <View style={settingsStyles.content}>
            <ItemContainer>
              <Item title="Website" />
              <Separator />
              <Item title="Repository" />
              <Separator />
              <Item title="Privacy Policy" />
              <Separator />
              <Item title="Terms of Use" />
              <Separator />
              <Item title="Careers" />
              <Separator />
              <Item title="Contact" />
            </ItemContainer>

            <Divider size={getCustomSize(2)} />

            <ItemContainer>
              <Item title="Knowledge Base" />
              <Separator />
              <Item title="Feature Request" />
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
