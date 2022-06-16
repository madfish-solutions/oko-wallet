import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';

import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../store/wallet/wallet.selectors';
import { isWeb } from '../../utils/platform.utils';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { RobotIcon } from '../robot-icon/robot-icon';
import { Row } from '../row/row';

import { HeaderAccountAddress } from './header-account-address/header-account-address';
import { HeaderAccountBalance } from './header-account-balance/header-account-balance';
import { HeaderQRCode } from './header-qr-code/header-qr-code';
import { HeaderTitle } from './header-title/header-title';
import { HeaderTouchableElement } from './header-touchable-element/header-touchable-element';
import { styles } from './header.styles';

export const Header: FC = () => {
  const { canGoBack } = useNavigation();
  const { name: networkName, iconName } = useSelectedNetworkSelector();
  const address = useSelectedAccountPublicKeyHashSelector();

  const selectNetwork = () => null;
  const selectAccount = () => null;

  const networkNameVisibility = canGoBack() ? '' : networkName;

  return (
    <View style={styles.root}>
      <Row style={styles.marginBottom}>
        <HeaderTouchableElement onPress={selectNetwork} text={networkNameVisibility} isShowDropdownArrow>
          <Icon name={iconName ?? IconNameEnum.NetworkFallback} />
        </HeaderTouchableElement>

        <HeaderTouchableElement onPress={selectAccount}>
          <RobotIcon seed={address} />
        </HeaderTouchableElement>
      </Row>

      {!canGoBack() && (
        <>
          <Row>
            <HeaderAccountAddress />
            <HeaderAccountBalance />
          </Row>
          {!isWeb && <HeaderQRCode style={styles.qrCode} />}
        </>
      )}

      {canGoBack() && <HeaderTitle text="Title" />}
    </View>
  );
};
