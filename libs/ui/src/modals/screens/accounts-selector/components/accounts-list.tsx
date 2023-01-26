import { isDefined, OnEventFn, isNotEmptyString } from '@rnw-community/shared';
import React, { FC } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import { TestIDProps } from 'src/interfaces/test-id.props';

import { CopyText } from '../../../../components/copy-text/copy-text';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { RobotIcon } from '../../../../components/robot-icon/robot-icon';
import { Selector } from '../../../../components/selector/selector';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { useFiatTotalBalance } from '../../../../hooks/use-fiat-total-balance.hook';
import { useFilteredAccounts } from '../../../../hooks/use-filtered-accounts.hook';
import { AccountInterface } from '../../../../interfaces/account.interface';
import { useSelectedNetworkTypeSelector } from '../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { ModalAccountBalance } from '../../../components/modal-account-balance/modal-account-balance';
import { ModalRenderItem } from '../../../components/modal-render-item/modal-render-item';

import { styles } from './accounts-list.styles';

interface Props extends TestIDProps {
  accounts: AccountInterface[];
  selectedAccount: AccountInterface;
  onSelectItem: OnEventFn<AccountInterface>;
  onEdit?: OnEventFn<AccountInterface>;
  onPressAddIcon?: OnEventFn;
  isSearchInitiallyOpened?: boolean;
}

const keyExtractor = (item: AccountInterface) => item.accountId.toString();

export const AccountsList: FC<Props> = ({
  accounts,
  selectedAccount,
  onSelectItem,
  onEdit,
  onPressAddIcon,
  isSearchInitiallyOpened = false,
  testID
}) => {
  const { accountsBalanceInUsd } = useFiatTotalBalance();
  const selectedNetworkType = useSelectedNetworkTypeSelector();

  const { filteredAccounts, setSearchValue, selectedAccountIndex } = useFilteredAccounts(accounts, selectedAccount);

  const renderItem = ({ item, index }: ListRenderItemInfo<AccountInterface>) => {
    const isAccountSelected = selectedAccountIndex === index;
    const publicKeyHash = getPublicKeyHash(item, selectedNetworkType);

    return (
      <ModalRenderItem
        testID={testID}
        name={item.name}
        icon={<RobotIcon seed={publicKeyHash} />}
        isActive={isAccountSelected}
        balanceTitle="Total balance"
        balance={<ModalAccountBalance balance={accountsBalanceInUsd[item.accountId]} />}
        onSelectItem={() => onSelectItem(item)}
        rightBottomComponent={
          isDefined(onEdit) ? (
            <TouchableIcon name={IconNameEnum.Edit} onPress={() => onEdit(item)} />
          ) : (
            <>
              {isNotEmptyString(publicKeyHash) && (
                <View style={styles.publicKeyHashContainer}>
                  <CopyText text={publicKeyHash} />
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
      data={filteredAccounts}
      renderItem={renderItem}
      setSearchValue={setSearchValue}
      selectedItemName={selectedAccount.name}
      keyExtractor={keyExtractor}
      selectedIndex={selectedAccountIndex}
      isSearchInitiallyOpened={isSearchInitiallyOpened}
    />
  );
};
