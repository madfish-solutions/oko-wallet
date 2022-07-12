import React, { FC } from 'react';
import { Animated } from 'react-native';

import { isMobile } from '../../../utils/platform.utils';
import { IconNameEnum } from '../../icon/icon-name.enum';
import { Row } from '../../row/row';
import { TouchableIcon } from '../../touchable-icon/touchable-icon';
import { HeaderAccountBalance } from '../components/header-account-balance/header-account-balance';
import { HeaderContainer } from '../components/header-container/header-container';
import { HeaderQRCode } from '../components/header-qr-code/header-qr-code';

import { styles } from './header-main-screen.styles';

interface Props {
  scrolling: Animated.Value;
}

export const HeaderMainScreen: FC<Props> = ({ scrolling }) => {
  const openCameraToScanQrCode = () => null;

  return (
    <HeaderContainer scrolling={scrolling} style={styles.root}>
      <Row style={styles.row}>
        {isMobile && <TouchableIcon name={IconNameEnum.Qrscan} onPress={openCameraToScanQrCode} style={styles.icon} />}
        <TouchableIcon name={IconNameEnum.Qrcode} />
        <HeaderAccountBalance style={styles.accountBalance} />
      </Row>

      <HeaderQRCode scrolling={scrolling} style={styles.qrCode} />
    </HeaderContainer>
  );
};
