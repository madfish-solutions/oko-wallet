import { AccountTypeEnum } from 'shared';

import { IconNameEnum } from '../components/icon/icon-name.enum';

export const getIconName = (type: AccountTypeEnum): IconNameEnum => {
  switch (type) {
    case AccountTypeEnum.IMPORTED_ACCOUNT: {
      return IconNameEnum.ImportedAccount;
    }
    case AccountTypeEnum.LEDGER: {
      return IconNameEnum.LedgerAccount;
    }
    default: {
      return IconNameEnum.HdAccount;
    }
  }
};
