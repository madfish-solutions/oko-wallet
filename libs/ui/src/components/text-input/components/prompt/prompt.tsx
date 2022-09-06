import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent, Text } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Row } from '../../../row/row';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './prompt.styles';

interface Props {
  handlePrompt?: OnEventFn<GestureResponderEvent>;
  isInfo?: boolean;
  title: string;
}

const iconSize = getCustomSize(2);

export const Prompt: FC<Props> = ({ handlePrompt, title, isInfo = false }) => (
  <Row style={styles.root}>
    <Text style={styles.promptText}>{title}</Text>
    {isInfo && <TouchableIcon name={IconNameEnum.Info} size={iconSize} style={styles.infoIcon} />}
    {handlePrompt && <TouchableIcon name={IconNameEnum.Tooltip} onPress={handlePrompt} size={iconSize} />}
  </Row>
);
