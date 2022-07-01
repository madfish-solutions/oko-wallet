import { useNavigation } from '@react-navigation/native';
import React, { FC, useMemo } from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';

import { Column } from '../column/column';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { TouchableIcon } from '../touchable-icon/touchable-icon';

import { HeaderContainer } from './header-container/header-container';
import { styles } from './header-secondary-screen.styles';
import { HeaderSideBalance } from './header-side-components/header-side-balance/header-side-balance';
import { HeaderSideIcons } from './header-side-components/header-side-icons/header-side-icons';
import { HeaderSwapSide } from './header-side-components/header-side-swap/header-side-swap';
import { HeaderSideToken } from './header-side-components/header-side-token/header-side-token';
import { HeaderSideTypeEnum } from './header-side-type.enum';

interface Props {
  title: string;
  navigationType?: HeaderSideTypeEnum;
  style?: StyleProp<ViewStyle>;
}

export const HeaderSecondaryScreen: FC<Props> = ({ title, navigationType, style }) => {
  const { goBack } = useNavigation();

  const component = useMemo(() => {
    switch (navigationType) {
      case HeaderSideTypeEnum.Icons:
        return <HeaderSideIcons />;
      case HeaderSideTypeEnum.AssetBalance:
        return <HeaderSideBalance />;
      case HeaderSideTypeEnum.TokenInfo:
        return <HeaderSideToken />;
      case HeaderSideTypeEnum.Swap:
        return <HeaderSwapSide />;
      default:
        return null;
    }
  }, [navigationType]);

  return (
    <HeaderContainer style={style}>
      <Row style={styles.root}>
        <Column>
          <TouchableIcon name={IconNameEnum.ArrowLeft} onPress={goBack} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </Column>

        {component}
      </Row>
    </HeaderContainer>
  );
};
