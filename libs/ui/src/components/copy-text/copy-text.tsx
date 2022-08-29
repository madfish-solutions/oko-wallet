import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { handleCopyToClipboard } from '../../utils/copy-to-clipboard.util';
import { shortize } from '../../utils/shortize.util';
import { Text } from '../text/text';

import { styles } from './copy-text.styles';

interface Props {
  address: string;
  isShortize?: boolean;
  numberOfLines?: number;
}

export const CopyText: FC<Props> = ({ address, isShortize = true, numberOfLines }) => {
  const copy = () => handleCopyToClipboard(address);

  return (
    <TouchableOpacity onPress={copy}>
      <Text style={styles.root} numberOfLines={numberOfLines}>
        {isShortize ? shortize(address) : address}
      </Text>
    </TouchableOpacity>
  );
};
