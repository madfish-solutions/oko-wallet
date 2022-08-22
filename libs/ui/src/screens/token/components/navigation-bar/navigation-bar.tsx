import React, { FC, Fragment } from 'react';
import { Pressable } from 'react-native';

import { Divider } from '../../../../components/divider/divider';
import { Icon } from '../../../../components/icon/icon';
import { Row } from '../../../../components/row/row';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { getCustomSize } from '../../../../styles/format-size';

import { tokenNavigationBar } from './constants';
import { styles } from './navigation-bar.styles';

interface Props {
  tokenSlug: string;
}

type Screens = ScreensEnum.Send | ScreensEnum.Receive;

export const NavigationBar: FC<Props> = ({ tokenSlug }) => {
  const { navigate } = useNavigation();
  const [tokenAddress, tokenId] = tokenSlug.split('_');

  const navigateToRoute = (screen: Screens) => navigate(screen, { tokenAddress, tokenId });

  return (
    <Row style={styles.root}>
      {tokenNavigationBar.map(({ id, routeName, iconName }) => (
        <Fragment key={id}>
          <Pressable onPress={() => navigateToRoute(routeName as Screens)} style={styles.button}>
            <Icon name={iconName} />
          </Pressable>
          {id < 4 && <Divider size={getCustomSize(2)} />}
        </Fragment>
      ))}
    </Row>
  );
};
