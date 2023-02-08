import React, { FC } from 'react';
import { View } from 'react-native';

import { Icon } from '../../../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../../../components/icon/icon-name.enum';
import { IconWithBorderEnum } from '../../../../../../../components/icon-with-border/enums';
import { Row } from '../../../../../../../components/row/row';
import { Token } from '../../../../../../../components/token/token';
import { TokenMetadata } from '../../../../../../../interfaces/token-metadata.interface';

import { styles } from './swap-route-item.styles';

interface Props {
  fromToken: TokenMetadata;
  toToken: TokenMetadata;
}

export const SwapRouteItem: FC<Props> = ({ fromToken, toToken }) => (
  <Row style={styles.root}>
    <View style={styles.square}>
      <View style={styles.greySquare} />
    </View>
    <Token
      symbol={fromToken.symbol}
      uri={fromToken.thumbnailUri}
      forceHideTokenName
      symbolStyle={styles.symbol}
      iconType={IconWithBorderEnum.Ternary}
    />
    <Icon name={IconNameEnum.ArrowRightSmall} iconStyle={styles.arrow} />
    <Token
      symbol={toToken.symbol}
      uri={toToken.thumbnailUri}
      forceHideTokenName
      symbolStyle={styles.symbol}
      iconType={IconWithBorderEnum.Ternary}
    />
  </Row>
);
