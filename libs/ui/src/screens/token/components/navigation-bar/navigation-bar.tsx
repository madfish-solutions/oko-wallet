import { isDefined } from '@rnw-community/shared';
import React, { FC, Fragment } from 'react';
import { Pressable } from 'react-native';

import { Divider } from '../../../../components/divider/divider';
import { Icon } from '../../../../components/icon/icon';
import { Row } from '../../../../components/row/row';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Token } from '../../../../interfaces/token.interface';
import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';

import { TokenNavigationBarOption, tokenNavigationBar } from './constants';
import { styles } from './navigation-bar.styles';

interface Props {
  token: Token;
}

export const NavigationBar: FC<Props> = ({ token }) => {
  const { navigate } = useNavigation();

  const navigateToRoute = (screen: TokenNavigationBarOption['routeName'], disabled?: boolean) => {
    if (isDefined(disabled)) {
      return null;
    }

    if (screen === ScreensEnum.Send) {
      navigate(screen, { token });
    } else {
      navigate(screen);
    }
  };

  return (
    <Row style={styles.root}>
      {tokenNavigationBar.map(({ id, routeName, iconName, disabled }) => (
        <Fragment key={id}>
          <Pressable
            onPress={() => navigateToRoute(routeName, disabled)}
            style={[styles.button, isDefined(disabled) && styles.buttonDisabled]}
          >
            <Icon name={iconName} color={isDefined(disabled) ? colors.bgGrey5 : colors.orange} />
          </Pressable>
          {id < 4 && <Divider size={getCustomSize(2)} />}
        </Fragment>
      ))}
    </Row>
  );
};
