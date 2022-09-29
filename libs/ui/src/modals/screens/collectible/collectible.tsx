import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
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
import { loadAccountTokenBalanceAction } from '../../../store/wallet/wallet.actions';
import { useSelectedCollectibleSelector, useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
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

  const dispatch = useDispatch();
  const { explorerUrl, networkType } = useSelectedNetworkSelector();
  const selectedCollectible = useSelectedCollectibleSelector(
    getTokenSlug(collectible.tokenAddress, collectible.tokenId)
  );

  useEffect(() => {
    dispatch(loadAccountTokenBalanceAction.submit({ token: collectible }));
  }, [collectible]);

  const tokenMetadata = {
    amount: {
      name: 'Amount',
      value: selectedCollectible?.balance.data ?? collectible.balance.data,
      prompt: null
    },
    contractName: {
      name: 'Collection name',
      value: selectedCollectible?.contractName,
      prompt: null
    },
    contract: {
      name: 'Address',
      value: <CopyText text={collectible.tokenAddress} isShortize />,
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
      prompt: getTokenDetailsUrl(collectible.tokenAddress, getString(explorerUrl), networkType)
    }
  };

  return (
    <ModalContainer screenTitle={collectible.name}>
      <View style={styles.root}>
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainerStyle}>
          <Column style={styles.collectibleWrapper}>
            <Icon name={IconNameEnum.NftLayout} size={COLLECTIBLE_SIZE} />
            <CollectibleImage
              artifactUri={collectible.artifactUri}
              size="100%"
              pixelShitSize={getCustomSize(5)}
              style={styles.imageContainer}
            />
          </Column>

          <Column style={styles.list}>
            {Object.values(tokenMetadata).map(({ name, value, prompt }) => (
              <InfoItem key={name} name={name} value={value} prompt={prompt} />
            ))}
          </Column>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button title="SEND" theme={ButtonThemesEnum.Secondary} size={ButtonSizeEnum.Fluid} style={styles.button} />
        </View>
      </View>
    </ModalContainer>
  );
};
