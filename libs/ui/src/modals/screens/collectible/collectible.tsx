import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
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
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { loadAccountTokenBalanceAction } from '../../../store/wallet/wallet.actions';
import { useSelectedCollectibleSelector } from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { isWeb } from '../../../utils/platform.utils';
import { getTokenSlug } from '../../../utils/token.utils';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './collectible.styles';

const TOKEN_ID_MAX_LENGTH = 24;

export const Collectible: FC = () => {
  const {
    params: { collectible }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Collectible>>();

  const dispatch = useDispatch();
  const selectedCollectible = useSelectedCollectibleSelector(
    getTokenSlug(collectible.tokenAddress, collectible.tokenId)
  );

  useEffect(() => {
    dispatch(loadAccountTokenBalanceAction.submit({ token: collectible }));
  }, [collectible]);

  return (
    <ModalContainer screenTitle={collectible.name}>
      <View style={styles.root}>
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainerStyle}>
          <Column style={styles.collectibleWrapper}>
            {isWeb && <Icon name={IconNameEnum.TransparencyLayout} size="100%" />}
            <CollectibleImage
              artifactUri={collectible.artifactUri}
              size="100%"
              pixelShitSize={getCustomSize(10)}
              style={styles.imageContainer}
            />
          </Column>

          <Column style={styles.list}>
            <Row style={styles.listItem}>
              <Text style={styles.itemTitle}>Amount</Text>
              <Text style={styles.itemValue}>{selectedCollectible?.balance.data ?? collectible.balance.data}</Text>
            </Row>
            {isDefined(collectible.tokenId) && (
              <Row style={styles.listItem}>
                <Text style={styles.itemTitle}>ID</Text>
                <CopyText
                  text={collectible.tokenId}
                  isShortize={collectible.tokenId.length > TOKEN_ID_MAX_LENGTH ? true : false}
                />
              </Row>
            )}
            <Row style={styles.listItem}>
              <Text style={styles.itemTitle}>Address</Text>
              <CopyText text={collectible.tokenAddress} isShortize />
            </Row>
          </Column>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button title="SEND" theme={ButtonThemesEnum.Secondary} size={ButtonSizeEnum.Fluid} style={styles.button} />
        </View>
      </View>
    </ModalContainer>
  );
};
