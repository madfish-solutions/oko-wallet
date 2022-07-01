import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { Column } from '../../../column/column';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Row } from '../../../row/row';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './navigation-swap.styles';

export const NavigationSwap: FC = () => (
  <Column style={styles.root}>
    <Row style={styles.wrapper}>
      <Text style={styles.text}>Rates update in</Text>
      <View style={styles.timer}>
        <Text style={styles.number}>00:30</Text>
      </View>
    </Row>
    <TouchableIcon name={IconNameEnum.Slider} />
  </Column>
);
