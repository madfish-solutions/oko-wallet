import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC } from 'react';

import { TextStyleProps } from '../../interfaces/style.interface';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './token-amount.styles';

interface Props {
  value: string;
  symbol?: string;
  style?: TextStyleProps;
  symbolStyle?: TextStyleProps;
}

export const TokenAmount: FC<Props> = ({ value, symbol, style, symbolStyle }) => {
  const isSmallValue = value.includes('<');

  const textStyle = [styles.text, style];

  return (
    <Row>
      {isSmallValue && <Text style={[textStyle, styles.lessSign]}>&#60;</Text>}
      <Text style={textStyle}>{isSmallValue ? value.replace('<', '').trim() : value}</Text>
      {isNotEmptyString(symbol) && (
        <Text numberOfLines={1} style={[textStyle, symbolStyle, styles.symbol]}>
          {symbol}
        </Text>
      )}
    </Row>
  );
};
