import React, { FC } from 'react';
import { View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { Text } from '../text/text';

import { styles } from './info-box.styles';

interface Props {
  title: string;
  description: string;
  style?: ViewStyleProps;
}

export const InfoBox: FC<Props> = ({ title, description, style }) => (
  <View style={[styles.root, style]}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);
