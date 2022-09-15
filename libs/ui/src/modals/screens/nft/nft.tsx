import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useMemo } from 'react';
import { View, ScrollView } from 'react-native';

import { Button } from '../../../components/button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../../../components/button/enums';
import { Column } from '../../../components/column/column';
import { CopyText } from '../../../components/copy-text/copy-text';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { CollectibleImages } from '../../../screens/wallet/components/collectibles/components/collectible-image';
import { getCustomSize } from '../../../styles/format-size';
import { isMobile } from '../../../utils/platform.utils';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './nft.styles';

export const NFT: FC = () => {
  const {
    params: { nft }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.NFT>>();

  const nftInformationList = useMemo(
    () => [
      {
        id: 1,
        title: 'Amount',
        value: nft.amount
      },
      {
        id: 2,
        title: 'ID',
        value: nft.tokenId
      },
      {
        id: 3,
        title: 'Address',
        value: <CopyText text={nft.tokenAddress} isShortize />
      }
    ],
    [nft]
  );

  return (
    <ModalContainer screenTitle={nft.name}>
      <View style={styles.root}>
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainerStyle}>
          <CollectibleImages
            artifactUri={nft.artifactUri}
            size={isMobile ? getCustomSize(42.875) : getCustomSize(41)}
            pixelShitSize={getCustomSize(10)}
            style={styles.imageContainer}
            imageStyle={styles.image}
          />

          <Column style={styles.list}>
            {nftInformationList.map(({ id, title, value }) => (
              <Row key={id} style={styles.listItem}>
                <Text style={styles.itemTitle}>{title}</Text>
                {typeof value === 'string' || typeof value === 'number' ? (
                  <Text style={styles.itemValue}>{value}</Text>
                ) : (
                  value
                )}
              </Row>
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
