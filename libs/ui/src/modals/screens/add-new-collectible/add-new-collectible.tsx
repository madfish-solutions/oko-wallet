import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { getDefaultProvider } from 'ethers';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LayoutChangeEvent, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { of, Subject, switchMap } from 'rxjs';
import { catchError, debounceTime, filter, tap } from 'rxjs/operators';

import { Announcement } from '../../../components/announcement/announcement';
import { CollectibleImage } from '../../../components/collectible-image/collectible-image';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Text } from '../../../components/text/text';
import { TextInput } from '../../../components/text-input/text-input';
import { DEBOUNCE_TIME } from '../../../constants/defaults';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useToast } from '../../../hooks/use-toast.hook';
import { TokenExtendedMetadata } from '../../../interfaces/token-extended-metadata.interface';
import { addNewCollectibleAction } from '../../../store/wallet/wallet.actions';
import {
  useAccountAssetsSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { getCollectibleBalance } from '../../../utils/by-network-types/token.utils.evm';
import { formatUri } from '../../../utils/formatUrl.util';
import { getCurrentToken } from '../../../utils/get-current-token.util';
import { getTokenSlug } from '../../../utils/token.utils';
import { ModalActionsContainer } from '../../components/modal-actions-container/modal-actions-container';

import { styles } from './add-new-collectible.styles';
import { COLLECTIBLE_SIZE } from './constants';
import { useValidateAddNewCollectibleFields } from './hooks/use-validate-add-new-collectible.hook';
import { AddNewCollectibleFormTypes } from './types';
import { getCollectibleMetadata$ } from './utils/get-collectible-metada.util';

const defaultValues: AddNewCollectibleFormTypes = {
  tokenAddress: '',
  tokenId: ''
};

const collectibleInitialMetadata: TokenExtendedMetadata = {
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
  const { showErrorToast } = useToast();

  const accountTokens = useAccountAssetsSelector();

  const [collectibleMetadata, setCollectibleMetadata] = useState<TokenExtendedMetadata>(collectibleInitialMetadata);
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
        switchMap(args =>
          getCollectibleMetadata$(args.tokenAddress, args.tokenId ?? '0', rpcUrl).pipe(catchError(() => of(undefined)))
        ),
        tap(() => setIsLoadingMetadata(false))
      )
      .subscribe(metadata => {
        if (isDefined(metadata)) {
          setCollectibleMetadata(prev => ({ ...prev, ...metadata }));
        } else {
          setError('tokenId', { message: 'Unable to load metadata for this Token Id' });
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  const onSubmit = async (fields: AddNewCollectibleFormTypes) => {
    const currentToken = getCurrentToken(accountTokens, getTokenSlug(fields.tokenAddress, fields.tokenId));

    if (isDefined(currentToken)) {
      if (isNotEmptyString(fields.tokenId)) {
        return setError('tokenId', { message: 'Сollectible with this Token ID already exist' });
      }

      return setError('tokenAddress', { message: 'Сollectible with this Address already exist' });
    }

    const provider = getDefaultProvider(rpcUrl);
    const balance = await getCollectibleBalance({
      tokenAddress: fields.tokenAddress,
      tokenId: fields.tokenId,
      standard: collectibleMetadata.standard,
      provider,
      publicKeyHash
    });

    if (Number(balance) === 0) {
      return showErrorToast({ message: 'You are not the owner of this Collectible' });
    }

    dispatch(addNewCollectibleAction({ token: collectibleMetadata, balance }));

    goBack();
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    setLayoutWidth(e.nativeEvent.layout.width);
  };

  return (
    <ModalActionsContainer
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
              prompt="Enter the Address of collectible"
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
              prompt="Enter the Token ID"
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
    </ModalActionsContainer>
  );
};
