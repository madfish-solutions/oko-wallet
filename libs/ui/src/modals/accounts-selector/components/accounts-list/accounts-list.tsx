import React, { useEffect, useRef } from 'react';
import { FlatList, Pressable, Text, View, ListRenderItemInfo } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { useShelter } from '../../../../hooks/use-shelter.hook';
import { AccountInterface } from '../../../../interfaces/account.interface';
import { changeAccountAction } from '../../../../store/wallet/wallet.actions';
import {
  useAllAccountsSelector,
  useSelectedAccountSelector,
  useSelectedNetworkTypeSelector
} from '../../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../../styles/format-size';
import { checkIsNetworkTypeKeyExist } from '../../../../utils/check-is-network-type-key-exist';

import { styles } from './accounts-list.styles';
import { userDetailsTotalHeight } from './constants/dimensions';

export const AccountsList = () => {
  const flatListRef = useRef<FlatList>(null);
  const dispatch = useDispatch();
  const { createHdAccount, createHdAccountForNewNetworkType } = useShelter();
  const selectedAccount = useSelectedAccountSelector();
  const accounts = useAllAccountsSelector();
  const selectedNetworkType = useSelectedNetworkTypeSelector();

  const handleChangeAccount = (account: AccountInterface) => {
    if (checkIsNetworkTypeKeyExist(account, selectedNetworkType)) {
      dispatch(changeAccountAction(account));
    } else {
      createHdAccountForNewNetworkType(account, selectedNetworkType);
    }
  };

  const selectedIndex = accounts.findIndex(account => account.accountIndex === selectedAccount.accountIndex);

  const renderAccount = ({ item: account, index }: ListRenderItemInfo<AccountInterface>) => {
    const isAccountSelected = selectedIndex === index;

    return (
      <Pressable
        style={[styles.userDetails, isAccountSelected && styles.selectedAccount]}
        onPress={() => handleChangeAccount(account)}
      >
        <Row style={styles.checkboxContainer}>
          <Row>
            <Icon name={IconNameEnum.SmallRobot} iconStyle={styles.logo} size={getCustomSize(4)} />
            <Text style={styles.currentUsername}>{account.name}</Text>
          </Row>
          {isAccountSelected ? (
            <Icon name={IconNameEnum.SelectedCheckbox} />
          ) : (
            <Icon name={IconNameEnum.EmptyCheckbox} />
          )}
        </Row>
        <Row style={styles.editContainer}>
          <View>
            <Text style={styles.balance}>Total balance</Text>
            <Row>
              <Text style={styles.amount}>987.01</Text>
              <Row style={styles.currencyContainer}>
                <Text style={styles.currency}>$</Text>
              </Row>
            </Row>
          </View>
          <Icon name={IconNameEnum.Edit} />
        </Row>
      </Pressable>
    );
  };

  const getItemLayout = (data: AccountInterface[] | null | undefined, index: number) => ({
    length: userDetailsTotalHeight,
    offset: userDetailsTotalHeight * index,
    index
  });

  useEffect(() => {
    const scrollToSelectedIndex = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));

      flatListRef.current?.scrollToIndex({ index: selectedIndex, animated: true });
    };

    scrollToSelectedIndex();
  }, [accounts]);

  return (
    <View style={styles.root}>
      <Row style={styles.iconsContainer}>
        <Icon name={IconNameEnum.Search} />

        {/*TODO CHANGE ON TOUCHABLE ICON WHEN MERGED*/}
        <Pressable onPress={createHdAccount}>
          <Icon name={IconNameEnum.Add} />
        </Pressable>
      </Row>
      <FlatList
        ref={flatListRef}
        getItemLayout={getItemLayout}
        data={accounts}
        showsVerticalScrollIndicator={false}
        renderItem={renderAccount}
      />
    </View>
  );
};
