import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { useSelectedAccountPublicKeyHashSelector } from '../../../store/wallet/wallet.selectors';
import { isWeb } from '../../../utils/platform.utils';

import { styles } from './header-account-address.styles';

export const HeaderAccountAddress: FC = () => {
  const address = useSelectedAccountPublicKeyHashSelector();

  return (
    <View style={styles.root}>
      {/* TODO: Add copy icon */}
      {isWeb ? (
        <>
          <Text style={styles.icon}>CC</Text>
          <Text style={styles.address} ellipsizeMode="middle" numberOfLines={1}>
            {address}
          </Text>
        </>
      ) : (
        <Text style={styles.icon}>qr-code</Text>
      )}
    </View>
  );
};
