import React, { FC } from 'react';
import { View } from 'react-native';

import { Column } from '../../../../column/column';
import { IconNameEnum } from '../../../../icon/icon-name.enum';
import { Row } from '../../../../row/row';
import { MainText } from '../../../../text/text';
import { TouchableIcon } from '../../../../touchable-icon/touchable-icon';

import { styles } from './header-side-swap.styles';

export const HeaderSwapSide: FC = () => {
  const openSomething = () => null;

  return (
    <Column style={styles.root}>
      <Row style={styles.wrapper}>
        <MainText style={styles.text}>Rates update in</MainText>
        <View style={styles.timer}>
          <MainText style={styles.number} numberOfLines={1}>
            00:30
          </MainText>
        </View>
      </Row>
      <TouchableIcon name={IconNameEnum.Slider} onPress={openSomething} />
    </Column>
  );
};
