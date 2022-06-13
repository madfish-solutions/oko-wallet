import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';

import { useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../styles/format-size';
import { isWeb } from '../../utils/platform.utils';
import { TouchableElement } from '../touchable-element/touchable-element';

import { HeaderAccountAddress } from './header-account-address/header-account-address';
import { HeaderAccountBalance } from './header-account-balance/header-account-balance';
import { HeaderQRCode } from './header-qr-code/header-qr-code';
import { HeaderTitle } from './header-title/header-title';
import { styles } from './header.styles';

export const Header: FC = () => {
  const { canGoBack } = useNavigation();
  const { name } = useSelectedNetworkSelector();

  return (
    <View style={styles.root}>
      <View style={[styles.wrapper, styles.marginBottom]}>
        <TouchableElement onPress={() => null} text={name} />
        <TouchableElement onPress={() => null} />
      </View>

      {!canGoBack() && (
        <>
          <View style={styles.wrapper}>
            <HeaderAccountAddress />
            <HeaderAccountBalance />
          </View>
          {!isWeb && <HeaderQRCode style={styles.qrCode} />}
        </>
      )}
      {canGoBack() && <HeaderAccountBalance textStyle={{ fontSize: getCustomSize(2.5) }} style={styles.balance} />}
      {canGoBack() && <HeaderTitle text="Title" />}
    </View>
  );
};
