import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { getCustomSize } from '../../styles/format-size';
import { Column } from '../column/column';
import { IconWithBorder } from '../icon-with-border/icon-with-border';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './token.styles';

interface Props {
  uri?: string;
  symbol: string;
  name?: string;
  gasToken?: boolean;
  forceHideTokenName?: boolean;
  style?: ViewStyleProps;
}

export const Token: FC<Props> = ({ uri, symbol, name, gasToken = false, forceHideTokenName = false, style }) => {
  const [isLoadingError, setIsLoadingError] = useState(false);

  const onError = () => setIsLoadingError(true);

  useEffect(() => {
    setIsLoadingError(false);
  }, [uri]);

  return (
    <Row style={[styles.flex, style]}>
      <IconWithBorder type="quinary" style={styles.icon}>
        {isDefined(uri) && isNotEmptyString(uri) && !isLoadingError ? (
          <Image source={{ uri }} onError={onError} style={styles.image} />
        ) : (
          <View style={styles.fallback} />
        )}
      </IconWithBorder>
      <Column style={styles.flex}>
        <Row style={styles.row}>
          <Text style={styles.symbol} numberOfLines={1}>
            {symbol}
          </Text>
          {gasToken && <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />}
        </Row>
        {!forceHideTokenName && (
          <Text style={styles.name} numberOfLines={1}>
            {isNotEmptyString(name) ? name : symbol}
          </Text>
        )}
      </Column>
    </Row>
  );
};
