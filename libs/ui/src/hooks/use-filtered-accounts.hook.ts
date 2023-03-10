import { isDefined } from '@rnw-community/shared';
import { isAddress } from 'ethers/lib/utils';
import { useMemo, useState } from 'react';
import { AccountInterface } from 'shared';

import { EMPTY_STRING } from '../constants/defaults';
import { useSelectedNetworkTypeSelector } from '../store/wallet/wallet.selectors';

export const useFilteredAccounts = (accounts: AccountInterface[], selectedAccount?: AccountInterface) => {
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const networkType = useSelectedNetworkTypeSelector();

  const filteredAccounts = useMemo(() => {
    if (searchValue) {
      return accounts.filter(
        account =>
          account.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          (isAddress(searchValue) &&
            account.networksKeys[networkType]?.publicKeyHash.toLowerCase().includes(searchValue.toLowerCase()))
      );
    }

    return accounts;
  }, [searchValue, accounts, networkType]);

  const selectedAccountIndex = useMemo(
    () =>
      isDefined(selectedAccount)
        ? filteredAccounts.findIndex(account => account.accountId === selectedAccount.accountId)
        : 0,
    [filteredAccounts, selectedAccount]
  );

  return { filteredAccounts, selectedAccountIndex, setSearchValue };
};
