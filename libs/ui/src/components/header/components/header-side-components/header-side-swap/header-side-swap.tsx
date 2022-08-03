import React, { FC } from 'react';
import { View } from 'react-native';

import { Column } from '../../../../column/column';
import { IconNameEnum } from '../../../../icon/icon-name.enum';
import { Row } from '../../../../row/row';
import { Text } from '../../../../text/text';
import { TouchableIcon } from '../../../../touchable-icon/touchable-icon';

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
