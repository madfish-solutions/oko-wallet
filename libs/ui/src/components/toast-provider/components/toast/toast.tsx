import React, { FC } from 'react';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';

import { ToastsEnum } from '../../../../enums/toasts.enums';
import { Icon } from '../../../icon/icon';
import { Row } from '../../../row/row';
import { Text } from '../../../text/text';

import { themes } from './constants/themes';
import { styles } from './toast.styles';

interface Props extends Pick<ToastProps, 'message'> {
  type: ToastsEnum;
}

export const Toast: FC<Props> = ({ message, type }) => (
  <Row style={[styles.root, themes[type].root]}>
    <Icon iconStyle={styles.icon} name={themes[type].iconName} />
    <Text style={styles.text}>{message}</Text>
  </Row>
);
