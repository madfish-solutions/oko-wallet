import React, { FC } from 'react';
import { View, Share, Animated } from 'react-native';
import QRCodeLibrary from 'react-native-qrcode-svg';

import { MainText } from '../../../../components/text/text';
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
  contentOffsetY: number;
  style?: ViewStyleProps;
}

export const HeaderQRCode: FC<Props> = ({ contentOffsetY, style }) => {
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
    <Animated.View style={[styles.root, style, { opacity: animationOpacity }]}>
      <Column style={styles.wrapper}>
        <MainText style={styles.address} numberOfLines={3}>
          {address}
        </MainText>
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
  );
};
