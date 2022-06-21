import React, { FC } from 'react';
import { View, Pressable } from 'react-native';

import { Token } from '../../interfaces/token.interface';
import { Button } from '../button/button';
import { IconNameEnum } from '../icon/icon-name.enum';
import { WidgetContainer } from '../widget-container/widget-container';

import { CollectibleImages } from './collectible-images';
import { styles } from './collectibles.styles';

interface Props {
  collectibles: Token[];
}

const EMPTY_NFT = 'Receive your first NFT';
const COLLECTIBLES = 'Collectibles';
const RECEIVE = 'RECEIVE';
const VIEW_ALL = 'VIEW ALL';

export const Collectibles: FC<Props> = ({ collectibles }) => {
  if (collectibles.length === 0) {
    return (
      <WidgetContainer title={COLLECTIBLES} iconName={IconNameEnum.Nft} style={styles.emptyNFT}>
        <Button title={EMPTY_NFT} leftIcon={IconNameEnum.Receive} style={styles.emptyNFT} />
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer title={COLLECTIBLES} iconName={IconNameEnum.Nft} style={styles.emptyNFT}>
      <View style={styles.wrapper}>
        <Pressable style={styles.pressable}>
          <CollectibleImages collectibles={collectibles} />
        </Pressable>
        <View style={styles.buttons}>
          <Button title={RECEIVE} rightIcon={IconNameEnum.Receive} style={[styles.button, styles.buttonTop]} />
          <Button title={VIEW_ALL} rightIcon={IconNameEnum.ArrowRight} style={[styles.button, styles.buttonBottom]} />
        </View>
      </View>
    </WidgetContainer>
  );
};
