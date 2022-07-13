import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDispatch } from 'react-redux';

import { RobotIcon } from '../../../../components/robot-icon/robot-icon';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useShelter } from '../../../../hooks/use-shelter.hook';
import { AccountInterface } from '../../../../interfaces/account.interface';
import { changeAccountAction } from '../../../../store/wallet/wallet.actions';
import {
  useAllAccountsSelector,
  useSelectedAccountSelector,
  useSelectedNetworkTypeSelector
} from '../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { checkIsNetworkTypeKeyExist } from '../../../../utils/check-is-network-type-key-exist';
import { ModalAccountBalance } from '../../../components/modal-account-balance/modal-account-balance';
import { ModalFlatList } from '../../../components/modal-flat-list/modal-flat-list';
import { ModalRenderItem } from '../../../components/modal-render-item/modal-render-item';
import { useFlatListRef } from '../../../hooks/use-flat-list-ref.hook';

export const AccountsList = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { createHdAccountForNewNetworkType } = useShelter();
  const selectedAccount = useSelectedAccountSelector();
  const accounts = useAllAccountsSelector();
  const selectedNetworkType = useSelectedNetworkTypeSelector();

  const selectedIndex = accounts.findIndex(account => account.accountIndex === selectedAccount.accountIndex);

  const { flatListRef } = useFlatListRef({ data: accounts, selectedIndex });

  const handleChangeAccount = (account: AccountInterface) => {
    if (checkIsNetworkTypeKeyExist(account, selectedNetworkType)) {
      dispatch(changeAccountAction(account));
    } else {
      createHdAccountForNewNetworkType(account, selectedNetworkType);
    }
  };

  const onAddAccount = () => navigate(ScreensEnum.AddAccount);
  const onEditAccount = (account: AccountInterface) => navigate(ScreensEnum.EditAccount, { account });

  const renderItem = ({ item, index }: ListRenderItemInfo<AccountInterface>) => {
    const isAccountSelected = selectedIndex === index;

    return (
      <ModalRenderItem
        name={item.name}
        icon={<RobotIcon seed={getPublicKeyHash(item, selectedNetworkType)} />}
        isActive={isAccountSelected}
        balanceTitle="Total balance"
        balance={<ModalAccountBalance />}
        onSelectItem={() => handleChangeAccount(item)}
        onEdit={() => onEditAccount(item)}
      />
    );
  };

  return (
    <ModalFlatList onPressAddIcon={onAddAccount} flatListRef={flatListRef} data={accounts} renderItem={renderItem} />
  );
};
