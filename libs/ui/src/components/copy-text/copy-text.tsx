import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { useToast } from '../../hooks/use-toast.hook';
import { TextStyleProps } from '../../interfaces/style.interface';
import { handleSetValueToClipboard } from '../../utils/copy-to-clipboard.util';
import { shortize } from '../../utils/shortize.util';
import { Text } from '../text/text';

import { styles } from './copy-text.styles';

interface Props {
  text: string;
  isShortize?: boolean;
  numberOfLines?: number;
  style?: TextStyleProps;
  textStyles?: TextStyleProps;
}

export const CopyText: FC<Props> = ({ text, isShortize = true, numberOfLines, style, textStyles }) => {
  const { showSuccessToast } = useToast();

  const copy = () => {
    handleSetValueToClipboard(text);

    showSuccessToast({
      message: 'Copied',
      duration: 0
    });
  };

  return (
    <TouchableOpacity onPress={copy} style={[styles.root, style]}>
      <Text style={[styles.text, textStyles]} numberOfLines={numberOfLines}>
        {isShortize ? shortize(text) : text}
      </Text>
    </TouchableOpacity>
  );
};
