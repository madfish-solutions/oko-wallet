import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';

import { useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';
import { isWeb } from '../../utils/platform.utils';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { TouchableElement } from '../touchable-element/touchable-element';

import { HeaderAccountAddress } from './header-account-address/header-account-address';
import { HeaderAccountBalance } from './header-account-balance/header-account-balance';
import { HeaderQRCode } from './header-qr-code/header-qr-code';
import { HeaderTitle } from './header-title/header-title';
import { styles } from './header.styles';

export const Header: FC = () => {
  const { canGoBack } = useNavigation();
  const { name: networkName, iconName } = useSelectedNetworkSelector();

  const selectNetwork = () => null;
  const selectAccount = () => null;

  return (
    <View style={styles.root}>
      <Row style={styles.marginBottom}>
        <TouchableElement
          name={iconName ?? IconNameEnum.NetworkFallback}
          onPress={selectNetwork}
          arrow
          text={networkName}
        />
        <TouchableElement name={IconNameEnum.AccountLogo} onPress={selectAccount} />
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

      {canGoBack() && (
        <>
          {/* TODO: Update later */}
          {/* <HeaderAccountBalance textStyle={{ fontSize: getCustomSize(2.5) }} style={styles.balance} /> */}
          <HeaderTitle text="Title" />
        </>
      )}
    </View>
  );
};
