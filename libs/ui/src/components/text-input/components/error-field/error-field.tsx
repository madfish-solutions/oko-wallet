import React, { FC } from 'react';
import { View } from 'react-native';

import { Text } from '../../../text/text';

import { styles } from './error-field.styles';

interface Props {
  name?: string;
}

export const ErrorField: FC<Props> = ({ name }) => (
  <View style={styles.root}>
    <Text style={styles.text}>{name}</Text>
  </View>
);
