import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Text } from 'react-native';

import { Column } from '../../../../components/column/column';
import { Dynamics } from '../../../../components/dynamics/dynamics';
import { IconWithBorderEnum } from '../../../../components/icon-with-border/enums';
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
  price?: number;
  dynamics?: number;
  thumbnailUri?: string;
  isGasToken?: boolean;
  style?: ViewStyleProps;
}

export const HeaderSideToken: FC<Props> = ({ name, price, dynamics, thumbnailUri, isGasToken = false, style }) => (
  <Column style={[styles.root, style]}>
    <Row style={styles.wrapper}>
      {isDefined(price) && <Text style={styles.amount}>{`${price.toFixed(2)} $`}</Text>}
      {isDefined(dynamics) && <Dynamics value={dynamics} />}
    </Row>
    <Row>
      {isGasToken && <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />}
      <Text style={styles.tokenName}>{name}</Text>
      <IconWithBorder type={IconWithBorderEnum.Secondary} style={styles.imageContainer}>
        <Image uri={thumbnailUri} />
      </IconWithBorder>
    </Row>
  </Column>
);
