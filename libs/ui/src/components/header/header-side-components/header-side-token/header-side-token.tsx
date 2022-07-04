import React, { FC } from 'react';
import { Image, Text } from 'react-native';

import { StylePropsType } from '../../../../interfaces/style.interface';
import { getCustomSize } from '../../../../styles/format-size';
import { Column } from '../../../column/column';
import { Dynamics } from '../../../dynamics/dynamics';
import { IconWithBorder } from '../../../icon-with-border/icon-with-border';
import { Icon } from '../../../icon/icon';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Row } from '../../../row/row';

import { styles } from './header-side-token.styles';

interface Props {
  style?: StylePropsType;
}

export const HeaderSideToken: FC<Props> = ({ style }) => {
  const imageSource = 'https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png';

  return (
    <Column style={[styles.root, style]}>
      <Row style={styles.wrapper}>
        <Text style={styles.amount}>0.56 $</Text>
        <Dynamics value="-10.2" />
      </Row>
      <Row>
        <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />
        <Text style={styles.tokenName}>Klaytn</Text>
        <IconWithBorder type="secondary" style={styles.imageContainer}>
          <Image source={{ uri: imageSource }} style={styles.image} />
        </IconWithBorder>
      </Row>
    </Column>
  );
};
