import React, { FC } from 'react';

import { LoaderSizeEnum } from '../../../../../../components/loader/enums';
import { Loader } from '../../../../../../components/loader/loader';
import { Row } from '../../../../../../components/row/row';
import { Text } from '../../../../../../components/text/text';
import { colors } from '../../../../../../styles/colors';

import { styles } from './fee-item.styles';

interface Props {
  loading: boolean;
  fee?: number;
  title: string;
  symbol: string;
}

export const FeeItem: FC<Props> = ({ loading, title, fee = '', symbol }) => (
  <Row style={styles.root}>
    <Text style={styles.title}>{title} Fee</Text>
    {loading ? (
      <Loader color={colors.textGrey1} size={LoaderSizeEnum.Small} />
    ) : (
      <Row>
        <Text numberOfLines={1} style={[styles.maxWidth, styles.number13Text]}>
          {fee}
        </Text>
        <Text style={[styles.number13Text, styles.symbol]}>{symbol}</Text>
      </Row>
    )}
  </Row>
);
