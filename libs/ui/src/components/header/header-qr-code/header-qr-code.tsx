import Clipboard from '@react-native-clipboard/clipboard';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import QRCodeLibrary from 'react-native-qrcode-svg';

import { StylePropsType } from '../../../interfaces/style.interface';
import { useSelectedAccountPublicKeyHashSelector } from '../../../store/wallet/wallet.selectors';
import { colors } from '../../../styles/colors';

import { styles } from './header-qr-code.styles';

interface Props {
  style?: StylePropsType;
}

export const HeaderQRCode: FC<Props> = ({ style }) => {
  const address = useSelectedAccountPublicKeyHashSelector();

  const handleCopyToClipboard = () => {
    if (typeof address === 'string') {
      Clipboard.setString(address);
    }
  };

  return (
    // TODO: Add Row
    <View style={[styles.root, style]}>
      {/* TODO: Add Column component */}
      <View style={styles.wrapper}>
        <Text style={styles.text}>
          Share this address
          {'\n'}
          for receive <Text style={styles.symbol}>KLAY</Text> tokens
        </Text>
        <Text style={styles.address} numberOfLines={2}>
          {address}
        </Text>
        {/* Add svg */}
        <Text onPress={handleCopyToClipboard} style={styles.icon}>
          copy
        </Text>
      </View>
      <View style={styles.container}>
        <QRCodeLibrary backgroundColor="transparent" color={colors.textGrey1} value={address} size={112} />
      </View>
    </View>
  );
};
