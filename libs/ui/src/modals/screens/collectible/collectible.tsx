import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import React, { FC, useEffect, useState } from 'react';
import { LayoutChangeEvent, ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '../../../components/button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../../../components/button/enums';
import { CollectibleImage } from '../../../components/collectible-image/collectible-image';
import { Column } from '../../../components/column/column';
import { CopyText } from '../../../components/copy-text/copy-text';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { InfoItem } from '../../../components/info-item/info-item';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useToast } from '../../../hooks/use-toast.hook';
import { loadAccountTokenBalanceAction, deleteCollectibleAction } from '../../../store/wallet/wallet.actions';
import {
  useIsPendingCollectibleTransaction,
  useSelectedCollectibleSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';
import { getString } from '../../../utils/get-string.utils';
import { getTokenDetailsUrl } from '../../../utils/get-token-details-url.util';
import { eraseProtocol } from '../../../utils/string.util';
import { getTokenSlug } from '../../../utils/token.utils';
import { ModalContainer } from '../../components/modal-container/modal-container';
import { COLLECTIBLE_SIZE } from '../add-new-collectible/constants';

import { styles } from './collectible.styles';

const TOKEN_ID_MAX_LENGTH = 24;

export const Collectible: FC = () => {
  const {
    params: { collectible }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Collectible>>();
  const { navigate, goBack } = useNavigation();
  const { showErrorToast } = useToast();
  const isScreenFocused = useIsFocused();
  const isPendingTransaction = useIsPendingCollectibleTransaction(collectible.tokenAddress, collectible.tokenId);

  const dispatch = useDispatch();
  const { explorerUrl, networkType, chainId } = useSelectedNetworkSelector();
  const selectedCollectible = useSelectedCollectibleSelector(
    getTokenSlug(collectible.tokenAddress, collectible.tokenId)
  );

  const [layoutWidth, setLayoutWidth] = useState(COLLECTIBLE_SIZE);

  useEffect(() => {
    if (Number(selectedCollectible?.balance.data) === 0 && isDefined(selectedCollectible) && isScreenFocused) {
      dispatch(deleteCollectibleAction(selectedCollectible));
      showErrorToast({ message: 'You are not the owner of this Collectible' });

      goBack();
    }
  }, [selectedCollectible?.balance.data, isScreenFocused]);

  useEffect(() => {
    if (Number(selectedCollectible?.balance.data) > 0 && isScreenFocused) {
      dispatch(loadAccountTokenBalanceAction.submit({ token: collectible }));
    }
  }, [selectedCollectible?.balance.data, isScreenFocused]);

  const tokenMetadata = {
    amount: {
      name: 'Amount',
      value: selectedCollectible?.balance.data,
      prompt: null
    },
    contractName: {
      name: 'Collection name',
      value: selectedCollectible?.contractName,
      prompt: null
    },
    contract: {
      name: 'Address',
      value: <CopyText text={collectible?.tokenAddress} isShortize />,
      prompt: null
    },
    tokenId: {
      name: 'ID',
      value: (
        <CopyText
          text={getString(collectible.tokenId)}
          isShortize={(collectible.tokenId?.length ?? 0) > TOKEN_ID_MAX_LENGTH}
        />
      ),
      prompt: null
    },
    explorer: {
      name: 'Explorer',
      value: eraseProtocol(getString(explorerUrl)),
      prompt: getTokenDetailsUrl({
        address: collectible.tokenAddress,
        id: getString(collectible.tokenId),
        explorerUrl: getString(explorerUrl),
        networkType,
        chainId
      })
    }
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    setLayoutWidth(e.nativeEvent.layout.width);
  };

  const navigateToSendCollectible = () => navigate(ScreensEnum.SendCollectible, { token: selectedCollectible });

  return (
    <ModalContainer screenTitle={collectible.name}>
      <View style={styles.root}>
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainerStyle}>
          <View onLayout={handleLayout} style={styles.collectibleWrapper}>
            <Icon name={IconNameEnum.NftLayout} size={layoutWidth} />
            <CollectibleImage
              artifactUri={collectible.artifactUri}
              size={layoutWidth}
              isPending={isPendingTransaction}
              style={styles.imageContainer}
            />
          </View>

          <Column style={styles.list}>
            {Object.values(tokenMetadata).map(({ name, value, prompt }) => (
              <InfoItem key={name} name={name} value={value} prompt={prompt} />
            ))}
          </Column>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            title="SEND"
            onPress={navigateToSendCollectible}
            theme={ButtonThemesEnum.Secondary}
            size={ButtonSizeEnum.Large}
            disabled={selectedCollectible?.balance.isLoading}
          />
        </View>
      </View>
    </ModalContainer>
  );
};
