import React, { FC, useState } from 'react';
import { Text } from 'react-native';

import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { getCustomSize } from '../../../../styles/format-size';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Row } from '../../../row/row';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './header-account-balance.styles';

interface Props {
  style?: ViewStyleProps;
}

export const HeaderAccountBalance: FC<Props> = ({ style }) => {
  const [isShowBalance, setIsShowBalance] = useState(true);

  const changeBalanceVisibility = () => {
    setIsShowBalance(!isShowBalance);
  };

  return (
    <Row style={style}>
      <TouchableIcon
        name={isShowBalance ? IconNameEnum.EyeOpen : IconNameEnum.EyeClosed}
        size={getCustomSize(2)}
        onPress={changeBalanceVisibility}
        iconStyle={styles.icon}
      />
      <Text style={[styles.balance, styles.text]}>4,123.00 M</Text>
      <Text style={[styles.currency, styles.text]}>$</Text>
    </Row>
  );
};
