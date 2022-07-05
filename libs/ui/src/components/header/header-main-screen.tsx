import React, { FC, useState } from 'react';

import { isMobile } from '../../utils/platform.utils';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { TouchableIcon } from '../touchable-icon/touchable-icon';

import { HeaderAccountBalance } from './header-account-balance/header-account-balance';
import { HeaderContainer } from './header-container/header-container';
import { styles } from './header-main-screen.styles';
import { HeaderQRCode } from './header-qr-code/header-qr-code';

export const HeaderMainScreen: FC = () => {
  const [isShowQrCode, setIsShowQrCode] = useState(isMobile);

  const openCameraToScanQrCode = () => null;
  const showQrCode = () => setIsShowQrCode(!isShowQrCode);

  return (
    <HeaderContainer>
      <Row>
        {isMobile && <TouchableIcon name={IconNameEnum.Qrscan} onPress={openCameraToScanQrCode} style={styles.icon} />}
        <TouchableIcon name={IconNameEnum.Qrcode} onPress={showQrCode} />
        <HeaderAccountBalance style={styles.accountBalance} />
      </Row>

      {isShowQrCode && <HeaderQRCode style={styles.qrCode} />}
    </HeaderContainer>
  );
};
