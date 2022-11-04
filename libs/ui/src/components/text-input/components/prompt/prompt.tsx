import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';

import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { getCustomSize } from '../../../../styles/format-size';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Row } from '../../../row/row';
import { Text } from '../../../text/text';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './prompt.styles';

interface Props {
  handlePrompt?: OnEventFn<GestureResponderEvent>;
  isInfo?: boolean;
  title: string;
  style?: ViewStyleProps;
}

const iconSize = getCustomSize(2);

export const Prompt: FC<Props> = ({ handlePrompt, title, isInfo = false, style }) => (
  <Row style={[styles.root, style]}>
    <Text style={styles.promptText}>{title}</Text>
    {isInfo && <TouchableIcon name={IconNameEnum.Info} size={iconSize} style={styles.infoIcon} />}
    {handlePrompt && <TouchableIcon name={IconNameEnum.Tooltip} onPress={handlePrompt} size={iconSize} />}
  </Row>
);
