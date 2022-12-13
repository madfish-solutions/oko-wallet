import React, { FC } from 'react';
import { View } from 'react-native';

import { Divider } from '../../../../../../components/divider/divider';
import { Row } from '../../../../../../components/row/row';
import { Text } from '../../../../../../components/text/text';
import { SpeedEnum } from '../../enums';

import { styles } from './progress-bar.styles';

interface Props {
  status: SpeedEnum;
}

export const ProgressBar: FC<Props> = ({ status }) => {
  switch (status) {
    case SpeedEnum.Slow:
      return (
        <Row>
          <Text style={styles.text}>{status}</Text>
          <Row style={styles.container}>
            <View style={[styles.item, styles.left, styles.red]} />
          </Row>
        </Row>
      );

    case SpeedEnum.Medium:
      return (
        <Row>
          <Text style={styles.text}>{status}</Text>
          <Row style={styles.container}>
            <View style={[styles.item, styles.left, styles.yellow]} />
            <Divider style={styles.divider} />
            <View style={[styles.item, styles.center, styles.yellow]} />
          </Row>
        </Row>
      );

    case SpeedEnum.Fast:
      return (
        <Row>
          <Text style={styles.text}>{status}</Text>
          <Row style={styles.container}>
            <View style={[styles.item, styles.left, styles.green]} />
            <Divider style={styles.divider} />
            <View style={[styles.item, styles.center, styles.green]} />
            <Divider style={styles.divider} />
            <View style={[styles.item, styles.right, styles.green]} />
          </Row>
        </Row>
      );

    default:
      return <Row style={styles.container} />;
  }
};
