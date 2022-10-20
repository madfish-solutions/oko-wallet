import { isDefined, OnEventFn, isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useMemo, useState } from 'react';
import { ListRenderItemInfo, View } from 'react-native';

import { CopyText } from '../../../../components/copy-text/copy-text';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { RobotIcon } from '../../../../components/robot-icon/robot-icon';
import { Selector } from '../../../../components/selector/selector';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { EMPTY_STRING } from '../../../../constants/defaults';
import { useFiatTotalBalance } from '../../../../hooks/use-fiat-total-balance.hook';
import { AccountInterface } from '../../../../interfaces/account.interface';
import { useSelectedNetworkTypeSelector } from '../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { ModalAccountBalance } from '../../../components/modal-account-balance/modal-account-balance';
import { ModalRenderItem } from '../../../components/modal-render-item/modal-render-item';
import { useListSearch } from '../../../hooks/use-list-search.hook';

import { styles } from './accounts-list.styles';

interface Props {
  accounts: AccountInterface[];
  selectedAccount: AccountInterface;
  onSelectItem: OnEventFn<AccountInterface>;
  onEdit?: OnEventFn<AccountInterface>;
  onPressAddIcon?: OnEventFn;
  isSearchInitiallyOpened?: boolean;
}

const keyExtractor = (item: AccountInterface) => item.name;

export const AccountsList: FC<Props> = ({
  accounts,
  selectedAccount,
  onSelectItem,
  onEdit,
  onPressAddIcon,
  isSearchInitiallyOpened = false
}) => {
  const { accountsBalanceInUsd } = useFiatTotalBalance();
  const selectedNetworkType = useSelectedNetworkTypeSelector();

  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  const filteredList = useListSearch(searchValue, accounts);

  const selectedIndex = useMemo(
    () => filteredList.findIndex(account => account.accountId === selectedAccount.accountId),
    [filteredList, selectedAccount]
  );

  const renderItem = ({ item, index }: ListRenderItemInfo<AccountInterface>) => {
    const isAccountSelected = selectedIndex === index;
    const currentPublicKeyHash = getPublicKeyHash(item, selectedNetworkType);

    return (
      <ModalRenderItem
        name={item.name}
        icon={<RobotIcon seed={currentPublicKeyHash} />}
        isActive={isAccountSelected}
        balanceTitle="Total balance"
        balance={<ModalAccountBalance balance={accountsBalanceInUsd[item.name]} />}
        onSelectItem={() => onSelectItem(item)}
        rightBottomComponent={
          isDefined(onEdit) ? (
            <TouchableIcon name={IconNameEnum.Edit} onPress={() => onEdit(item)} />
          ) : (
            <>
              {isNotEmptyString(currentPublicKeyHash) && (
                <View style={styles.publicKeyHashContainer}>
                  <CopyText text={currentPublicKeyHash} />
                </View>
              )}
            </>
          )
        }
      />
    );
  };

  return (
    <Selector
      onPressAddIcon={onPressAddIcon}
      data={filteredList}
      renderItem={renderItem}
      setSearchValue={setSearchValue}
      selectedItemName={selectedAccount.name}
      keyExtractor={keyExtractor}
      selectedIndex={selectedIndex}
      isSearchInitiallyOpened={isSearchInitiallyOpened}
    />
  );
};
