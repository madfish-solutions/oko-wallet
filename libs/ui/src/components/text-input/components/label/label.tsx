import React, { FC } from 'react';
import { Text } from 'react-native';

import { Row } from '../../../row/row';

import { styles } from './label.styles';

interface Props {
  isOptional?: boolean;
  title: string;
}

export const Label: FC<Props> = ({ isOptional = false, title }) => (
  <Row style={styles.root}>
    <Text style={styles.label}>{title}</Text>
    {isOptional && <Text style={styles.optionalText}>Optional</Text>}
  </Row>
);
