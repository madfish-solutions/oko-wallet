import React, { FC } from 'react';
import { View, Pressable } from 'react-native';

import { Button } from '../../../../components/button/button';
import { Divider } from '../../../../components/divider/divider';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { WidgetContainer } from '../../../../components/widget-container/widget-container';
import { useCollectiblesWidgetSelector } from '../../../../store/wallet/wallet.selectors';

import { styles } from './collectibles.styles';
import { CollectibleImages } from './components/collectible';

const EMPTY_NFT = 'Receive your first NFT';
const COLLECTIBLES = 'Collectibles';
const RECEIVE = 'RECEIVE';
const VIEW_ALL = 'VIEW ALL';

export const Collectibles: FC = () => {
  const collectibles = useCollectiblesWidgetSelector();

  return (
    <WidgetContainer title={COLLECTIBLES} iconName={IconNameEnum.Nft}>
      {!collectibles.length ? (
        <Button title={EMPTY_NFT} leftIcon={IconNameEnum.Receive} />
      ) : (
        <Row>
          <Pressable style={styles.pressable}>
            <CollectibleImages collectibles={collectibles} />
          </Pressable>
          <View style={styles.buttons}>
            <Button title={RECEIVE} rightIcon={IconNameEnum.Receive} />
            <Divider />
            <Button title={VIEW_ALL} rightIcon={IconNameEnum.ArrowRight} />
          </View>
        </Row>
      )}
    </WidgetContainer>
  );
};
