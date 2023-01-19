import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';

import { Column } from '../../../../components/column/column';
import { Dynamics } from '../../../../components/dynamics/dynamics';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { IconWithBorderEnum } from '../../../../components/icon-with-border/enums';
import { IconWithBorder } from '../../../../components/icon-with-border/icon-with-border';
import { Image } from '../../../../components/image/image';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
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
    {isDefined(price) && (
      <Row style={styles.wrapper}>
        <Text style={styles.amount}>{`${price.toFixed(2)} $`}</Text>
        {isDefined(dynamics) && <Dynamics value={dynamics} />}
      </Row>
    )}
    <Row>
      {isGasToken && <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />}
      <Text style={styles.tokenName}>{name}</Text>
      <IconWithBorder type={IconWithBorderEnum.Secondary} style={styles.imageContainer}>
        <Image uri={thumbnailUri} />
      </IconWithBorder>
    </Row>
  </Column>
);
