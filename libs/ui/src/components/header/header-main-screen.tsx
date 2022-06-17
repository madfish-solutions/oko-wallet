import React, { FC } from 'react';

import { isWeb } from '../../utils/platform.utils';
import { Row } from '../row/row';

import { HeaderAccountAddress } from './header-account-address/header-account-address';
import { HeaderAccountBalance } from './header-account-balance/header-account-balance';
import { HeaderContainer } from './header-container/header-container';
import { styles } from './header-main-screen.styles';
import { HeaderQRCode } from './header-qr-code/header-qr-code';

export const HeaderMainScreen: FC = () => (
  <HeaderContainer isShowNetworkName>
    <Row>
      <HeaderAccountAddress />
      <HeaderAccountBalance />
    </Row>

    {!isWeb && <HeaderQRCode style={styles.qrCode} />}
  </HeaderContainer>
);
