import { isDefined } from '@rnw-community/shared';
import React, { FC, ReactNode, useMemo } from 'react';
import { Linking, Pressable } from 'react-native';

import { Icon } from '../../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../../components/icon/icon-name.enum';
import { Row } from '../../../../../../components/row/row';
import { Text } from '../../../../../../components/text/text';

import { styles } from './item.styles';

interface Props {
  name: string;
  value: string | ReactNode;
  prompt: string | null;
}

export const Item: FC<Props> = ({ name, value, prompt }) => {
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

        return <Text style={styles.value}>{value}</Text>;
      }
      default: {
        if (isDefined(prompt)) {
          return (
            <Pressable onPress={promptNavigate}>
              <Row>
                {value}
                <Icon name={IconNameEnum.Tooltip} iconStyle={styles.icon} />
              </Row>
            </Pressable>
          );
        }

        return value;
      }
    }
  }, []);

  return (
    <Row style={styles.item}>
      <Text style={styles.name}>{name}</Text>
      {rowValue}
    </Row>
  );
};
