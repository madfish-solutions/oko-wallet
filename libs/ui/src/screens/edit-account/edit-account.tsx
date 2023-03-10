import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AccountTypeEnum } from 'shared';
import { derivationPathByNetworkType } from 'shelter';

import { AccountType } from '../../components/account-type/account-type';
import { CopyText } from '../../components/copy-text/copy-text';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { RobotIcon } from '../../components/robot-icon/robot-icon';
import { Row } from '../../components/row/row';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { Switch } from '../../components/switch/switch';
import { Text } from '../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useCopyToClipboard } from '../../hooks/use-copy-to-clipboard.hook';
import { useFiatTotalBalance } from '../../hooks/use-fiat-total-balance.hook';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { ModalAccountBalance } from '../../modals/components/modal-account-balance/modal-account-balance';
import { AccountBalanceEnum } from '../../modals/components/modal-account-balance/themes';
import { ModalHeader } from '../../modals/components/modal-header/modal-header';
import { changeAccountVisibilityAction } from '../../store/wallet/wallet.actions';
import {
  useAllHdAccountsSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkTypeSelector,
  useUserAccountSelector
} from '../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../store/wallet/wallet.utils';
import { getCustomSize } from '../../styles/format-size';
import { Item } from '../settings/components/item/item';
import { ItemContainer } from '../settings/components/item-container/item-container';

import { styles } from './edit-account.styles';
import { EditAccountTestIDs } from './tests/edit-account.test-ids';

export const EditAccount: FC = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.EditAccount>>();
  const { goBack, navigate } = useNavigation();
  const dispatch = useDispatch();

  const hdAccounts = useAllHdAccountsSelector();
  const publicKeyHashOfSelectedAccount = useSelectedAccountPublicKeyHashSelector();
  const networkType = useSelectedNetworkTypeSelector();
  const account = useUserAccountSelector(params.publicKeyHash);

  const { accountsBalanceInUsd } = useFiatTotalBalance();

  const publicKeyHashOfEditAccount = getPublicKeyHash(account, networkType);

  const hdAccountDerivationPath = useMemo(() => {
    const currentAccountIndex = hdAccounts.findIndex(
      hdAccount => getPublicKeyHash(hdAccount, networkType) === publicKeyHashOfEditAccount
    );

    return derivationPathByNetworkType[networkType](currentAccountIndex);
  }, [account, hdAccounts]);

  const copy = useCopyToClipboard({ text: hdAccountDerivationPath });

  const totalBalanceOfSelectedAccount = accountsBalanceInUsd[account.accountId];

  const changeAccountVisibility = () => dispatch(changeAccountVisibilityAction(account.accountId));
  const navigateToEditAccountName = () => navigate(ScreensEnum.EditAccountName, { account });
  const navigateToConfirmAccess = () =>
    navigate(ScreensEnum.ConfirmAccess, {
      destination: {
        screen: ScreensEnum.RevealPrivateKey,
        options: {
          publicKeyHash: getPublicKeyHash(account, networkType)
        }
      },
      descriptionText: 'Enter your password to reveal private key',
      submitButtonText: 'reveal private key'
    });

  const isImportedAccount = account.type === AccountTypeEnum.IMPORTED_ACCOUNT;
  const isDisabledChangeAccountVisibility = publicKeyHashOfEditAccount === publicKeyHashOfSelectedAccount;

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Edit Account" onBackButtonPress={goBack} testID={EditAccountTestIDs.EditAccountTitle} />
      </HeaderContainer>

      <View style={styles.root}>
        <ModalHeader
          name={account.name}
          balanceTitle="Total balance"
          icon={<RobotIcon seed={getPublicKeyHash(account, networkType)} size={getCustomSize(6)} />}
          balance={<ModalAccountBalance balance={totalBalanceOfSelectedAccount} theme={AccountBalanceEnum.medium} />}
          rightTopComponent={<AccountType type={account.type} />}
          rightBottomComponent={
            <View style={styles.publicKeyHashContainer}>
              <CopyText text={publicKeyHashOfEditAccount} />
            </View>
          }
          style={styles.accountData}
        />

        <ItemContainer style={styles.item}>
          <Item title="Display" onPress={changeAccountVisibility} disabled={isDisabledChangeAccountVisibility}>
            <Switch
              isActive={account.isVisible}
              onPress={changeAccountVisibility}
              disabled={isDisabledChangeAccountVisibility}
              triggerAnimation
            />
          </Item>
        </ItemContainer>

        <ItemContainer style={styles.item}>
          <Item title="Edit Name" onPress={navigateToEditAccountName} />
        </ItemContainer>

        <ItemContainer style={styles.item}>
          <Item
            title="Reveal Private Key"
            onPress={navigateToConfirmAccess}
            testID={EditAccountTestIDs.RevealPrivateKeyButton}
          />
        </ItemContainer>

        {!isImportedAccount && (
          <ItemContainer style={styles.item}>
            <Item title="Derivation Path" onPress={copy}>
              <Row>
                <Text style={styles.derivationPath}>{hdAccountDerivationPath}</Text>
                <Icon name={IconNameEnum.Copy} />
              </Row>
            </Item>
          </ItemContainer>
        )}
      </View>

      <NavigationBar />
    </ScreenContainer>
  );
};
