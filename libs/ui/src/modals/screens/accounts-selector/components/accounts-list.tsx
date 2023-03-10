import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import { AccountInterface } from 'shared';

import { AccountType } from '../../../../components/account-type/account-type';
import { CopyText } from '../../../../components/copy-text/copy-text';
import { RobotIcon } from '../../../../components/robot-icon/robot-icon';
import { Selector } from '../../../../components/selector/selector';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useFiatTotalBalance } from '../../../../hooks/use-fiat-total-balance.hook';
import { useFilteredAccounts } from '../../../../hooks/use-filtered-accounts.hook';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { TestIDProps } from '../../../../interfaces/test-id.props';
import { useSelectedNetworkTypeSelector } from '../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { ModalAccountBalance } from '../../../components/modal-account-balance/modal-account-balance';
import { ModalRenderItem } from '../../../components/modal-render-item/modal-render-item';

import { styles } from './accounts-list.styles';

interface Props extends TestIDProps {
  accounts: AccountInterface[];
  selectedAccount: AccountInterface;
  onSelectItem: OnEventFn<AccountInterface>;
  onPressAddIcon?: OnEventFn;
  isShowAccountType?: boolean;
  rightBottomComponent?: React.ReactElement;
  isSearchInitiallyOpened?: boolean;
}

const keyExtractor = (item: AccountInterface) => item.accountId.toString();

export const AccountsList: FC<Props> = ({
  accounts,
  selectedAccount,
  onSelectItem,
  onPressAddIcon,
  isSearchInitiallyOpened = false,
  isShowAccountType = false,
  testID
}) => {
  const { navigate, goBack } = useNavigation();

  const selectedNetworkType = useSelectedNetworkTypeSelector();

  const { accountsBalanceInUsd } = useFiatTotalBalance();

  const { filteredAccounts, setSearchValue, selectedAccountIndex } = useFilteredAccounts(accounts, selectedAccount);

  const onPressSettingsIcon = () => navigate(ScreensEnum.AccountsSettings);

  const renderItem = ({ item, index }: ListRenderItemInfo<AccountInterface>) => {
    const isAccountSelected = selectedAccountIndex === index;
    const publicKeyHash = getPublicKeyHash(item, selectedNetworkType);

    return (
      <ModalRenderItem
        name={item.name}
        icon={<RobotIcon seed={publicKeyHash} />}
        isActive={isAccountSelected}
        balanceTitle="Total balance"
        balance={<ModalAccountBalance balance={accountsBalanceInUsd[item.accountId]} />}
        onSelectItem={() => onSelectItem(item)}
        rightBottomComponent={
          isShowAccountType ? (
            <AccountType type={item.type} />
          ) : (
            <View style={styles.publicKeyHashContainer}>
              <CopyText text={publicKeyHash} />
            </View>
          )
        }
        testID={testID}
      />
    );
  };

  return (
    <Selector
      onPressAddIcon={onPressAddIcon}
      onPressSettingsIcon={onPressSettingsIcon}
      data={filteredAccounts}
      renderItem={renderItem}
      setSearchValue={setSearchValue}
      selectedItemName={selectedAccount.name}
      keyExtractor={keyExtractor}
      selectedIndex={selectedAccountIndex}
      onCancelPress={goBack}
      isSearchInitiallyOpened={isSearchInitiallyOpened}
    />
  );
};
