import React, { FC } from 'react';

import { shortize } from '../../utils/shortize.util';
import { Text } from '../text/text';

import { styles } from './address.styles';

interface Props {
  address: string;
  isShortize?: boolean;
  numberOfLines?: number;
}

export const Address: FC<Props> = ({ address, isShortize = true, numberOfLines }) => (
  <Text style={styles.root} numberOfLines={numberOfLines}>
    {isShortize ? shortize(address) : address}
  </Text>
);
