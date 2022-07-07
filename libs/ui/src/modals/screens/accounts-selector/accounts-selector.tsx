import React, { FC } from 'react';
import { Text } from 'react-native';

import { Button } from '../../../components/button/button';
import { Column } from '../../../components/column/column';
import { Divider } from '../../../components/divider/divider';
import { Dynamics } from '../../../components/dynamics/dynamics';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { RobotIcon } from '../../../components/robot-icon/robot-icon';
import { Row } from '../../../components/row/row';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedAccountSelector
} from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { ModalAccountBalance } from '../../components/modal-account-balance/modal-account-balance';
import { ModalContainer } from '../../components/modal-container/modal-container';
import { ModalHeader } from '../../components/modal-header/modal-header';

import { styles } from './accounts-selector.styles';
import { AccountsList } from './components/accounts-list';

export const AccountsSelector: FC = () => {
  const selectedAccount = useSelectedAccountSelector();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();

  const onWidgetSettings = () => null;
  const onAccountSettings = () => null;

  return (
    <ModalContainer screenTitle="Accounts">
      <Column style={styles.headerWrapper}>
        <ModalHeader
          name={selectedAccount.name}
          balanceTitle="Total balance"
          icon={<RobotIcon seed={publicKeyHash} size={getCustomSize(6)} />}
          balance={<ModalAccountBalance />}
          style={styles.header}
        />
        <Row style={styles.buttonsContainer}>
          <Button
            title="Widget settings"
            onPress={onWidgetSettings}
            rightIcon={IconNameEnum.WidgetSettings}
            style={styles.button}
          />
          <Button
            title="Account settings"
            onPress={onAccountSettings}
            rightIcon={IconNameEnum.Settings}
            style={styles.button}
          />
        </Row>
      </Column>
      <Divider size={getCustomSize(0.5)} style={styles.divider} />

      <Column style={styles.accountsBalanceContainer}>
        <Text style={styles.accountsBalanceTitle}>All accounts balance</Text>
        <Row>
          <Text style={styles.accountsBalance}>401 987.01</Text>
          <Text style={styles.accountsBalanceCurrency}>$</Text>
          <Dynamics value="10.2" style={styles.dynamics} />
        </Row>
      </Column>
      <Divider size={getCustomSize(0.5)} style={styles.divider} />

      <AccountsList />
    </ModalContainer>
  );
};
