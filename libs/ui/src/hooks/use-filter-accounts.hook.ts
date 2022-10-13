import { useMemo, useState } from 'react';

import { EMPTY_STRING } from '../constants/defaults';
import { AccountInterface } from '../interfaces/account.interface';
import { useSelectedNetworkTypeSelector } from '../store/wallet/wallet.selectors';

export const useFilterAccounts = (accounts: AccountInterface[], selectedAccount: AccountInterface) => {
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const networkType = useSelectedNetworkTypeSelector();

  const filteredAccounts = useMemo(() => {
    if (searchValue) {
      return accounts.filter(
        account =>
          account.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          account.networksKeys[networkType]?.publicKeyHash === searchValue
      );
    }

    return accounts;
  }, [searchValue, accounts, networkType]);

  const selectedIndexAccount = useMemo(
    () => filteredAccounts.findIndex(account => account.accountIndex === selectedAccount.accountIndex),
    [filteredAccounts, selectedAccount]
  );

  return { filteredAccounts, selectedIndexAccount, setSearchValue };
};
