import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { getDefaultProvider } from 'ethers';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LayoutChangeEvent, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { forkJoin, of, Subject, switchMap } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';

import { Announcement } from '../../../components/announcement/announcement';
import { CollectibleImage } from '../../../components/collectible-image/collectible-image';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { TextInput } from '../../../components/text-input/text-input';
import { Text } from '../../../components/text/text';
import { DEBOUNCE_TIME } from '../../../constants/defaults';
import { Erc721Abi__factory, Erc1155Abi__factory } from '../../../contract-types';
import { TokenStandardEnum } from '../../../enums/token-standard.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useToast } from '../../../hooks/use-toast.hook';
import { AccountTokenInput } from '../../../interfaces/token-input.interface';
import { addNewCollectibleAction } from '../../../store/wallet/wallet.actions';
import {
  useAccountAssetsSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { getCollectibleBalance } from '../../../utils/by-network-types/token.utils.evm';
import { formatUri } from '../../../utils/formatUrl.util';
import { getDefaultEvmProvider } from '../../../utils/get-default-evm-provider.utils';
import { getTokenSlug } from '../../../utils/token.utils';
import { ModalActionContainer } from '../../components/modal-action-container/modal-action-container';

import { styles } from './add-new-collectible.styles';
import { COLLECTIBLE_SIZE } from './constants';
import { useValidateAddNewCollectibleFields } from './hooks/use-validate-add-new-collectible.hook';
import { AddNewCollectibleFormTypes } from './types';
import { getCollectibleErcStandard } from './utils/get-collectible-erc-standard.util';

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
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const dispatch = useDispatch();
  const { showWarningToast } = useToast();

  const accountTokens = useAccountAssetsSelector();

  const [collectibleMetadata, setCollectibleMetadata] = useState<AccountTokenInput>(collectibleInitialMetadata);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [layoutWidth, setLayoutWidth] = useState(COLLECTIBLE_SIZE);

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<AddNewCollectibleFormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const watchTokenAddress = watch('tokenAddress');
  const watchTokenId = watch('tokenId');

  useEffect(() => {
    setCollectibleMetadata(collectibleInitialMetadata);
  }, [watchTokenAddress, watchTokenId]);

  const { addressUrlRules, commonRules } = useValidateAddNewCollectibleFields();

  const formUpdate$ = useMemo(() => new Subject<{ tokenAddress: string; tokenId?: string; isErrors: boolean }>(), []);

  useEffect(() => {
    formUpdate$.next({
      tokenAddress: watchTokenAddress,
      tokenId: watchTokenId,
      isErrors: Object.keys(errors).length > 0
    });
  }, [watchTokenAddress, watchTokenId, Object.keys(errors).length]);

  useEffect(() => {
    const subscription = formUpdate$
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        filter(
          ({ tokenAddress, tokenId, isErrors }) =>
            isNotEmptyString(tokenAddress) && isNotEmptyString(tokenId) && !isErrors
        ),
        tap(() => setIsLoadingMetadata(true)),
        switchMap(args => forkJoin([getCollectibleErcStandard({ tokenAddress: args.tokenAddress, rpcUrl }), of(args)])),
        switchMap(([collectibleErcStandard, { tokenAddress, tokenId }]) =>
          forkJoin([
            fetchDataFromProvider(tokenAddress, tokenId as string, collectibleErcStandard as TokenStandardEnum),
            of(collectibleErcStandard)
          ])
        ),
        filter(([[collectibleMetadataUrl]]) => isErrorsExist(collectibleMetadataUrl)),
        switchMap(([[collectibleMetadataUrl, contractName, symbol, tokenAddress, tokenId], collectibleErcStandard]) => {
          const baseMetadata = {
            tokenAddress,
            tokenId,
            symbol: symbol ?? 'Unnamed NFT',
            contractName: contractName ?? 'Collection',
            standard: collectibleErcStandard
          };

          return fetch(formatUri(collectibleMetadataUrl))
            .then(res => res.json())
            .then(metadata => ({
              ...baseMetadata,
              name: metadata.name,
              artifactUri: metadata.image
            }))
            .catch(() => ({
              ...baseMetadata,
              name: 'Unnamed NFT',
              artifactUri: ''
            }));
        }),
        tap(() => setIsLoadingMetadata(false))
      )
      .subscribe(metadata =>
        setCollectibleMetadata(prev => ({
          ...prev,
          ...metadata
        }))
      );

    return () => subscription.unsubscribe();
  }, []);

  const fetchDataFromProvider = (tokenAddress: string, tokenId: string, collectibleErcStandard: TokenStandardEnum) => {
    const provider = getDefaultEvmProvider(rpcUrl);
    const isErc721 = collectibleErcStandard === TokenStandardEnum.ERC721;

    if (isErc721) {
      const contract721 = Erc721Abi__factory.connect(tokenAddress, provider);

      return Promise.all([
        contract721.tokenURI(tokenId).catch(() => undefined),
        contract721.name().catch(() => undefined),
        contract721.symbol().catch(() => undefined),
        Promise.resolve(tokenAddress),
        Promise.resolve(tokenId)
      ]);
    }

    const contract1155 = Erc1155Abi__factory.connect(tokenAddress, provider);

    return Promise.all([
      contract1155.uri(tokenId).catch(() => undefined),
      Promise.resolve(undefined),
      Promise.resolve(undefined),
      Promise.resolve(tokenAddress),
      Promise.resolve(tokenId)
    ]);
  };

  const isErrorsExist = (collectibleMetadataUrl?: string) => {
    if (!isDefined(collectibleMetadataUrl)) {
      setError('tokenId', { message: 'Unable to load metadata for this Token Id' });
      setIsLoadingMetadata(false);

      return false;
    }

    return true;
  };

  const onSubmit = async (fields: AddNewCollectibleFormTypes) => {
    const currentToken = accountTokens.find(
      token => getTokenSlug(token.tokenAddress, token.tokenId) === getTokenSlug(fields.tokenAddress, fields.tokenId)
    );

    if (isDefined(currentToken)) {
      if (isNotEmptyString(fields.tokenId)) {
        return setError('tokenId', { message: 'Token with this Token ID already exist' });
      }

      return setError('tokenAddress', { message: 'Token with this Address already exist' });
    }

    const provider = getDefaultProvider(rpcUrl);
    const collectibleBalance = await getCollectibleBalance({
      tokenAddress: fields.tokenAddress,
      tokenId: fields.tokenId as string,
      standard: collectibleMetadata.standard,
      provider,
      publicKeyHash
    });

    if (Number(collectibleBalance) === 0) {
      return showWarningToast('You are not the owner of this collectible');
    }

    dispatch(addNewCollectibleAction({ ...collectibleMetadata, balance: collectibleBalance }));

    goBack();
  };

  const handlePromptNavigate = () => null;

  const handleLayout = (e: LayoutChangeEvent) => {
    setLayoutWidth(e.nativeEvent.layout.width);
  };

  return (
    <ModalActionContainer
      screenTitle="Add new Collectible"
      submitTitle="Add"
      isSubmitDisabled={Boolean(Object.keys(errors).length) || isLoadingMetadata || isSubmitting}
      onSubmitPress={handleSubmit(onSubmit)}
      onCancelPress={goBack}
    >
      <View onLayout={handleLayout} style={styles.root}>
        <Announcement
          text="If Collectible is part of a collection - it will be displayed inside the collection"
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
              prompt="How to get Token Address?"
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
        <View>
          <Text style={styles.collectibleName}>{collectibleMetadata.name || 'Collectible name'}</Text>
          <Text style={styles.collectibleDescription}>Preview</Text>
          <View style={styles.imageSection}>
            <Icon name={IconNameEnum.NftLayout} size={layoutWidth} iconStyle={styles.layoutIcon} />
            <CollectibleImage
              artifactUri={formatUri(collectibleMetadata.artifactUri)}
              size={layoutWidth}
              pixelShitSize={getCustomSize(5)}
              style={styles.imageContainer}
            />
          </View>
        </View>
      </View>
    </ModalActionContainer>
  );
};
