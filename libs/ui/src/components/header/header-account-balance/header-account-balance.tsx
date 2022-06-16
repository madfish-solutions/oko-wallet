import React, { FC, useState } from 'react';
import { Text } from 'react-native';

import { StylePropsType } from '../../../interfaces/style.interface';
import { IconNameEnum } from '../../icon/icon-name.enum';
import { Row } from '../../row/row';
import { TouchableIcon } from '../../touchable-icon/touchable-icon';

import { styles } from './header-account-balance.styles';

interface Props {
  textStyle?: StylePropsType;
  style?: StylePropsType;
}

export const HeaderAccountBalance: FC<Props> = ({ textStyle, style }) => {
  const [isShowBalance, setIsShowBalance] = useState(false);

  const changeBalanceVisibility = () => {
    setIsShowBalance(!isShowBalance);
  };

  return (
    <Row style={style}>
      <TouchableIcon
        name={!isShowBalance ? IconNameEnum.EyeOpen : IconNameEnum.EyeClosed}
        onPress={changeBalanceVisibility}
        iconStyle={styles.icon}
      />
      {/* TODO: Add real balance value */}
      <Text style={[styles.balance, textStyle]}>4,123.00 M</Text>
      <Text style={[styles.currency, textStyle]}>$</Text>
    </Row>
  );
};
