import React, { FC, useMemo } from 'react';
import { Text } from 'react-native';

import { useNavigation } from '../../../hooks/use-navigation.hook';
import { Column } from '../../column/column';
import { IconNameEnum } from '../../icon/icon-name.enum';
import { Row } from '../../row/row';
import { TouchableIcon } from '../../touchable-icon/touchable-icon';

import { styles } from './header-navigation.styles';
import { NavigationBalance } from './navigation-balance/navigation-balance';
import { NavigationIcons } from './navigation-icons/navigation-icons';
import { NavigationTokenDetails } from './navigation-token-details/navigation-token-details';

export enum NavigationTypeEnum {
  Empty = 'Empty',
  Icons = 'Icons',
  AccountBalance = 'AccountBalance',
  TokenInfo = 'TokenInfo'
}

interface Props {
  title: string;
  type?: NavigationTypeEnum;
}

export const HeaderNavigation: FC<Props> = ({ title, type = NavigationTypeEnum.Empty }) => {
  const { goBack } = useNavigation();

  const component = useMemo(() => {
    switch (type) {
      case NavigationTypeEnum.Icons:
        return <NavigationIcons />;
      case NavigationTypeEnum.AccountBalance:
        return <NavigationBalance />;
      case NavigationTypeEnum.TokenInfo:
        return <NavigationTokenDetails />;
      default:
        return null;
    }
  }, [type]);

  return (
    <Row style={styles.root}>
      <Column>
        <TouchableIcon name={IconNameEnum.ArrowLeft} onPress={goBack} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </Column>

      {component}
    </Row>
  );
};
