import React, { FC } from 'react';
import { Text, View, Share, Animated } from 'react-native';
import QRCodeLibrary from 'react-native-qrcode-svg';

import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { useSelectedAccountPublicKeyHashSelector } from '../../../../store/wallet/wallet.selectors';
import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { handleCopyToClipboard } from '../../../../utils/copy-to-clipboard.util';
import { isMobile } from '../../../../utils/platform.utils';
import { Column } from '../../../column/column';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Row } from '../../../row/row';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './header-qr-code.styles';

interface Props {
  scrolling: Animated.Value;
  style?: ViewStyleProps;
}

export const HeaderQRCode: FC<Props> = ({ scrolling, style }) => {
  const address = useSelectedAccountPublicKeyHashSelector();

  const copyAddress = () => handleCopyToClipboard(address);

  const shareAddress = async () => {
    try {
      await Share.share({
        message: address
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const qrCodeAnimationOpacity = scrolling.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0]
  });

  return (
    <Animated.View style={[styles.root, style, { opacity: qrCodeAnimationOpacity }]}>
      <Column style={styles.wrapper}>
        <Text style={styles.address} numberOfLines={3}>
          {address}
        </Text>
        <Row style={styles.iconsWrapper}>
          <TouchableIcon name={IconNameEnum.Copy} onPress={copyAddress} />
          {isMobile && <TouchableIcon name={IconNameEnum.Share} onPress={shareAddress} style={styles.icon} />}
        </Row>
      </Column>
      <View style={styles.qrcodeWrapper}>
        <QRCodeLibrary
          backgroundColor="transparent"
          color={colors.textGrey1}
          value={address !== '' ? address : 'Not generated'}
          size={getCustomSize(14)}
        />
      </View>
    </Animated.View>
  );
};
