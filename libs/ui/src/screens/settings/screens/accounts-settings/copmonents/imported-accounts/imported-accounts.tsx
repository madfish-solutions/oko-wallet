import React, { FC } from 'react';

import { Announcement } from '../../../../../../components/announcement/announcement';
import {
  useAllImportedAccountsSelector,
  useSelectedNetworkTypeSelector
} from '../../../../../../store/wallet/wallet.selectors';
import { AccountsContainer } from '../accounts-container/accounts-container';

import { styles } from './imported-accounts.styles';

export const ImportedAccounts: FC = () => {
  const networkType = useSelectedNetworkTypeSelector();
  const importedAccounts = useAllImportedAccountsSelector(networkType);

  return (
    <AccountsContainer accounts={importedAccounts}>
      <Announcement
        text={`Only accounts compatible with the current network type are displayed: ${networkType}`}
        style={styles.announcement}
      />
    </AccountsContainer>
  );
};
