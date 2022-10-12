import { isEmptyString } from '@rnw-community/shared';
import React, { FC, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '../../../../../../components/button/button';
import { ButtonThemesEnum } from '../../../../../../components/button/enums';
import { CopyText } from '../../../../../../components/copy-text/copy-text';
import { IconWithBorderEnum } from '../../../../../../components/icon-with-border/enums';
import { IconWithBorder } from '../../../../../../components/icon-with-border/icon-with-border';
import { IconNameEnum } from '../../../../../../components/icon/icon-name.enum';
import { RobotIcon } from '../../../../../../components/robot-icon/robot-icon';
import { Row } from '../../../../../../components/row/row';
import { SearchPanel } from '../../../../../../components/search-panel/search-panel';
import { Switch } from '../../../../../../components/switch/switch';
import { Text } from '../../../../../../components/text/text';
import { TouchableIcon } from '../../../../../../components/touchable-icon/touchable-icon';
import { EMPTY_STRING } from '../../../../../../constants/defaults';
import { AccountInterface } from '../../../../../../interfaces/account.interface';
import { useListSearch } from '../../../../../../modals/hooks/use-list-search.hook';
import { changeAccountVisibilityAction } from '../../../../../../store/wallet/wallet.actions';
import {
  useAllAccountsSelector,
  useSelectedAccountSelector,
  useSelectedNetworkTypeSelector
} from '../../../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../../../store/wallet/wallet.utils';

import { styles } from './hd-accounts.styles';

const keyExtractor = (account: AccountInterface) => account.accountIndex.toString();

export const HdAccounts: FC = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const accounts = useAllAccountsSelector();
  const selectedAccount = useSelectedAccountSelector();
  const selectedNetworkType = useSelectedNetworkTypeSelector();

  const filteredList = useListSearch(searchValue, accounts);

  const selectedIndex = useMemo(
    () => filteredList.findIndex(account => account.accountIndex === selectedAccount.accountIndex),
    [filteredList, selectedAccount]
  );

  const changeAccountVisibility = (accountIndex: number) => dispatch(changeAccountVisibilityAction(accountIndex));

  const renderItem = ({ item, index }: ListRenderItemInfo<AccountInterface>) => {
    const isAccountSelected = selectedIndex === index;
    const currentPublicKeyHash = getPublicKeyHash(item, selectedNetworkType);
    const isPublicKeyHashNotGenerated = isEmptyString(currentPublicKeyHash);
    const { name, isVisible, accountIndex } = item;

    return (
      <View style={styles.item}>
        <Row style={[styles.upperContainer, styles.spaceBetween]}>
          <Row style={styles.nameContainer}>
            <IconWithBorder type={IconWithBorderEnum.Quinary} style={styles.robotIconWithBorder}>
              <RobotIcon seed={currentPublicKeyHash} />
            </IconWithBorder>

            <Text style={styles.text} numberOfLines={1}>
              {name}
            </Text>
          </Row>

          <Row>
            <TouchableIcon name={IconNameEnum.Edit} style={styles.editIcon} />
            <Switch
              isActive={isVisible}
              disabled={isAccountSelected}
              onPress={() => changeAccountVisibility(accountIndex)}
            />
          </Row>
        </Row>

        <Row style={styles.spaceBetween}>
          {isPublicKeyHashNotGenerated ? (
            <View style={styles.notGeneratedContainer}>
              <Text style={styles.notGeneratedText}>Not generated</Text>
            </View>
          ) : (
            <CopyText text={currentPublicKeyHash} />
          )}
          <Button title="Reveal Private Key" theme={ButtonThemesEnum.Ternary} style={styles.buttonPrivateKey} />
        </Row>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <Button title="Reveal Seed Phrase" style={styles.button} styleText={styles.buttonText} />
      <SearchPanel
        setSearchValue={setSearchValue}
        isEmptyList={false}
        isSearchInitiallyOpened
        emptyIconStyle={styles.emptyIcon}
      />

      <FlatList data={accounts} keyExtractor={keyExtractor} renderItem={renderItem} />
    </View>
  );
};
