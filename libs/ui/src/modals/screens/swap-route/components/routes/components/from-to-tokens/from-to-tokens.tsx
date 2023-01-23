import React, { FC } from 'react';
import { View } from 'react-native';

import { IconWithBorderEnum } from '../../../../../../../components/icon-with-border/enums';
import { Row } from '../../../../../../../components/row/row';
import { Text } from '../../../../../../../components/text/text';
import { Token } from '../../../../../../../components/token/token';
import { TokenMetadata } from '../../../../../../../interfaces/token-metadata.interface';

import { styles } from './from-to-tokens.styles';

interface Props {
  fromToken: Pick<TokenMetadata, 'symbol' | 'thumbnailUri'>;
  toToken: Pick<TokenMetadata, 'symbol' | 'thumbnailUri'>;
}

export const FromToTokens: FC<Props> = ({ fromToken, toToken }) => (
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
    <Text style={styles.arrow}>&rarr;</Text>
    <Token
      symbol={toToken.symbol}
      uri={toToken.thumbnailUri}
      forceHideTokenName
      symbolStyle={styles.symbol}
      iconType={IconWithBorderEnum.Ternary}
    />
  </Row>
);
