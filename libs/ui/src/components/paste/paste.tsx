import { OnEventFn } from '@rnw-community/shared';
import React, { FC, useEffect } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { isMobile } from 'shared';

import { isFullpage } from '../../utils/location.utils';
import { openFullViewPage } from '../../utils/open-maximise-screen.util';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Text } from '../text/text';

import { styles } from './paste.styles';

interface Props {
  handlePaste: OnEventFn<GestureResponderEvent>;
}

export const Paste: FC<Props> = ({ handlePaste }) => {
  useEffect(() => {
    if (!isMobile && !isFullpage) {
      navigator.permissions.query({ name: 'clipboard-read' as PermissionName }).then(status => {
        if (status.state === 'prompt') {
          openFullViewPage();
        }
      });
    }
  }, []);

  return (
    <TouchableOpacity onPress={handlePaste} style={styles.root}>
      <Icon name={IconNameEnum.Paste} iconStyle={styles.buttonIcon} />
      <Text style={styles.buttonText}>Paste</Text>
    </TouchableOpacity>
  );
};
