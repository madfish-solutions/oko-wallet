import React, { FC, useMemo } from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';

import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
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
import { HeaderIconsProps } from './header.interface';

interface Props extends HeaderIconsProps {
  title: string;
  navigationType?: HeaderSideTypeEnum;
  style?: StyleProp<ViewStyle>;
}

const rootRoutes: string[] = [ScreensEnum.Receive, ScreensEnum.Send, ScreensEnum.Settings];

export const HeaderSecondaryScreen: FC<Props> = ({ title, icons, navigationType, style }) => {
  const { navigate, goBack } = useNavigation();

  const isRootRoute = useMemo(() => rootRoutes.includes(title), [title]);

  const routeNavigation = () => (isRootRoute ? navigate(ScreensEnum.Wallet) : goBack());

  const component = useMemo(() => {
    switch (navigationType) {
      case HeaderSideTypeEnum.Icons:
        return icons && <HeaderSideIcons icons={icons} />;
      case HeaderSideTypeEnum.AccountBalance:
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
          <TouchableIcon name={IconNameEnum.ArrowLeft} onPress={routeNavigation} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </Column>

        {component}
      </Row>
    </HeaderContainer>
  );
};
