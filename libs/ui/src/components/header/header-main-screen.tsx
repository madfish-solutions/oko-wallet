import React, { FC, useState } from 'react';

import { isWeb } from '../../utils/platform.utils';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { TouchableIcon } from '../touchable-icon/touchable-icon';

import { HeaderAccountBalance } from './header-account-balance/header-account-balance';
import { HeaderContainer } from './header-container/header-container';
import { styles } from './header-main-screen.styles';
import { HeaderQRCode } from './header-qr-code/header-qr-code';

const initialQrCodeState = isWeb ? false : true;

export const HeaderMainScreen: FC = () => {
  const [qrCodeIsShow, setQrCodeIsShow] = useState(initialQrCodeState);

  const openCameraToScanQrCode = () => null;
  const showQrCode = () => setQrCodeIsShow(!qrCodeIsShow);

  return (
    <HeaderContainer>
      <Row>
        {!isWeb && <TouchableIcon name={IconNameEnum.Qrscan} onPress={openCameraToScanQrCode} style={styles.icon} />}
        <TouchableIcon name={IconNameEnum.Qrcode} onPress={showQrCode} />
        <HeaderAccountBalance style={styles.accountBalance} />
      </Row>

      {qrCodeIsShow && <HeaderQRCode style={styles.qrCode} />}
    </HeaderContainer>
  );
};
