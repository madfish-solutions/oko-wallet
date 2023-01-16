import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';

import { Column } from '../column/column';
import { CopyText } from '../copy-text/copy-text';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { Text } from '../text/text';
import { TouchableIcon } from '../touchable-icon/touchable-icon';

import { styles } from './toast-description.styles';

interface Props {
  message: string;
  opHash?: string;
  onPress?: OnEventFn<GestureResponderEvent>;
}

export const ToastDescription: FC<Props> = ({ message, opHash, onPress }) => (
  <Column>
    <Text style={styles.text}>{message}</Text>
    {isDefined(opHash) && onPress && (
      <Row style={styles.opHash}>
        <Text style={[styles.text, styles.marginRight]}>Operation hash:</Text>
        <CopyText text={opHash} textStyles={styles.opHashText} />
        <TouchableIcon name={IconNameEnum.OutLink} onPress={onPress} />
      </Row>
    )}
  </Column>
);
