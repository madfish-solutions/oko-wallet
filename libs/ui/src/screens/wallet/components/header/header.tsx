import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';
import { isMobile } from 'shared';

import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { HeaderAccountBalance } from '../../../../components/screen-components/header-container/components/header-account-balance/header-account-balance';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';

import { styles } from './header.styles';

interface Props {
  changeQrCodeVisibility: OnEventFn<GestureResponderEvent>;
}

export const Header: FC<Props> = ({ changeQrCodeVisibility }) => {
  const openCameraToScanQrCode = () => null;

  return (
    <HeaderContainer isSelectors>
      <Row style={styles.root}>
        {isMobile && <TouchableIcon name={IconNameEnum.Qrscan} onPress={openCameraToScanQrCode} style={styles.icon} />}
        <TouchableIcon name={IconNameEnum.Qrcode} onPress={changeQrCodeVisibility} />

        <HeaderAccountBalance style={styles.accountBalance} />
      </Row>
    </HeaderContainer>
  );
};
