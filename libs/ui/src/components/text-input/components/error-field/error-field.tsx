import React, { FC } from 'react';
import { View } from 'react-native';

import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { Text } from '../../../text/text';

import { styles } from './error-field.styles';

interface Props {
  name?: string;
  style?: ViewStyleProps;
}

export const ErrorField: FC<Props> = ({ name, style }) => (
  <View style={[styles.root, style]}>
    <Text style={styles.text}>{name}</Text>
  </View>
);
