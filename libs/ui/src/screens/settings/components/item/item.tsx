import { isDefined } from '@rnw-community/shared';
import React, { FC, PropsWithChildren, ReactChild } from 'react';
import { PressableProps } from 'react-native';
import { TestIDProps } from 'src/interfaces/test-id.props';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Pressable } from '../../../../components/pressable/pressable';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { ViewStyleProps } from '../../../../interfaces/style.interface';

import { styles } from './item.styles';

type Props = PropsWithChildren<{
  icon?: IconNameEnum;
  title: string;
  iconComponent?: ReactChild;
  style?: ViewStyleProps;
}> &
  TestIDProps &
  Pick<PressableProps, 'onPress'>;

export const Item: FC<Props> = ({ icon, iconComponent, title, onPress, children, style, testID }) => (
  <Pressable onPress={onPress} style={[styles.root, style]} testID={testID}>
    <Row style={styles.content}>
      <Row>
        {isDefined(icon) && <Icon iconStyle={styles.icon} name={icon} />}
        {isDefined(iconComponent) && iconComponent}

        <Text style={styles.title}>{title}</Text>
      </Row>
      {isDefined(children) ? children : <Icon name={IconNameEnum.ChevronRight} />}
    </Row>
  </Pressable>
);
