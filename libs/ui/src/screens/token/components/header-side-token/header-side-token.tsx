import React, { FC } from 'react';
import { Text } from 'react-native';

import { Column } from '../../../../components/column/column';
import { Dynamics } from '../../../../components/dynamics/dynamics';
import { IconWithBorder } from '../../../../components/icon-with-border/icon-with-border';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Image } from '../../../../components/image/image';
import { Row } from '../../../../components/row/row';
import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { getCustomSize } from '../../../../styles/format-size';

import { styles } from './header-side-token.styles';

interface Props {
  name: string;
  price: string;
  dynamics: string;
  thumbnailUri?: string;
  isGasToken?: boolean;
  style?: ViewStyleProps;
}

export const HeaderSideToken: FC<Props> = ({ name, price, dynamics, thumbnailUri, isGasToken = false, style }) => (
  <Column style={[styles.root, style]}>
    <Row style={styles.wrapper}>
      <Text style={styles.amount}>{`${price} $`}</Text>
      <Dynamics value={dynamics} />
    </Row>
    <Row>
      {isGasToken && <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />}
      <Text style={styles.tokenName}>{name}</Text>
      <IconWithBorder type="secondary" style={styles.imageContainer}>
        <Image uri={thumbnailUri} />
      </IconWithBorder>
    </Row>
  </Column>
);
