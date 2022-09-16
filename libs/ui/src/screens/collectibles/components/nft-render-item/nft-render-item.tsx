import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '../../../../components/text/text';
import { Token } from '../../../../interfaces/token.interface';

import { styles } from './nft-render-item.styles';

interface Props {
  nft: Token;
  name: string;
  handleItemPress: OnEventFn<Token>;
  index: number;
}

export const NftRenderItem: FC<Props> = ({ nft, name, handleItemPress, index, children }) => (
  <Pressable onPress={() => handleItemPress(nft)} style={[styles.nft, index % 2 === 0 && styles.marginRight]}>
    <View style={styles.imageWrapper}>{children}</View>

    <Text style={styles.nftName}>{name}</Text>
  </Pressable>
);
