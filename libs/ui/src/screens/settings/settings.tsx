import React, { FC } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Divider } from '../../components/divider/divider';
import { ActionContainer } from '../../components/grey-container/components/action-container/action-container';
import { GreyContainer } from '../../components/grey-container/grey-container';
import { IconWithBorder } from '../../components/icon-with-border/icon-with-border';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
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
import { isMaximiseScreen, isWeb, isIOS } from '../../utils/platform.utils';

import EasterEgg from './assets/easter-egg.svg';
import { styles } from './settings.styles';

const dividerSize = getCustomSize(2);
const socialIconSize = getCustomSize(4);

export const Settings: FC = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { name } = useSelectedAccountSelector();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();

  const navigateToWallet = () => navigate(ScreensEnum.Wallet);
  const onReset = () => dispatch(resetApplicationAction.submit());

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Settings" onBackButtonPress={navigateToWallet} isBackButton={false} />
        {isWeb && (
          <TouchableIcon
            name={isMaximiseScreen ? IconNameEnum.NewTab : IconNameEnum.Maximize}
            onPress={openMaximiseScreen}
          />
        )}
      </HeaderContainer>

      <ScreenScrollView style={styles.root}>
        {isIOS && <EasterEgg style={styles.easterEgg} width="100%" height="35%" preserveAspectRatio="xMinYMin slice" />}

        <View style={styles.content}>
          <GreyContainer>
            <ActionContainer>
              <Row>
                <IconWithBorder style={styles.robot}>
                  <RobotIcon seed={publicKeyHash} />
                </IconWithBorder>
                <Text style={styles.text}>{name}</Text>
              </Row>
              <Icon name={IconNameEnum.ChevronRight} />
            </ActionContainer>
          </GreyContainer>

          <Divider size={dividerSize} />

          <GreyContainer>
            <ActionContainer>
              <Row>
                <Icon iconStyle={styles.icon} name={IconNameEnum.Slider} />
                <Text style={styles.text}>General</Text>
              </Row>
              <Icon name={IconNameEnum.ChevronRight} />
            </ActionContainer>
            <Divider size={getCustomSize(0.125)} style={styles.separator} />
            <ActionContainer>
              <Row>
                <Icon iconStyle={styles.icon} name={IconNameEnum.Security} />
                <Text style={styles.text}>Security</Text>
              </Row>
              <Icon name={IconNameEnum.ChevronRight} />
            </ActionContainer>
          </GreyContainer>

          <Divider size={dividerSize} />

          <GreyContainer>
            <ActionContainer>
              <Row>
                <Icon name={IconNameEnum.DappConnect} iconStyle={styles.icon} />
                <Text style={styles.text}>Authorized DApps</Text>
              </Row>
              <Icon name={IconNameEnum.ChevronRight} />
            </ActionContainer>
          </GreyContainer>

          <Divider size={dividerSize} />

          <GreyContainer>
            <ActionContainer>
              <Row>
                <Icon name={IconNameEnum.InfoRed} iconStyle={styles.icon} />
                <Text style={styles.text}>About us</Text>
              </Row>
              <Icon name={IconNameEnum.ChevronRight} />
            </ActionContainer>
            <Divider size={getCustomSize(0.125)} style={styles.separator} />
            <Row style={styles.socialMedia}>
              <TouchableIcon size={socialIconSize} name={IconNameEnum.Telegram} />
              <TouchableIcon size={socialIconSize} name={IconNameEnum.Twitter} />
              <TouchableIcon size={socialIconSize} name={IconNameEnum.Discord} />
              <TouchableIcon size={socialIconSize} name={IconNameEnum.Reddit} />
              <TouchableIcon size={socialIconSize} name={IconNameEnum.Youtube} />
            </Row>
          </GreyContainer>

          <View style={styles.resetContainer}>
            <ActionContainer onPress={onReset} style={styles.resetActionContainer}>
              <Row>
                <Text style={styles.resetText}>Reset wallet</Text>
                <Icon name={IconNameEnum.Out} iconStyle={styles.outIcon} />
              </Row>
            </ActionContainer>
          </View>

          <Icon
            width={getCustomSize(13.75)}
            height={getCustomSize(5)}
            name={IconNameEnum.MadWithLove}
            iconStyle={styles.madLogo}
          />
        </View>
      </ScreenScrollView>

      <NavigationBar />
    </ScreenContainer>
  );
};
