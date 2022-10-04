import React, { FC } from 'react';
import { View, Linking } from 'react-native';
import { useDispatch } from 'react-redux';

import { Divider } from '../../components/divider/divider';
import { IconWithBorderEnum } from '../../components/icon-with-border/enums';
import { IconWithBorder } from '../../components/icon-with-border/icon-with-border';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Pressable } from '../../components/pressable/pressable';
import { RobotIcon } from '../../components/robot-icon/robot-icon';
import { Row } from '../../components/row/row';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { Text } from '../../components/text/text';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { resetApplicationAction } from '../../store/root-state.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedAccountSelector
} from '../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../styles/format-size';
import { openMaximiseScreen } from '../../utils/open-maximise-screen.util';
import { isIOS, isMaximiseScreen, isWeb } from '../../utils/platform.utils';

import EasterEgg from './assets/easter-egg.svg';
import { ItemContainer } from './components/item-container/item-container';
import { Item } from './components/item/item';
import { madFishUrl } from './constants';
import { styles } from './settings.styles';

const dividerSize = getCustomSize(2);
const socialIconSize = getCustomSize(4);

export const Settings: FC = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { name } = useSelectedAccountSelector();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();

  const navigateToSettingsAccount = () => navigate(ScreensEnum.SettingsAccount);
  const onReset = () => dispatch(resetApplicationAction.submit());
  const goToMadFishSite = () => Linking.openURL(madFishUrl);

  const navigateToAuthorizedDapps = () => navigate(ScreensEnum.AuthorizedDapps);

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Settings" />
        {isWeb && (
          <TouchableIcon
            name={isMaximiseScreen ? IconNameEnum.NewTab : IconNameEnum.Maximize}
            onPress={openMaximiseScreen}
          />
        )}
      </HeaderContainer>

      <ScreenScrollView style={styles.root} contentContainerStyle={styles.rootContentContainer}>
        {isIOS && (
          <EasterEgg
            style={styles.easterEgg}
            width="100%"
            height={getCustomSize(23)}
            preserveAspectRatio="xMaxYMax slice"
          />
        )}

        <View style={styles.content}>
          <View>
            <ItemContainer>
              <Item
                iconComponent={
                  <IconWithBorder type={IconWithBorderEnum.Ternary} style={styles.robot}>
                    <RobotIcon seed={publicKeyHash} size={getCustomSize(1.8)} />
                  </IconWithBorder>
                }
                title={name}
                onPress={navigateToSettingsAccount}
              />
            </ItemContainer>

            <Divider size={dividerSize} />

            <ItemContainer>
              <Item title="General" icon={IconNameEnum.Slider} />
              <Divider size={getCustomSize(0.125)} style={styles.separator} />
              <Item title="Security" icon={IconNameEnum.Security} />
            </ItemContainer>

            <Divider size={dividerSize} />

            <ItemContainer>
              <Item title="Authorized DApps" icon={IconNameEnum.DappConnect} onPress={navigateToAuthorizedDapps} />
            </ItemContainer>

            <Divider size={dividerSize} />

            <ItemContainer>
              <Item title="About us" icon={IconNameEnum.InfoRed} />
              <Divider size={getCustomSize(0.125)} style={styles.separator} />
              <Row style={styles.socialMedia}>
                <TouchableIcon size={socialIconSize} name={IconNameEnum.Telegram} />
                <TouchableIcon size={socialIconSize} name={IconNameEnum.Twitter} />
                <TouchableIcon size={socialIconSize} name={IconNameEnum.Discord} />
                <TouchableIcon size={socialIconSize} name={IconNameEnum.Reddit} />
                <TouchableIcon size={socialIconSize} name={IconNameEnum.Youtube} />
              </Row>
            </ItemContainer>

            <View style={styles.resetContainer}>
              <Pressable onPress={onReset}>
                <Row>
                  <Text style={styles.resetText}>Reset wallet</Text>
                  <Icon name={IconNameEnum.Out} iconStyle={styles.outIcon} />
                </Row>
              </Pressable>
            </View>
          </View>

          <View style={styles.logo}>
            <TouchableIcon
              width={getCustomSize(13.75)}
              height={getCustomSize(5)}
              name={IconNameEnum.MadWithLove}
              onPress={goToMadFishSite}
            />
          </View>
        </View>
      </ScreenScrollView>

      <NavigationBar />
    </ScreenContainer>
  );
};
