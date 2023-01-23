import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useEffect, useState } from 'react';

import { TextStyleProps, ViewStyleProps } from '../../interfaces/style.interface';
import { getCustomSize } from '../../styles/format-size';
import { Column } from '../column/column';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { IconWithBorderEnum } from '../icon-with-border/enums';
import { IconWithBorder } from '../icon-with-border/icon-with-border';
import { Image } from '../image/image';
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
  iconType?: IconWithBorderEnum;
  symbolStyle?: TextStyleProps;
}

export const Token: FC<Props> = ({
  uri,
  symbol,
  name,
  gasToken = false,
  forceHideTokenName = false,
  iconType = IconWithBorderEnum.Quinary,
  style,
  symbolStyle
}) => {
  const [isLoadingError, setIsLoadingError] = useState(false);

  const onError = () => setIsLoadingError(true);

  useEffect(() => {
    setIsLoadingError(false);
  }, [uri]);

  return (
    <Row style={style}>
      <IconWithBorder type={iconType} style={styles.icon}>
        <Image uri={uri} isLoadingError={isLoadingError} onError={onError} />
      </IconWithBorder>
      <Column>
        <Row style={styles.row}>
          <Text style={[styles.symbol, symbolStyle]} numberOfLines={1}>
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
