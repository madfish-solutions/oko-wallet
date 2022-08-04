import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Image, ImageErrorEventData, NativeSyntheticEvent, Text, View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { getCustomSize } from '../../styles/format-size';
import { Column } from '../column/column';
import { IconWithBorder } from '../icon-with-border/icon-with-border';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';

import { styles } from './token.styles';

interface Props {
  uri?: string;
  symbol: string;
  name?: string;
  gasToken?: boolean;
  forceNameVisibility?: boolean;
  style?: ViewStyleProps;
}

export const Token: FC<Props> = ({ uri, symbol, name, forceNameVisibility = false, gasToken = false, style }) => {
  const [loadingIsError, setLoadingIsError] = useState(false);

  const onError = useCallback((err?: NativeSyntheticEvent<ImageErrorEventData>) => {
    if (isDefined(err?.nativeEvent.error) && isNotEmptyString(err?.nativeEvent.error)) {
      setLoadingIsError(true);
    } else {
      setLoadingIsError(false);
    }
  }, []);

  useEffect(() => {
    onError();
  }, [onError, uri]);

  return (
    <Row style={style}>
      <IconWithBorder type="quinary" style={styles.icon}>
        {isDefined(uri) && isNotEmptyString(uri) && !loadingIsError ? (
          <Image source={{ uri }} onError={onError} style={styles.image} />
        ) : (
          <View style={styles.fallback} />
        )}
      </IconWithBorder>
      <Column>
        <Row>
          <Text style={styles.symbol}>{symbol}</Text>
          {gasToken && <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />}
        </Row>
        {forceNameVisibility && <Text style={styles.name}>{name ?? symbol}</Text>}
      </Column>
    </Row>
  );
};
