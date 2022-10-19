import { isEmptyString } from '@rnw-community/shared';
import React, { FC } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '../../../../../../components/button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../../../../../../components/button/enums';
import { CopyText } from '../../../../../../components/copy-text/copy-text';
import { IconWithBorderEnum } from '../../../../../../components/icon-with-border/enums';
import { IconWithBorder } from '../../../../../../components/icon-with-border/icon-with-border';
import { EmptySearchIcon } from '../../../../../../components/icon/components/empty-search-icon/empty-search-icon';
import { IconNameEnum } from '../../../../../../components/icon/icon-name.enum';
import { RobotIcon } from '../../../../../../components/robot-icon/robot-icon';
import { Row } from '../../../../../../components/row/row';
import { SearchPanel } from '../../../../../../components/search-panel/search-panel';
import { Switch } from '../../../../../../components/switch/switch';
import { Text } from '../../../../../../components/text/text';
import { TouchableIcon } from '../../../../../../components/touchable-icon/touchable-icon';
import { ScreensEnum } from '../../../../../../enums/sreens.enum';
import { useFilteredAccounts } from '../../../../../../hooks/use-filtered-accounts.hook';
import { useNavigation } from '../../../../../../hooks/use-navigation.hook';
import { useShelter } from '../../../../../../hooks/use-shelter.hook';
import { AccountInterface } from '../../../../../../interfaces/account.interface';
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
  const selectedAccount = useSelectedAccountSelector();
  const selectedNetworkType = useSelectedNetworkTypeSelector();
  const networkType = useSelectedNetworkTypeSelector();

  const { filteredAccounts, setSearchValue, selectedAccountIndex } = useFilteredAccounts(accounts, selectedAccount);

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
    const isAccountSelected = selectedAccountIndex === index;
    const publicKeyHash = getPublicKeyHash(account, selectedNetworkType);
    const isPublicKeyHashNotGenerated = isEmptyString(publicKeyHash);
    const { name, isVisible, accountIndex } = account;

    return (
      <View style={[styles.item, index === 0 && styles.itemBorderTop]}>
        <Row style={[styles.upperContainer, styles.spaceBetween]}>
          <Row style={styles.nameContainer}>
            <IconWithBorder type={IconWithBorderEnum.Quinary} style={styles.robotIcon}>
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
            size={ButtonSizeEnum.Auto}
          />
        </Row>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {!filteredAccounts.length && (
        <View>
          <EmptySearchIcon style={styles.emptySearchIcon} />
        </View>
      )}

      {children}

      <SearchPanel
        setSearchValue={setSearchValue}
        isEmptyList={false}
        isSearchInitiallyOpened
        style={styles.searchPanel}
      />

      <FlatList
        data={filteredAccounts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
