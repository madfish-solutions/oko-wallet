import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { AccountInterface } from 'shared';

import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useCreateHdAccountForNewNetworkType } from '../../../shelter/hooks/use-create-hd-account-for-new-network-type.hook';
import { changeAccountAction } from '../../../store/wallet/wallet.actions';
import {
  useAllVisibleAccountsSelector,
  useSelectedAccountSelector,
  useSelectedNetworkTypeSelector
} from '../../../store/wallet/wallet.selectors';
import { checkIsNetworkTypeKeyExist } from '../../../utils/check-is-network-type-key-exist';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { AccountsSelectorTestIDs } from './accounts-selector.test-ids';
import { AccountsList } from './components/accounts-list';

export const AccountsSelector: FC = () => {
  const createHdAccountForNewNetworkType = useCreateHdAccountForNewNetworkType();
  const { navigate, goBack } = useNavigation();
  const dispatch = useDispatch();
  const selectedAccount = useSelectedAccountSelector();
  const accounts = useAllVisibleAccountsSelector();
  const selectedNetworkType = useSelectedNetworkTypeSelector();

  const handleChangeAccount = (account: AccountInterface) => {
    if (checkIsNetworkTypeKeyExist(account, selectedNetworkType)) {
      dispatch(changeAccountAction(account));
    } else {
      createHdAccountForNewNetworkType(account, selectedNetworkType);
    }

    navigate(ScreensEnum.Wallet);
  };

  const onAddAccount = () => navigate(ScreensEnum.AddAccount);

  return (
    <ModalContainer
      screenTitle="My Accounts"
      onHeaderCloseButtonPress={goBack}
      testID={AccountsSelectorTestIDs.AccountsScreenTitle}
    >
      <AccountsList
        onSelectItem={handleChangeAccount}
        onPressAddIcon={onAddAccount}
        selectedAccount={selectedAccount}
        accounts={accounts}
        isShowAccountType
        testID={AccountsSelectorTestIDs.AccountsTabs}
      />
    </ModalContainer>
  );
};
