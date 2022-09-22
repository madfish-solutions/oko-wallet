import React, { FC, useMemo } from 'react';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './dynamics.styles';

interface Props {
  value: number;
  percent?: boolean;
  style?: ViewStyleProps;
}

export const Dynamics: FC<Props> = ({ value, percent = true, style }) => {
  const isDescending = value < 0;
  const correctedValue = value.toFixed(2);

  const color = useMemo(() => (isDescending ? colors.red : colors.green), [isDescending]);

  const customValue = useMemo(
    () => (!percent && !isDescending ? `+ ${correctedValue} $` : `${correctedValue}%`),
    [isDescending, percent, correctedValue]
  );

  return (
    <Row style={style}>
      <Text style={[styles.percent, { color }]}>{customValue}</Text>
      {percent && (
        <Icon
          name={IconNameEnum.Dropdown}
          size={getCustomSize(2)}
          color={color}
          iconStyle={!isDescending && styles.ascendingIcon}
        />
      )}
    </Row>
  );
};
