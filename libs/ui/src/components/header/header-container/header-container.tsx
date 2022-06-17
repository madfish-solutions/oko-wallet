import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';
import { Icon } from '../../icon/icon';
import { IconNameEnum } from '../../icon/icon-name.enum';
import { RobotIcon } from '../../robot-icon/robot-icon';
import { Row } from '../../row/row';
import { HeaderTouchableElement } from '../header-touchable-element/header-touchable-element';

import { styles } from './header-container.styles';

interface Props {
  isShowNetworkName?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const HeaderContainer: FC<Props> = ({ isShowNetworkName = false, style, children }) => {
  const { name: networkName, iconName } = useSelectedNetworkSelector();
  const address = useSelectedAccountPublicKeyHashSelector();

  const selectNetwork = () => null;
  const selectAccount = () => null;

  const networkNameVisibiliry = isShowNetworkName ? networkName : '';

  return (
    <View style={[styles.root, style]}>
      <Row style={styles.wrapper}>
        <HeaderTouchableElement onPress={selectNetwork} text={networkNameVisibiliry} isShowDropdownArrow>
          <Icon name={iconName ?? IconNameEnum.NetworkFallback} />
        </HeaderTouchableElement>

        <HeaderTouchableElement onPress={selectAccount}>
          <RobotIcon seed={address} />
        </HeaderTouchableElement>
      </Row>

      {children}
    </View>
  );
};
