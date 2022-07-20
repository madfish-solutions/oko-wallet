import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { TextInput } from '../../../components/text-input/text-input';
import { TouchableIcon } from '../../../components/touchable-icon/touchable-icon';
import { DEFAULT_NETWORK_TYPE, NETWORK_CHAIN_IDS_BY_NETWORK_TYPE } from '../../../constants/networks';
import { NetworkTypeEnum } from '../../../enums/network-type.enum';
import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useShelter } from '../../../hooks/use-shelter.hook';
import { NetworkInterface } from '../../../interfaces/network.interface';
import { createEntity } from '../../../store/utils/entity.utils';
import { addNewNetworkAction } from '../../../store/wallet/wallet.actions';
import { useSelectedAccountSelector, useAllNetworksSelector } from '../../../store/wallet/wallet.selectors';
import { checkIsNetworkTypeKeyExist } from '../../../utils/check-is-network-type-key-exist';
import { ModalActionContainer } from '../../components/modal-action-container/modal-action-container';
import { useNetworkFieldsRules } from '../../hooks/use-validate-network-fields.hook';

import { styles } from './add-network.styles';

interface FormTypes {
  name: string;
  rpcUrl: string;
  chainId: string;
  blockExplorerUrl?: string;
  tokenSymbol: string;
}

export const AddNetwork: FC = () => {
  const { goBack, navigate } = useNavigation();
  const dispatch = useDispatch();
  const selectedAccount = useSelectedAccountSelector();
  const networks = useAllNetworksSelector();
  const { createHdAccountForNewNetworkType } = useShelter();

  const [networkType, setNetworkType] = useState(DEFAULT_NETWORK_TYPE);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      rpcUrl: '',
      chainId: '',
      blockExplorerUrl: '',
      tokenSymbol: ''
    }
  });

  const chainId = watch('chainId');

  const { commonRules, rpcUrlRules, chainIdRules } = useNetworkFieldsRules(networks);

  useEffect(() => {
    if (NETWORK_CHAIN_IDS_BY_NETWORK_TYPE[NetworkTypeEnum.Tezos].includes(chainId)) {
      setNetworkType(NetworkTypeEnum.Tezos);
    } else {
      setNetworkType(NetworkTypeEnum.EVM);
    }
  }, [chainId]);

  const onSumbit = ({ name, rpcUrl, chainId, tokenSymbol, blockExplorerUrl }: FormTypes) => {
    const values: NetworkInterface = {
      name,
      rpcUrl,
      chainId,
      // Get metadata from rpc
      gasTokenMetadata: {
        name: tokenSymbol,
        symbol: tokenSymbol,
        decimals: 18
      },
      gasTokenBalance: createEntity('0'),
      explorerUrl: blockExplorerUrl,
      networkType
    };

    if (!checkIsNetworkTypeKeyExist(selectedAccount, networkType)) {
      createHdAccountForNewNetworkType(selectedAccount, networkType, () => {
        dispatch(addNewNetworkAction(values));
        navigate(ScreensEnum.Wallet);
      });
    } else {
      dispatch(addNewNetworkAction(values));
      navigate(ScreensEnum.Wallet);
    }
  };

  const handlePressPrompt = () => null;
  const handlePromptNavigate = () => null;

  return (
    <ModalActionContainer
      screenTitle="Add network"
      submitTitle="Add"
      isSubmitDisabled={Boolean(Object.keys(errors).length)}
      onSubmitPress={handleSubmit(onSumbit)}
      onCancelPress={goBack}
    >
      <ScrollView style={styles.root}>
        <Row style={styles.prompt}>
          <Text style={styles.text}>How to add new Network?</Text>
          <TouchableIcon name={IconNameEnum.Tooltip} onPress={handlePressPrompt} />
        </Row>

        <Controller
          control={control}
          name="name"
          rules={commonRules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              label="Network name"
              placeholder="Network"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.name?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="rpcUrl"
          rules={rpcUrlRules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              label="RPC URL"
              placeholder="https://"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              prompt="How to get RPC URL?"
              handlePrompt={handlePromptNavigate}
              error={errors?.rpcUrl?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="chainId"
          rules={chainIdRules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              label="Chain ID"
              placeholder="Chain ID"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.chainId?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="blockExplorerUrl"
          rules={{ ...commonRules, required: false }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              label="Block Explorer URL"
              placeholder="https://"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              prompt="I don’t have Block Explorer URL"
              handlePrompt={handlePromptNavigate}
              error={errors?.blockExplorerUrl?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="tokenSymbol"
          rules={commonRules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              label="Gas Token Symbol"
              placeholder="BTC"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.tokenSymbol?.message}
            />
          )}
        />
      </ScrollView>
    </ModalActionContainer>
  );
};
