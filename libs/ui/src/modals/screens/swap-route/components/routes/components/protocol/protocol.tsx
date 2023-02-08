import React, { FC } from 'react';
import { View } from 'react-native';

import { Row } from '../../../../../../../components/row/row';
import { Text } from '../../../../../../../components/text/text';

import { styles } from './protocol.styles';

interface Props {
  name: string;
}

export const Protocol: FC<Props> = ({ name }) => (
  <Row style={styles.root}>
    <View style={styles.image}>
      <View style={styles.square} />
      <View style={styles.circle} />
    </View>
    <Text style={styles.name}>{name}</Text>
  </Row>
);
