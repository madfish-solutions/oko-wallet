import { isDefined } from '@rnw-community/shared';
import React, { FC, ReactNode, useMemo } from 'react';
import { Linking, Pressable } from 'react-native';

import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { Text } from '../text/text';
import { TouchableIcon } from '../touchable-icon/touchable-icon';

import { styles } from './info-item.styles';

interface Props {
  name: string;
  value: string | ReactNode;
  prompt?: string | null;
}

export const InfoItem: FC<Props> = ({ name, value, prompt }) => {
  const promptNavigate = () => {
    if (isDefined(prompt)) {
      return Linking.openURL(prompt);
    }
  };

  const rowValue = useMemo(() => {
    switch (typeof value) {
      case 'string': {
        if (isDefined(prompt)) {
          return (
            <Pressable onPress={promptNavigate}>
              <Row>
                <Text style={styles.stringValue}>{value}</Text>
                <Icon name={IconNameEnum.Tooltip} iconStyle={styles.icon} />
              </Row>
            </Pressable>
          );
        }

        return <Text style={styles.value}>{value ?? '---'}</Text>;
      }
      default: {
        if (isDefined(prompt) && isDefined(value)) {
          return (
            <Row>
              {value}
              <TouchableIcon name={IconNameEnum.Tooltip} onPress={promptNavigate} iconStyle={styles.icon} />
            </Row>
          );
        }

        return <Text style={styles.value}>{value ?? '---'}</Text>;
      }
    }
  }, [value, prompt]);

  return (
    <Row style={styles.item}>
      <Text style={styles.name}>{name}</Text>
      {rowValue}
    </Row>
  );
};
