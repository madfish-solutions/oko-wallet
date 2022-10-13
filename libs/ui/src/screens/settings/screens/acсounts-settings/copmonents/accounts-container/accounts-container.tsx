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
import { ScreensEnum } from '../../../../../../enums/sreens.enum';
import { useNavigation } from '../../../../../../hooks/use-navigation.hook';
import { useShelter } from '../../../../../../hooks/use-shelter.hook';
import { AccountInterface } from '../../../../../../interfaces/account.interface';
import { useListSearch } from '../../../../../../modals/hooks/use-list-search.hook';
import { changeAccountVisibilityAction } from '../../../../../../store/wallet/wallet.actions';
import {
  useSelectedAccountSelector,
  useSelectedNetworkTypeSelector
} from '../../../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../../../store/wallet/wallet.utils';

import { styles } from './accounts-container.styles';

interface Props {
  accounts: AccountInterface[];
}

const keyExtractor = (account: AccountInterface) => account.accountIndex.toString();

export const AccountsContainer: FC<Props> = ({ accounts, children }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { createHdAccountForNewNetworkType } = useShelter();
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const selectedAccount = useSelectedAccountSelector();
  const selectedNetworkType = useSelectedNetworkTypeSelector();
  const networkType = useSelectedNetworkTypeSelector();

  const filteredList = useListSearch(searchValue, accounts);

  const selectedIndex = useMemo(
    () => filteredList.findIndex(account => account.accountIndex === selectedAccount.accountIndex),
    [filteredList, selectedAccount]
  );

  const changeAccountVisibility = (accountIndex: number) => dispatch(changeAccountVisibilityAction(accountIndex));

  const navigateToEditAccount = (account: AccountInterface) => navigate(ScreensEnum.EditAccount, { account });

  const navigateToRevealPrivateKey = (publicKeyHash: string) =>
    navigate(ScreensEnum.RevealPrivateKey, { publicKeyHash });

  const onRevealPrivateKeyPress = (
    account: AccountInterface,
    publicKeyHash: string,
    isPublicKeyHashNotGenerated: boolean
  ) => {
    if (isPublicKeyHashNotGenerated) {
      createHdAccountForNewNetworkType(
        account,
        networkType,
        account => navigateToRevealPrivateKey(getPublicKeyHash(account, networkType)),
        false
      );
    } else {
      navigateToRevealPrivateKey(publicKeyHash);
    }
  };

  const renderItem = ({ item: account, index }: ListRenderItemInfo<AccountInterface>) => {
    const isAccountSelected = selectedIndex === index;
    const publicKeyHash = getPublicKeyHash(account, selectedNetworkType);
    const isPublicKeyHashNotGenerated = isEmptyString(publicKeyHash);
    const { name, isVisible, accountIndex } = account;

    return (
      <View style={styles.item}>
        <Row style={[styles.upperContainer, styles.spaceBetween]}>
          <Row style={styles.nameContainer}>
            <IconWithBorder type={IconWithBorderEnum.Quinary} style={styles.robotIconWithBorder}>
              <RobotIcon seed={publicKeyHash} />
            </IconWithBorder>

            <Text style={styles.text} numberOfLines={1}>
              {name}
            </Text>
          </Row>

          <Row>
            <TouchableIcon
              name={IconNameEnum.Edit}
              onPress={() => navigateToEditAccount(account)}
              style={styles.editIcon}
            />
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
            <CopyText text={publicKeyHash} />
          )}
          <Button
            title="Reveal Private Key"
            onPress={() => onRevealPrivateKeyPress(account, publicKeyHash, isPublicKeyHashNotGenerated)}
            theme={ButtonThemesEnum.Ternary}
            style={styles.buttonPrivateKey}
          />
        </Row>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {children}

      <SearchPanel
        setSearchValue={setSearchValue}
        isEmptyList={!filteredList.length}
        isSearchInitiallyOpened
        style={styles.searchPanel}
        emptyIconStyle={styles.emptyIcon}
      />

      <FlatList
        data={filteredList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
