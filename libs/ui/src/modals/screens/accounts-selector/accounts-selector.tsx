import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { ButtonWithIcon } from '../../../components/button-with-icon/button-with-icon';
import { ButtonWithIconSizeEnum, ButtonWithIconThemesEnum } from '../../../components/button-with-icon/enums';
import { Column } from '../../../components/column/column';
import { Divider } from '../../../components/divider/divider';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { RobotIcon } from '../../../components/robot-icon/robot-icon';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ScreensEnum } from '../../../enums/sreens.enum';
import { useFiatTotalBalance } from '../../../hooks/use-fiat-total-balance.hook';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useShelter } from '../../../hooks/use-shelter.hook';
import { AccountInterface } from '../../../interfaces/account.interface';
import { changeAccountAction } from '../../../store/wallet/wallet.actions';
import {
  useAllVisibleAccountsSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedAccountSelector,
  useSelectedNetworkTypeSelector
} from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { checkIsNetworkTypeKeyExist } from '../../../utils/check-is-network-type-key-exist';
import { ModalAccountBalance } from '../../components/modal-account-balance/modal-account-balance';
import { ModalContainer } from '../../components/modal-container/modal-container';
import { ModalHeader } from '../../components/modal-header/modal-header';

import { styles } from './accounts-selector.styles';
import { AccountsList } from './components/accounts-list';

export const AccountsSelector: FC = () => {
  const { createHdAccountForNewNetworkType } = useShelter();
  const { navigate, goBack } = useNavigation();
  const dispatch = useDispatch();
  const selectedAccount = useSelectedAccountSelector();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const accounts = useAllVisibleAccountsSelector();
  const selectedNetworkType = useSelectedNetworkTypeSelector();
  const { totalAccountsBalance, accountsBalanceInUsd } = useFiatTotalBalance();

  const totalBalanceOfSelectedAccount = accountsBalanceInUsd[selectedAccount.name];

  const handleChangeAccount = (account: AccountInterface) => {
    if (checkIsNetworkTypeKeyExist(account, selectedNetworkType)) {
      dispatch(changeAccountAction(account));
    } else {
      createHdAccountForNewNetworkType(account, selectedNetworkType);
    }
    goBack();
  };

  const onAddAccount = () => navigate(ScreensEnum.AddAccount);
  const onEditAccount = (account: AccountInterface) => navigate(ScreensEnum.EditAccount, { account });

  const onWidgetSettings = () => null;
  const onAccountSettings = () => null;

  return (
    <ModalContainer screenTitle="Accounts">
      <Column style={styles.headerWrapper}>
        <ModalHeader
          name={selectedAccount.name}
          balanceTitle="Total balance"
          icon={<RobotIcon seed={publicKeyHash} size={getCustomSize(6)} />}
          balance={<ModalAccountBalance balance={totalBalanceOfSelectedAccount} />}
          style={styles.header}
        />
        <Row style={styles.buttonsContainer}>
          <ButtonWithIcon
            title="Widget settings"
            theme={ButtonWithIconThemesEnum.Secondary}
            size={ButtonWithIconSizeEnum.Medium}
            onPress={onWidgetSettings}
            rightIcon={IconNameEnum.GridSettings}
            style={styles.button}
          />
          <ButtonWithIcon
            title="Account settings"
            theme={ButtonWithIconThemesEnum.Secondary}
            size={ButtonWithIconSizeEnum.Medium}
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
          <Text style={styles.accountsBalance}>{totalAccountsBalance}</Text>
          <Text style={styles.accountsBalanceCurrency}>$</Text>
        </Row>
      </Column>
      <Divider size={getCustomSize(0.5)} style={styles.divider} />

      <AccountsList
        onSelectItem={handleChangeAccount}
        onEdit={onEditAccount}
        onPressAddIcon={onAddAccount}
        selectedAccount={selectedAccount}
        accounts={accounts}
      />
    </ModalContainer>
  );
};
