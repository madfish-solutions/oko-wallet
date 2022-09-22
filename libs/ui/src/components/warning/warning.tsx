import React, { FC } from 'react';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './warning.styles';

interface Props {
  text: string;
  numberOfLines?: number;
  style?: ViewStyleProps;
}

export const Warning: FC<Props> = ({ text, numberOfLines, style }) => (
  <Row style={[styles.root, style]}>
    <Icon name={IconNameEnum.WarningYellow} iconStyle={styles.icon} />
    <Text style={styles.text} numberOfLines={numberOfLines}>
      {text}
    </Text>
  </Row>
);
