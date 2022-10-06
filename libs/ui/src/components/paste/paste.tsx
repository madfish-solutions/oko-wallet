import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { onPasteClipboard } from '../../utils/on-paste-clipboard.util';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Text } from '../text/text';

import { styles } from './paste.styles';

interface Props {
  handlePaste: OnEventFn<void>;
}

export const Paste: FC<Props> = ({ handlePaste }) => {
  const onPress = async () => {
    onPasteClipboard(handlePaste);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <Icon name={IconNameEnum.Paste} iconStyle={styles.buttonIcon} />
      <Text style={styles.buttonText}>Paste</Text>
    </TouchableOpacity>
  );
};
