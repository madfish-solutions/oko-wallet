import { useNavigation } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { ethers } from 'ethers';
import debounce from 'lodash/debounce';
import React, { FC, useEffect, useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Announcement } from '../../../components/announcement/announcement';
import { CollectibleImage } from '../../../components/collectible-image/collectible-image';
import { Column } from '../../../components/column/column';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { TextInput } from '../../../components/text-input/text-input';
import { Text } from '../../../components/text/text';
import { EVM_COLLECTIBLES_METADATA_ABI } from '../../../constants/abi/evm-collectibles-metadata-abi copy';
import { DEBOUNCE_TIME } from '../../../constants/defaults';
import { AccountTokenInput } from '../../../interfaces/token-input.interface';
import { addNewCollectibleAction } from '../../../store/wallet/wallet.actions';
import { useSelectedNetworkSelector, useAccountAssetsSelector } from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { formatUri } from '../../../utils/formatUrl.util';
import { getDefaultEvmProvider } from '../../../utils/get-default-evm-provider.utils';
import { isEvmAddressValid } from '../../../utils/is-evm-address-valid.util';
import { getTokenSlug } from '../../../utils/token.utils';
import { ModalActionContainer } from '../../components/modal-action-container/modal-action-container';

import { styles } from './add-new-collectible.styles';
import { COLLECTIBLE_SIZE } from './constants';
import { useValidateAddNewCollectibleFields } from './hooks/use-validate-add-new-collectible.hook';
import { AddNewCollectibleFormTypes } from './types';

const defaultValues: AddNewCollectibleFormTypes = {
  tokenAddress: '',
  tokenId: ''
};

const collectibleInitialMetadata: AccountTokenInput = {
  tokenAddress: '',
  tokenId: '',
  name: '',
  symbol: '',
  decimals: 0,
  artifactUri: '',
  contractName: ''
};

export const AddNewCollectible: FC = () => {
  const { goBack } = useNavigation();
  const { rpcUrl } = useSelectedNetworkSelector();
  const dispatch = useDispatch();

  const accountTokens = useAccountAssetsSelector();

  const [collectibleMetadata, setCollectibleMetadata] = useState<AccountTokenInput>(collectibleInitialMetadata);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setError,
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

  useEffect(() => {
    setCollectibleMetadata(collectibleInitialMetadata);
  }, [watchAddressUrl, watchTokenId]);

  const { addressUrlRules, commonRules } = useValidateAddNewCollectibleFields();

  const getEvmTokenMetadata = useRef(
    debounce(async (tokenAddress: string, tokenId: string) => {
      const provider = getDefaultEvmProvider(rpcUrl);
      const contract = new ethers.Contract(tokenAddress, EVM_COLLECTIBLES_METADATA_ABI, provider);
      const errors = {
        name: false,
        tokenURI: false
      };

      const [contractName, symbol, collectibleMetadataUrl] = await Promise.all([
        contract
          .name()
          .then((res: string) => {
            errors.name = false;

            return res;
          })
          .catch((err: Error) => {
            console.log('Error with get collection name:', err);
            errors.name = true;
          }),
        contract.symbol().catch((err: Error) => {
          console.log('Error with get symbol:', err);
        }),
        contract
          .tokenURI(tokenId)
          .then((res: unknown) => {
            errors.tokenURI = false;

            return res;
          })
          .catch((err: Error) => {
            console.log('Error with get nft metadata-url:', err);
            errors.tokenURI = true;
          })
      ]).finally(() => {
        setIsLoadingMetadata(false);
      });
      console.log('metadata', contractName, '/', symbol, '/', collectibleMetadataUrl);

      if (errors.tokenURI && errors.name) {
        return setError('tokenAddress', { message: 'Not correct address to selected network' });
      } else if (errors.tokenURI) {
        return setError('tokenId', { message: 'Wrong Token ID' });
      }
      clearErrors();

      const metadata = await fetch(formatUri(collectibleMetadataUrl))
        .then(res => res.json())
        .catch(() => ({ name: 'Unnamed NFT', image: '' }));

      setCollectibleMetadata(prev => ({
        ...prev,
        tokenAddress,
        tokenId,
        name: metadata.name,
        symbol: symbol ?? 'Unnamed NFT',
        contractName: contractName ?? 'Collection',
        artifactUri: metadata.image
      }));
    }, DEBOUNCE_TIME)
  ).current;

  useEffect(() => {
    if (isEvmAddressValid(watchAddressUrl) && isNotEmptyString(watchTokenId)) {
      getEvmTokenMetadata(watchAddressUrl, watchTokenId);
      setIsLoadingMetadata(true);
    }

    return () => {
      getEvmTokenMetadata.cancel();
    };
  }, [getEvmTokenMetadata, watchAddressUrl, watchTokenId]);

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

    dispatch(addNewCollectibleAction(collectibleMetadata));

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
        <Announcement
          text="If NFT is part of a collection - it will be displayed inside the collection"
          style={styles.warning}
        />
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
          rules={commonRules}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Token ID"
              placeholder="0"
              prompt="What is Token ID?"
              handlePrompt={handlePromptNavigate}
              error={errors?.tokenId?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Column>
          <Text style={styles.collectibleName}>{collectibleMetadata.name || 'NFT name'}</Text>
          <Text style={styles.collectibleDescription}>Preview</Text>
          <View style={styles.imageSection}>
            <Icon name={IconNameEnum.NftLayout} size={COLLECTIBLE_SIZE} iconStyle={styles.layoutIcon} />
            <CollectibleImage
              artifactUri={formatUri(collectibleMetadata.artifactUri)}
              size="100%"
              pixelShitSize={getCustomSize(5)}
              style={styles.imageContainer}
            />
          </View>
        </Column>
      </ScrollView>
    </ModalActionContainer>
  );
};
