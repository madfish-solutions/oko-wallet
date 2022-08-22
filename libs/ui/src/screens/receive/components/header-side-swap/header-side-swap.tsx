import React, { FC } from 'react';
import { View } from 'react-native';

import { Column } from '../../../../components/column/column';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';

import { styles } from './header-side-swap.styles';

export const HeaderSwapSide: FC = () => {
  const openSomething = () => null;

  return (
    <Column style={styles.root}>
      <Row style={styles.wrapper}>
        <Text style={styles.text}>Rates update in</Text>
        <View style={styles.timer}>
          <Text style={styles.number} numberOfLines={1}>
            00:30
          </Text>
        </View>
      </Row>
      <TouchableIcon name={IconNameEnum.Slider} onPress={openSomething} />
    </Column>
  );
};
