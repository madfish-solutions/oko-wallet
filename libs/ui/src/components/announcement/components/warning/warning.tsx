import React, { FC } from 'react';
import { View } from 'react-native';

import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { Icon } from '../../../icon/icon';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Row } from '../../../row/row';
import { Text } from '../../../text/text';
import { styles as announcementStyles } from '../../announcement.styles';

import { styles } from './warning.styles';

interface Props {
  text: string;
  style?: ViewStyleProps;
}

export const Warning: FC<Props> = ({ text, style }) => (
  <View style={[announcementStyles.root, announcementStyles.warning, style]}>
    <Row>
      <Icon name={IconNameEnum.WarningYellow} iconStyle={announcementStyles.icon} />
      <Text style={styles.warningText}>Warning</Text>
    </Row>
    <Text style={styles.description}>{text}</Text>
  </View>
);
