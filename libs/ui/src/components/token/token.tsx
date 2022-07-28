import React, { FC } from 'react';
import { Image, Text } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { getCustomSize } from '../../styles/format-size';
import { Column } from '../column/column';
import { IconWithBorder } from '../icon-with-border/icon-with-border';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';

import { styles } from './token.styles';

interface Props {
  style?: ViewStyleProps;
}

export const Token: FC<Props> = ({ style }) => (
  <Row style={style}>
    <IconWithBorder type="quinary" style={styles.icon}>
      <Image source={{ uri: 'https://cdn.sheepfarm.io/nft/decor/img/31001.png' }} style={styles.image} />
    </IconWithBorder>
    <Column>
      <Row>
        <Text style={styles.symbol}>KLAY</Text>
        <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />
      </Row>
      <Text style={styles.name}>Token name</Text>
    </Column>
  </Row>
);
