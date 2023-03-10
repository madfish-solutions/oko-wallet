import { useMemo } from 'react';
import { AccountTypeEnum } from 'shared';

import { useFilteredAccounts } from '../../../../../hooks/use-filtered-accounts.hook';
import { useAllAccountsSelector } from '../../../../../store/wallet/wallet.selectors';
import { AccountsTransformer } from '../interfaces/accounts.interface';

export const useAccountsTransformer = () => {
  const accounts = useAllAccountsSelector();

  const { filteredAccounts, setSearchValue } = useFilteredAccounts(accounts);

  const prepareAccounts = useMemo(
    () =>
      filteredAccounts.reduce(
        (acc: AccountsTransformer, account) => {
          switch (account.type) {
            case AccountTypeEnum.HD_ACCOUNT:
              return {
                ...acc,
                hd: [...acc.hd, account]
              };
            case AccountTypeEnum.IMPORTED_ACCOUNT:
              return {
                ...acc,
                imported: [...acc.imported, account]
              };
            case AccountTypeEnum.LEDGER:
              return {
                ...acc,
                ledger: [...acc.ledger, account]
              };
            default: {
              return acc;
            }
          }
        },
        { hd: [], imported: [], ledger: [] }
      ),
    [filteredAccounts]
  );

  return { accounts: prepareAccounts, setSearchValue };
};
