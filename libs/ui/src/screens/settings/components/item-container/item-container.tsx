import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';

import { Text } from '../../../../components/text/text';
import { ViewStyleProps } from '../../../../interfaces/style.interface';

import { styles } from './item-container.styles';

interface Props extends PropsWithChildren {
  title?: string;
  style?: ViewStyleProps;
}

export const ItemContainer: FC<Props> = ({ title, style, children }) => (
  <View style={style}>
    {isNotEmptyString(title) && <Text style={styles.title}>{title}</Text>}
    <View style={styles.container}>{children}</View>
  </View>
);
