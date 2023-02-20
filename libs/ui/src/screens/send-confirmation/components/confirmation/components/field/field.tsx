import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';

import { IconNameEnum } from '../../../../../../components/icon/icon-name.enum';
import { LoaderSizeEnum } from '../../../../../../components/loader/enums';
import { Loader } from '../../../../../../components/loader/loader';
import { Row } from '../../../../../../components/row/row';
import { Text } from '../../../../../../components/text/text';
import { TouchableIcon } from '../../../../../../components/touchable-icon/touchable-icon';
import { colors } from '../../../../../../styles/colors';

import { styles } from './field.styles';

interface Props {
  loading?: boolean;
  amount: number;
  title: string;
  symbol: string;
  iconName?: IconNameEnum;
  onIconPress?: OnEventFn<GestureResponderEvent>;
}

export const Field: FC<Props> = ({ loading = false, title, amount, symbol, onIconPress, iconName }) => (
  <Row style={styles.root}>
    <Text style={styles.title}>{title}</Text>
    {loading ? (
      <Loader color={colors.textGrey1} size={LoaderSizeEnum.Small} />
    ) : (
      <Row>
        <Text numberOfLines={1} style={[styles.maxWidth, styles.number13Text]}>
          {amount}
        </Text>
        <Text style={[styles.number13Text, styles.symbol]}>{symbol}</Text>
        {isDefined(iconName) && <TouchableIcon name={iconName} onPress={onIconPress} style={styles.icon} />}
      </Row>
    )}
  </Row>
);
