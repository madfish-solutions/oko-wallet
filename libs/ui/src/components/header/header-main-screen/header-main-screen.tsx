import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';

import { isMobile } from '../../../utils/platform.utils';
import { IconNameEnum } from '../../icon/icon-name.enum';
import { Row } from '../../row/row';
import { TouchableIcon } from '../../touchable-icon/touchable-icon';
import { HeaderAccountBalance } from '../components/header-account-balance/header-account-balance';
import { HeaderContainer } from '../components/header-container/header-container';

import { styles } from './header-main-screen.styles';

interface Props {
  qrCodeVisibility: OnEventFn<void>;
}

export const HeaderMainScreen: FC<Props> = ({ qrCodeVisibility }) => {
  const openCameraToScanQrCode = () => null;

  return (
    <HeaderContainer>
      <Row>
        {isMobile && <TouchableIcon name={IconNameEnum.Qrscan} onPress={openCameraToScanQrCode} style={styles.icon} />}
        <TouchableIcon name={IconNameEnum.Qrcode} onPress={qrCodeVisibility} />
        <HeaderAccountBalance style={styles.accountBalance} />
      </Row>
    </HeaderContainer>
  );
};
