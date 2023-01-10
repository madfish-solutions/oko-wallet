import React, { FC, PropsWithChildren } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '../../../../components/text/text';
import { Token } from '../../../../interfaces/token.interface';

import { styles } from './collectible-render-item.styles';

type Props = PropsWithChildren<{
  collectible: Token;
  name?: string;
  handleItemPress: (nft: Token) => void;
  index: number;
}>;

export const CollectibleRenderItem: FC<Props> = ({ collectible, name, handleItemPress, index, children }) => (
  <Pressable onPress={() => handleItemPress(collectible)} style={[styles.root, index % 2 === 0 && styles.marginRight]}>
    <View style={styles.imageWrapper}>{children}</View>

    <Text style={styles.collectibleName}>{name}</Text>
  </Pressable>
);
