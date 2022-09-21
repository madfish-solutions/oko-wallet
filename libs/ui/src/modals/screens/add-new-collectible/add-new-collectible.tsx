import { useNavigation } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { ethers } from 'ethers';
import debounce from 'lodash/debounce';
import React, { FC, useEffect, useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { TextInput } from '../../../components/text-input/text-input';
import { Text } from '../../../components/text/text';
import { Warning } from '../../../components/warning/warning';
import { EVM_TOKEN_METADATA_ABI } from '../../../constants/abi/evm-tokens-metadata-abi';
import { DEBOUNCE_TIME } from '../../../constants/defaults';
import { addNewTokenAction } from '../../../store/wallet/wallet.actions';
import { useSelectedNetworkSelector, useAccountAssetsSelector } from '../../../store/wallet/wallet.selectors';
import { getDefaultEvmProvider } from '../../../utils/get-default-evm-provider.utils';
import { isEvmAddressValid } from '../../../utils/is-evm-address-valid.util';
import { getTokenSlug } from '../../../utils/token.utils';
import { ModalActionContainer } from '../../components/modal-action-container/modal-action-container';
import { useTokenFieldsRules } from '../../hooks/use-validate-add-token-fields.hook';
import { TokenFormTypes } from '../token/types/form-types.interface';

import { styles } from './add-new-collectible.styles';

const defaultValues: TokenFormTypes = {
  tokenAddress: '',
  tokenId: '',
  symbol: '',
  name: '',
  decimals: '',
  thumbnailUri: ''
};

export const AddNewCollectible: FC = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { rpcUrl } = useSelectedNetworkSelector();

  const accountTokens = useAccountAssetsSelector();

  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    resetField,
    setError,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<TokenFormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const resetDynamicFields = () => {
    resetField('symbol');
    resetField('name');
    resetField('decimals');
    resetField('thumbnailUri');
  };

  const watchAddressUrl = watch('tokenAddress');
  const watchTokenId = watch('tokenId');

  useEffect(() => {
    if (!isNotEmptyString(watchAddressUrl.trim())) {
      resetDynamicFields();
    }
  }, [watchAddressUrl]);

  useEffect(() => {
    clearErrors('tokenAddress');
  }, [watchTokenId]);

  const rules = useTokenFieldsRules();

  const getEvmTokenMetadata = useRef(
    debounce(async (address: string) => {
      if (isNotEmptyString(address)) {
        const provider = getDefaultEvmProvider(rpcUrl);

        const contract = new ethers.Contract(address, EVM_TOKEN_METADATA_ABI, provider);
        const [name, symbol, decimals] = await Promise.all([
          contract.name().catch(() => {
            resetField('name');
          }),
          contract.symbol().catch(() => {
            resetField('symbol');
          }),
          contract.decimals().catch(() => {
            setValue('decimals', '0');
          })
        ]).finally(() => {
          setIsLoadingMetadata(false);
        });

        setValue('symbol', symbol);
        setValue('decimals', decimals.toString());
        setValue('name', name);
      }
    }, DEBOUNCE_TIME)
  ).current;

  useEffect(() => {
    if (isEvmAddressValid(watchAddressUrl)) {
      getEvmTokenMetadata(watchAddressUrl);
      setIsLoadingMetadata(true);
    }

    return () => {
      getEvmTokenMetadata.cancel();
    };
  }, [getEvmTokenMetadata, watchAddressUrl]);

  const onSubmit = (fields: TokenFormTypes) => {
    const currentToken = accountTokens.find(
      token => getTokenSlug(token.tokenAddress, token.tokenId) === getTokenSlug(fields.tokenAddress, fields.tokenId)
    );

    if (isDefined(currentToken)) {
      if (isNotEmptyString(fields.tokenId)) {
        return setError('tokenId', { message: 'Token with this Token ID already exist' });
      }

      return setError('tokenAddress', { message: 'Token with this Address already exist' });
    }

    dispatch(
      addNewTokenAction({
        tokenAddress: fields.tokenAddress,
        name: fields.name,
        symbol: fields.symbol,
        thumbnailUri: fields.thumbnailUri,
        decimals: Number(fields.decimals),
        ...(isDefined(fields.tokenId) && isNotEmptyString(fields.tokenId) && { tokenId: fields.tokenId })
      })
    );

    goBack();
  };

  return (
    <ModalActionContainer
      screenTitle="Add new NFT"
      submitTitle="Add"
      isSubmitDisabled={Boolean(Object.keys(errors).length) || isLoadingMetadata}
      onSubmitPress={handleSubmit(onSubmit)}
      onCancelPress={goBack}
    >
      <ScrollView style={styles.root}>
        <Controller
          control={control}
          name="tokenAddress"
          rules={addressUrlRules}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Address"
              placeholder="Address"
              prompt="How to get Token Address?"
              handlePrompt={handlePromptNavigate}
              error={errors?.tokenAddress?.message}
              containerStyle={styles.inputContainer}
              editable={editable}
            />
          )}
        />
        <Controller
          control={control}
          name="tokenId"
          rules={{ ...commonRules, required: false }}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Token ID"
              placeholder="0"
              prompt="What is Token ID?"
              handlePrompt={handlePromptNavigate}
              required={false}
              error={errors?.tokenId?.message}
              containerStyle={styles.inputContainer}
              editable={editable}
            />
          )}
        />
        <Warning text="If NFT is part of a collection - it will be displayed inside the collection" />
        <View>
          <Text>Nft image</Text>
        </View>
      </ScrollView>
    </ModalActionContainer>
  );
};
