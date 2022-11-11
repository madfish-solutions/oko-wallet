import React, { FC } from 'react';

import { TextStyleProps, ViewStyleProps } from '../../../../interfaces/style.interface';
import { Row } from '../../../row/row';
import { Text } from '../../../text/text';

import { styles } from './label.styles';

interface Props {
  isOptional?: boolean;
  title: string;
  style?: ViewStyleProps;
  textStyle?: TextStyleProps;
}

export const Label: FC<Props> = ({ isOptional = false, title, style, textStyle }) => (
  <Row style={[styles.root, style]}>
    <Text style={[styles.label, textStyle]}>{title}</Text>
    {isOptional && <Text style={styles.optionalText}>Optional</Text>}
  </Row>
);
