import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';

import { ScreensEnum, ScreensParamList } from '../../../../../../enums/sreens.enum';
import { useNavigation } from '../../../../../../hooks/use-navigation.hook';
import { usePreviousScreenName } from '../../../../../../hooks/use-previous-screen-name.hook';
import { useShelter } from '../../../../../../hooks/use-shelter.hook';
import { AccountInterface } from '../../../../../../interfaces/account.interface';
import { ModalContainer } from '../../../../../../modals/components/modal-container/modal-container';
import { AccountsList } from '../../../../../../modals/screens/accounts-selector/components/accounts-list';
import {
  useAllVisibleAccountsSelector,
  useSelectedAccountSelector,
  useSelectedNetworkTypeSelector
} from '../../../../../../store/wallet/wallet.selectors';
import { checkIsNetworkTypeKeyExist } from '../../../../../../utils/check-is-network-type-key-exist';

export const AccountsSelector: FC = () => {
  const { createHdAccountForNewNetworkType } = useShelter();
  const { navigate } = useNavigation();
  const route = useRoute<RouteProp<ScreensParamList, ScreensEnum.SendAccountsSelector>>();
  const selectedNetworkType = useSelectedNetworkTypeSelector();
  const allAccounts = useAllVisibleAccountsSelector();
  const currentSelectedAccount = useSelectedAccountSelector();
  const accountsWithoutCurrent = allAccounts.filter(account => account.accountId !== currentSelectedAccount.accountId);
  const previousScreen = usePreviousScreenName();

  const navigateToSend = (account: AccountInterface) => {
    const isSendScreen = previousScreen === ScreensEnum.SendToken || previousScreen === ScreensEnum.SendCollectible;

    if (isSendScreen) {
      navigate(previousScreen, { account });
    }
  };

  const onSelectAccount = (account: AccountInterface) => {
    if (checkIsNetworkTypeKeyExist(account, selectedNetworkType)) {
      navigateToSend(account);
    } else {
      createHdAccountForNewNetworkType(account, selectedNetworkType, navigateToSend, false);
    }
  };

  return (
    <ModalContainer screenTitle="Select Account">
      <AccountsList
        accounts={accountsWithoutCurrent}
        selectedAccount={route.params.account}
        onSelectItem={onSelectAccount}
        isSearchInitiallyOpened
      />
    </ModalContainer>
  );
};
