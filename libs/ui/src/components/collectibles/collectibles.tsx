import React, { FC } from 'react';
import { PressableProps, View } from 'react-native';

import { Token } from '../../interfaces/token.interface';
import { Button } from '../button/button';
import { IconNameEnum } from '../icon/icon-name.enum';
import { WidgetContainer } from '../widget-container/widget-container';

import { styles } from './collectibles.styles';

interface Props extends PressableProps {
  //@TODO : CHECK PROPS
  collectibles: Token[];
}

const EMPTY_NFT = 'Receive your first NFT';
const COLLECTIBLES = 'Collectibles';

export const Collectibles: FC<Props> = ({ collectibles }) => {
  if (collectibles.length === 0) {
    return (
      <WidgetContainer title={COLLECTIBLES} iconName={IconNameEnum.Nft} style={styles.emptyNFT}>
        <Button title={EMPTY_NFT} leftIcon={IconNameEnum.Receive} style={styles.emptyNFT} />
      </WidgetContainer>
    );
  }
  if (collectibles.length < 3) {
    return <View />;
  }

  return <View />;
};
