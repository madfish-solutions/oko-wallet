import React, { FC, Fragment } from 'react';
import { Pressable } from 'react-native';

import { Divider } from '../../../../components/divider/divider';
import { Icon } from '../../../../components/icon/icon';
import { Row } from '../../../../components/row/row';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { AccountToken } from '../../../../interfaces/account-token.interface';
import { getCustomSize } from '../../../../styles/format-size';

import { tokenNavigationBar } from './constants';
import { styles } from './navigation-bar.styles';

type Props = Pick<AccountToken, 'tokenAddress' | 'tokenId'>;

type Screens = ScreensEnum.Send | ScreensEnum.Receive;

export const NavigationBar: FC<Props> = ({ tokenAddress, tokenId }) => {
  const { navigate } = useNavigation();

  const navigateToRoute = (screen: Screens) => {
    if (tokenAddress !== 'gas_token') {
      return navigate(screen, { tokenAddress, tokenId });
    }

    return navigate(screen, { tokenAddress: '', tokenId: '' });
  };

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
