import React, { FC } from 'react';

import { Announcement } from '../../../../../../components/announcement/announcement';
import { useSelectedNetworkTypeSelector } from '../../../../../../store/wallet/wallet.selectors';
import { AccountsContainer } from '../accounts-container/accounts-container';

import { styles } from './imported-accounts.styles';

export const ImportedAccounts: FC = () => {
  const networkType = useSelectedNetworkTypeSelector();

  return (
    <AccountsContainer accounts={[]}>
      <Announcement
        text={`Only accounts compatible with the current network type are displayed: ${networkType}`}
        style={styles.announcement}
      />
    </AccountsContainer>
  );
};
