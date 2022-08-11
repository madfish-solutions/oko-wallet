import React, { FC, useMemo } from 'react';

import { ViewStyleProps } from '../../../interfaces/style.interface';
import { Row } from '../../row/row';
import { HeaderContainer } from '../components/header-container/header-container';
import { HeaderSideBalance } from '../components/header-side-components/header-side-balance/header-side-balance';
import { HeaderSideIcons } from '../components/header-side-components/header-side-icons/header-side-icons';
import { HeaderSwapSide } from '../components/header-side-components/header-side-swap/header-side-swap';
import { HeaderSideToken } from '../components/header-side-components/header-side-token/header-side-token';
import { Title } from '../components/title/title';
import { HeaderSideTypeEnum } from '../enums/header-side-type.enum';
import { HeaderIconsProps } from '../interfaces/header.interface';

import { styles } from './header-secondary-screen.styles';

interface Props extends HeaderIconsProps {
  title: string;
  navigationType?: HeaderSideTypeEnum;
  style?: ViewStyleProps;
}

export const HeaderSecondaryScreen: FC<Props> = ({ title, icons, navigationType, style }) => {
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
        <Title title={title} />

        {component}
      </Row>
    </HeaderContainer>
  );
};
