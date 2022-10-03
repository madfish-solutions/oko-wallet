import { isDefined } from '@rnw-community/shared';
import React, { FC, ReactChild } from 'react';
import { PressableProps, View } from 'react-native';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Pressable } from '../../../../components/pressable/pressable';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';

import { styles } from './item.styles';

interface Props extends Pick<PressableProps, 'onPress'> {
  icon?: IconNameEnum;
  title: string;
  iconComponent?: ReactChild;
}

export const Item: FC<Props> = ({ icon, iconComponent, title, onPress, children }) => (
  <Pressable onPress={onPress} style={styles.root}>
    <Row style={styles.content}>
      <Row>
        {isDefined(icon) && <Icon iconStyle={styles.icon} name={icon} />}
        {isDefined(iconComponent) && iconComponent}
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
      </Row>
      {isDefined(children) ? children : <Icon name={IconNameEnum.ChevronRight} />}
    </Row>
  </Pressable>
);
