import React, { FC } from 'react';
import { View, Share, Animated } from 'react-native';
import QRCodeLibrary from 'react-native-qrcode-svg';

import { Column } from '../../../../components/column/column';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { useSelectedAccountPublicKeyHashSelector } from '../../../../store/wallet/wallet.selectors';
import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { handleCopyToClipboard } from '../../../../utils/copy-to-clipboard.util';
import { isMobile } from '../../../../utils/platform.utils';

import { styles } from './qr-code.styles';

interface Props {
  contentOffsetY: number;
}

export const QrCode: FC<Props> = ({ contentOffsetY }) => {
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

  const animationOpacity = new Animated.Value(contentOffsetY).interpolate({
    inputRange: [0, 160],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.root}>
      <View style={styles.layout} />
      <Animated.View style={[styles.animatedView, { opacity: animationOpacity }]}>
        <Column style={styles.wrapper}>
          <Text style={styles.address} numberOfLines={3}>
            {address}
          </Text>
          <Row style={styles.iconsWrapper}>
            <TouchableIcon name={IconNameEnum.Copy} onPress={copyAddress} />
            {isMobile && <TouchableIcon name={IconNameEnum.Share} onPress={shareAddress} style={styles.icon} />}
          </Row>
        </Column>
        <View style={styles.qrCodeWrapper}>
          <QRCodeLibrary
            backgroundColor="transparent"
            color={colors.textGrey1}
            value={address !== '' ? address : 'Not generated'}
            size={getCustomSize(14)}
          />
        </View>
      </Animated.View>
    </View>
  );
};
