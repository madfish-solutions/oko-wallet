import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { Button } from '../../components/button/button';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Row } from '../../components/row/row';
import { useSelectedAccountSelector } from '../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../styles/format-size';
import { Modal } from '../modal/modal';

import { styles } from './accounts.styles';
import { AccountsList } from './components/accounts-list/accounts-list';

export const Accounts: FC = () => {
  const selectedAccount = useSelectedAccountSelector();

  return (
    <Modal>
      <>
        <View style={[styles.accountContainer, styles.borderBottom]}>
          <Row style={styles.logoContainer}>
            <Icon name={IconNameEnum.BigRobot} size={getCustomSize(8)} iconStyle={styles.bigLogo} />
            <View>
              <Text style={styles.currentUsername}>{selectedAccount.name}</Text>
              <Text style={styles.balance}>Total balance</Text>
              <Text style={styles.numbers}>
                987.01 <Text style={styles.dollar}>$</Text>
              </Text>
            </View>
          </Row>
          <Row style={styles.settingsContainer}>
            <Button title="Widget settings" rightIcon={IconNameEnum.WidgetSettings} style={styles.settingsButton} />
            <Button title="Account settings" rightIcon={IconNameEnum.Settings} style={styles.settingsButton} />
          </Row>
        </View>
        <View style={[styles.allAccountsBalanceContainer, styles.borderBottom]}>
          <Text style={styles.balance}>All accounts balance</Text>
          <Row>
            <Text style={styles.allAccountsBalance}>401 987.01 </Text>
            <Text style={styles.allAccountsDollar}>$</Text>
            <Text style={styles.percentage}>10.2%</Text>
            <Icon name={IconNameEnum.Dropup} size={getCustomSize(2)} />
          </Row>
        </View>
        <AccountsList />
      </>
    </Modal>
  );
};
