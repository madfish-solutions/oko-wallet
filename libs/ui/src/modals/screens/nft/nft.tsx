import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';

import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './nft.styles';

export const NFT: FC = () => {
  const {
    params: { nft }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.NFT>>();

  return (
    <ModalContainer screenTitle={nft.name}>
      <View style={styles.root}>
        <ScrollView style={styles.content} />
      </View>
    </ModalContainer>
  );
};
