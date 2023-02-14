import React, { useCallback, useMemo, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Selector } from '../../../../components/selector/selector';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { EMPTY_STRING } from '../../../../constants/defaults';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { NetworkInterface } from '../../../../interfaces/network.interface';
import { useCreateHdAccountForNewNetworkType } from '../../../../shelter/hooks/use-create-hd-account-for-new-network-type.hook';
import { changeNetworkAction } from '../../../../store/wallet/wallet.actions';
import {
  useAccountsGasTokensSelector,
  useAllNetworksSelector,
  useSelectedAccountSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { getAccountTokensSlug } from '../../../../utils/address.util';
import { checkIsNetworkTypeKeyExist } from '../../../../utils/check-is-network-type-key-exist';
import { ModalGasToken } from '../../../components/modal-gas-token/modal-gas-token';
import { ModalRenderItem } from '../../../components/modal-render-item/modal-render-item';
import { useListSearch } from '../../../hooks/use-list-search.hook';

const keyExtractor = (item: NetworkInterface) => item.rpcUrl;

export const NetworksList = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const createHdAccountForNewNetworkType = useCreateHdAccountForNewNetworkType();

  const networks = useAllNetworksSelector();
  const selectedNetwork = useSelectedNetworkSelector();
  const selectedAccount = useSelectedAccountSelector();
  const accountsGasTokens = useAccountsGasTokensSelector();

  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  const filteredList = useListSearch(searchValue, networks);

  const selectedIndex = useMemo(
    () => filteredList.findIndex(account => account.rpcUrl === selectedNetwork.rpcUrl),
    [filteredList, selectedNetwork.rpcUrl]
  );

  const handleChangeNetwork = useCallback(
    ({ networkType, rpcUrl }: NetworkInterface) => {
      dispatch(changeNetworkAction(rpcUrl));

      if (!checkIsNetworkTypeKeyExist(selectedAccount, networkType)) {
        createHdAccountForNewNetworkType(selectedAccount, networkType);
      }

      navigate(ScreensEnum.Wallet);
    },
    [selectedAccount]
  );

  const navigateToAddNetwork = () => navigate(ScreensEnum.AddNetwork);

  const navigateToEditNetwork = (network: NetworkInterface, isNetworkSelected: boolean) =>
    navigate(ScreensEnum.EditNetwork, { network, isNetworkSelected });

  const renderItem = ({ item, index }: ListRenderItemInfo<NetworkInterface>) => {
    const isNetworkSelected = selectedIndex === index;
    const selectedAccountPublicKeyHash = getPublicKeyHash(selectedAccount, item.networkType);
    const accountGasTokenSlug = getAccountTokensSlug(item.chainId, selectedAccountPublicKeyHash);

    return (
      <ModalRenderItem
        name={item.name}
        icon={<Icon name={item.iconName ?? IconNameEnum.NetworkFallback} />}
        isActive={isNetworkSelected}
        balanceTitle="Gas balance"
        balance={
          <ModalGasToken balance={accountsGasTokens[accountGasTokenSlug]?.data} metadata={item.gasTokenMetadata} />
        }
        onSelectItem={() => handleChangeNetwork(item)}
        rightBottomComponent={
          <TouchableIcon name={IconNameEnum.Edit} onPress={() => navigateToEditNetwork(item, isNetworkSelected)} />
        }
      />
    );
  };

  return (
    <Selector
      onPressAddIcon={navigateToAddNetwork}
      data={filteredList}
      renderItem={renderItem}
      setSearchValue={setSearchValue}
      selectedItemName={selectedNetwork.name}
      keyExtractor={keyExtractor}
      selectedIndex={selectedIndex}
    />
  );
};
