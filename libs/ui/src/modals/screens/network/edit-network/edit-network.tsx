import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NetworkTypeEnum } from 'shared';

import { ButtonWithIcon } from '../../../../components/button-with-icon/button-with-icon';
import { ButtonWithIconSizeEnum } from '../../../../components/button-with-icon/enums';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { NETWORK_CHAIN_IDS_BY_NETWORK_TYPE } from '../../../../constants/networks';
import { MainnetRpcEnum } from '../../../../constants/rpc';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { NetworkInterface } from '../../../../interfaces/network.interface';
import { useCreateHdAccountForNewNetworkType } from '../../../../shelter/hooks/use-create-hd-account-for-new-network-type.hook';
import { editNetworkAction, removeNetworkAction } from '../../../../store/wallet/wallet.actions';
import { useAllNetworksSelector, useSelectedAccountSelector } from '../../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../../styles/format-size';
import { checkIsNetworkTypeKeyExist } from '../../../../utils/check-is-network-type-key-exist';
import { useNetworkFieldsRules } from '../../../hooks/use-validate-network-fields.hook';
import { NetworkContainer } from '../components/network-container/network-container';
import { FormTypes } from '../types/form-types.interface';
import { confirmRemoveAction } from '../utils/confirmation.util';

import { styles } from './edit-network.styles';

export const EditNetwork: FC = () => {
  const { goBack } = useNavigation();
  const dispatch = useDispatch();
  const createHdAccountForNewNetworkType = useCreateHdAccountForNewNetworkType();
  const selectedAccount = useSelectedAccountSelector();
  const networks = useAllNetworksSelector();
  const {
    params: { network: selectedNetwork, isNetworkSelected }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.EditNetwork>>();

  const defaultValues = {
    name: selectedNetwork.name,
    rpcUrl: selectedNetwork.rpcUrl,
    chainId: selectedNetwork.chainId,
    blockExplorerUrl: selectedNetwork.explorerUrl,
    tokenSymbol: selectedNetwork.gasTokenMetadata.symbol
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const rules = useNetworkFieldsRules({
    networks,
    defaultValues
  });

  const onSubmit = (data: FormTypes) => {
    if (JSON.stringify(defaultValues) === JSON.stringify(data)) {
      return goBack();
    }

    let networkType = NetworkTypeEnum.EVM;

    if (NETWORK_CHAIN_IDS_BY_NETWORK_TYPE[NetworkTypeEnum.Tezos].includes(data.chainId)) {
      networkType = NetworkTypeEnum.Tezos;
    }

    const editedNetwork: NetworkInterface = {
      ...selectedNetwork,
      name: data.name.trim(),
      gasTokenMetadata: {
        ...selectedNetwork.gasTokenMetadata,
        symbol: data.tokenSymbol.trim()
      },
      explorerUrl: data.blockExplorerUrl?.trim(),
      networkType,
      ...(selectedNetwork.iconName && { iconName: selectedNetwork.iconName })
    };

    if (isNetworkSelected && !checkIsNetworkTypeKeyExist(selectedAccount, networkType)) {
      createHdAccountForNewNetworkType(selectedAccount, networkType, () => {
        dispatch(editNetworkAction({ network: editedNetwork, isNetworkSelected }));
      });
    } else {
      dispatch(editNetworkAction({ network: editedNetwork, isNetworkSelected, prevRpcUrl: defaultValues.rpcUrl }));
    }

    goBack();
  };

  const handleConfirmRemoveAction = () => {
    confirmRemoveAction(handleRemoveNetwork);
  };

  const handleRemoveNetwork = () => {
    const networksWithoutCurrent = networks.filter(network => network.rpcUrl !== selectedNetwork.rpcUrl);

    if (isNetworkSelected && !checkIsNetworkTypeKeyExist(selectedAccount, networksWithoutCurrent[0].networkType)) {
      createHdAccountForNewNetworkType(selectedAccount, networksWithoutCurrent[0].networkType, () => {
        dispatch(removeNetworkAction({ network: selectedNetwork, isNetworkSelected }));
      });
    } else {
      dispatch(removeNetworkAction({ network: selectedNetwork, isNetworkSelected }));
    }
    goBack();
  };

  return (
    <NetworkContainer
      screenTitle="Edit network"
      submitTitle="Save"
      onSubmitPress={handleSubmit(onSubmit)}
      control={control}
      rules={rules}
      errors={errors}
      setValue={setValue}
      editable={false}
    >
      <ButtonWithIcon
        title="Delete network"
        size={ButtonWithIconSizeEnum.Small}
        leftIcon={IconNameEnum.Delete}
        iconSize={getCustomSize(2)}
        onPress={handleConfirmRemoveAction}
        disabled={networks.length === 1 || selectedNetwork.rpcUrl === MainnetRpcEnum.Klaytn}
        style={styles.button}
      />
    </NetworkContainer>
  );
};
