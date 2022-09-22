import { useNavigation } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { ethers } from 'ethers';
import debounce from 'lodash/debounce';
import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { map, switchMap } from 'rxjs';

import { Column } from '../../../components/column/column';
import { Image } from '../../../components/image/image';
import { TextInput } from '../../../components/text-input/text-input';
import { Text } from '../../../components/text/text';
import { Warning } from '../../../components/warning/warning';
import { EVM_COLLECTIBLES_METADATA_ABI } from '../../../constants/abi/evm-collectibles-metadata-abi copy';
import { DEBOUNCE_TIME } from '../../../constants/defaults';
import { Shelter } from '../../../shelter/shelter';
import {
  useSelectedNetworkSelector,
  useAccountAssetsSelector,
  useSelectedAccountPublicKeyHashSelector
} from '../../../store/wallet/wallet.selectors';
import { getDefaultEvmProvider } from '../../../utils/get-default-evm-provider.utils';
import { isEvmAddressValid } from '../../../utils/is-evm-address-valid.util';
import { getTokenSlug } from '../../../utils/token.utils';
import { ModalActionContainer } from '../../components/modal-action-container/modal-action-container';

import { styles } from './add-new-collectible.styles';
import { useValidateAddNewCollectibleFields } from './hooks/use-validate-add-new-collectible.hook';
import { AddNewCollectibleFormTypes } from './types';

const defaultValues: AddNewCollectibleFormTypes = {
  tokenAddress: '',
  tokenId: ''
};

export const AddNewCollectible: FC = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { rpcUrl } = useSelectedNetworkSelector();
  const pkh = useSelectedAccountPublicKeyHashSelector();

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
  } = useForm<AddNewCollectibleFormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const watchAddressUrl = watch('tokenAddress');
  const watchTokenId = watch('tokenId');

  useEffect(() => {
    clearErrors('tokenAddress');
  }, [watchTokenId]);

  const { addressUrlRules, commonRules } = useValidateAddNewCollectibleFields();

  const getEvmTokenMetadata = useRef(
    debounce(async (address: string) => {
      if (isNotEmptyString(address)) {
        const provider = getDefaultEvmProvider(rpcUrl);

        const contract = new ethers.Contract(address, EVM_COLLECTIBLES_METADATA_ABI, provider);
        const [name, tokenURI] = await Promise.all([
          contract.name().catch((err: any) => {
            console.log('name', err);
          }),
          contract.tokenURI(18006).catch((err: any) => {
            console.log('tokenURI', err);
          })
        ]).finally(() => {
          setIsLoadingMetadata(false);
        });

        console.log(name, tokenURI);

        // const result = await contract.methods.tokenURI(18006).call().;
        // console.log('NFT image', result);

        // setValue('symbol', symbol);
        // setValue('decimals', decimals.toString());
        // setValue('name', name);
      }
    }, DEBOUNCE_TIME)
  ).current;

  // useEffect(() => {
  //   if (isEvmAddressValid(watchAddressUrl)) {
  //     getEvmTokenMetadata(watchAddressUrl);
  //     setIsLoadingMetadata(true);
  //   }

  //   return () => {
  //     getEvmTokenMetadata.cancel();
  //   };
  // }, [getEvmTokenMetadata, watchAddressUrl, watchTokenId]);

  const getNftData = useCallback(
    (address: string, tokenId: number, provider: ethers.providers.Provider) => {
      console.log('getNftData');

      return Shelter.getEvmSigner$(pkh, provider).pipe(
        map(signer => {
          console.log('signer', signer);

          return new ethers.Contract(address, EVM_COLLECTIBLES_METADATA_ABI, signer);
        }),
        switchMap(contract => contract.tokenURI(tokenId)),
        map(tokenUri => {
          console.log('tokenUri', tokenUri);
          console.log('pkh', pkh);
        })
      );
    },
    [pkh]
  );

  useEffect(() => {
    const provider = getDefaultEvmProvider(rpcUrl);

    if (isNotEmptyString(watchTokenId)) {
      console.log('here');
      getNftData(watchAddressUrl, Number(watchTokenId), provider);
    }
  }, [watchAddressUrl, watchTokenId]);

  const onSubmit = (fields: AddNewCollectibleFormTypes) => {
    const currentToken = accountTokens.find(
      token => getTokenSlug(token.tokenAddress, token.tokenId) === getTokenSlug(fields.tokenAddress, fields.tokenId)
    );

    if (isDefined(currentToken)) {
      if (isNotEmptyString(fields.tokenId)) {
        return setError('tokenId', { message: 'Token with this Token ID already exist' });
      }

      return setError('tokenAddress', { message: 'Token with this Address already exist' });
    }

    // dispatch(
    //   addNewTokenAction({
    //     tokenAddress: fields.tokenAddress,
    //     ...(isDefined(fields.tokenId) && isNotEmptyString(fields.tokenId) && { tokenId: fields.tokenId })
    //   })
    // );

    goBack();
  };

  const handlePromptNavigate = () => null;

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
              prompt="How to get NFT Address?"
              handlePrompt={handlePromptNavigate}
              error={errors?.tokenAddress?.message}
              containerStyle={styles.inputContainer}
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
              label="Address ID"
              placeholder="0"
              prompt="What is address ID?"
              handlePrompt={handlePromptNavigate}
              required={false}
              error={errors?.tokenId?.message}
              containerStyle={styles.lastInputContainer}
            />
          )}
        />
        <Warning
          text="If NFT is part of a collection - it will be displayed inside the collection"
          style={styles.warning}
        />
        <Column>
          <Text style={styles.collectibleName}>NFT name</Text>
          <Text style={styles.collectibleDescription}>Preview</Text>
          <Image uri="" style={styles.image} />
        </Column>
      </ScrollView>
    </ModalActionContainer>
  );
};
