import React, { FC } from 'react';
import { Text } from 'react-native';

import { useNavigation } from '../../../hooks/use-navigation.hook';
import { IconNameEnum } from '../../icon/icon-name.enum';
import { Row } from '../../row/row';
import { TouchableIcon } from '../../touchable-icon/touchable-icon';

import { styles } from './header-title.styles';

interface Props {
  text: string;
}

export const HeaderTitle: FC<Props> = ({ text }) => {
  const { goBack } = useNavigation();

  return (
    <Row>
      <TouchableIcon name={IconNameEnum.ArrowLeft} onPress={goBack} />
      <Text style={styles.text}>{text}</Text>
    </Row>
  );
};
