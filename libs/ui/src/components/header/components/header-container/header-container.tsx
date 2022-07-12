import React, { FC } from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';

import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { ViewStyleProps } from '../../../../interfaces/style.interface';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { handleCopyToClipboard } from '../../../../utils/copy-to-clipboard.util';
import { shortize } from '../../../../utils/shortize.util';
import { IconWithBorder } from '../../../icon-with-border/icon-with-border';
import { Icon } from '../../../icon/icon';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { RobotIcon } from '../../../robot-icon/robot-icon';
import { Row } from '../../../row/row';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './header-container.styles';

interface Props {
  scrolling?: Animated.Value;
  style?: ViewStyleProps;
}

export const HeaderContainer: FC<Props> = ({ scrolling, style, children }) => {
  const { iconName } = useSelectedNetworkSelector();
  const address = useSelectedAccountPublicKeyHashSelector();
  const { navigate } = useNavigation();

  const copyAddress = () => handleCopyToClipboard(address);

  const selectAccount = () => navigate(ScreensEnum.AccountsSelector);
  const selectNetwork = () => navigate(ScreensEnum.NetworksSelector);

  const rootAnimationStyles = scrolling && {
    height: scrolling.interpolate({
      inputRange: [0, 100],
      outputRange: [280, 120],
      extrapolate: 'clamp'
    })
  };

  return (
    <Animated.View style={[styles.root, rootAnimationStyles, style]}>
      <Row style={styles.wrapper}>
        <TouchableOpacity onPress={selectAccount} style={styles.button}>
          <IconWithBorder>
            <RobotIcon seed={address} />
          </IconWithBorder>
        </TouchableOpacity>

        <Row style={styles.addressWrapper}>
          <TouchableIcon name={IconNameEnum.Copy} onPress={copyAddress} iconStyle={styles.icon} />
          <Text numberOfLines={1} style={styles.address}>
            {shortize(address)}
          </Text>
        </Row>

        <TouchableOpacity onPress={selectNetwork} style={styles.button}>
          <IconWithBorder>
            <Icon name={iconName ?? IconNameEnum.NetworkFallback} />
          </IconWithBorder>
        </TouchableOpacity>
      </Row>

      {children}
    </Animated.View>
  );
};
