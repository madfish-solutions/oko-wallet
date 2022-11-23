import React, { FC } from 'react';
import { View } from 'react-native';

import { AllowsRules } from '../../interfaces/dapp-connection.interface';
import { Divider } from '../divider/divider';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './allows-block.styles';

interface Props {
  rules: AllowsRules[];
}

export const AllowsBlock: FC<Props> = ({ rules }) => (
  <View style={styles.allowsBlock}>
    <Text style={styles.greyLabel}>Allows</Text>
    {rules.map(({ text, isAllowed }, index) => (
      <React.Fragment key={`${index}+${text}`}>
        <Row style={styles.allowsText}>
          <Text style={styles.greyText}>{text}</Text>
          <Row>
            <Text style={styles.allowStatus}>{isAllowed ? 'ALLOWED' : 'BLOCKED'}</Text>
            {isAllowed ? <Icon name={IconNameEnum.LockOpen} /> : <Icon name={IconNameEnum.LockClosed} />}
          </Row>
        </Row>
        <Divider style={styles.divider} />
      </React.Fragment>
    ))}
  </View>
);
