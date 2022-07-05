import React, { FC, useMemo } from 'react';
import { Text } from 'react-native';

import { StylePropsType } from '../../interfaces/style.interface';
import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';

import { styles } from './dynamics.styles';

interface Props {
  value: string;
  percent?: boolean;
  style?: StylePropsType;
}

export const Dynamics: FC<Props> = ({ value, percent = true, style }) => {
  const isDescending = value[0] === '-';

  const color = useMemo(() => (isDescending ? colors.red : colors.green), [isDescending]);

  const customValue = useMemo(() => (!percent && !isDescending ? `+ ${value} $` : `${value}%`), [isDescending]);

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
