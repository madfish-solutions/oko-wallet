import { isDefined } from '@rnw-community/shared';
import React, { FC, Fragment } from 'react';
import { Pressable } from 'react-native';

import { Divider } from '../../../../components/divider/divider';
import { Icon } from '../../../../components/icon/icon';
import { Row } from '../../../../components/row/row';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useToast } from '../../../../hooks/use-toast.hook';
import { Token } from '../../../../interfaces/token.interface';
import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';

import { TokenNavigationBarOption, useTokenNavigationBar } from './hooks/use-token-navigation-bar.hook';
import { styles } from './navigation-bar.styles';

interface Props {
  token: Token;
}

export const NavigationBar: FC<Props> = ({ token }) => {
  const { navigate } = useNavigation();
  const tokenNavigationBar = useTokenNavigationBar();
  const { showInfoToast } = useToast();

  const navigateToRoute = (
    screen: TokenNavigationBarOption['routeName'],
    disabled?: boolean,
    disabledMessage?: string
  ) => {
    if (disabled === true) {
      if (isDefined(disabledMessage)) {
        showInfoToast({
          message: 'Oops!',
          data: {
            description: disabledMessage
          }
        });
      }

      return;
    }

    if (screen === ScreensEnum.SendToken) {
      navigate(screen, { token });
    } else if (screen === ScreensEnum.Swap) {
      navigate(screen, { fromToken: token });
    } else {
      navigate(screen);
    }
  };

  return (
    <Row style={styles.root}>
      {tokenNavigationBar.map(({ id, routeName, iconName, disabled, disabledMessage }) => (
        <Fragment key={id}>
          <Pressable
            onPress={() => navigateToRoute(routeName, disabled, disabledMessage)}
            style={[styles.button, disabled === true && styles.buttonDisabled]}
          >
            <Icon name={iconName} color={disabled === true ? colors.bgGrey5 : colors.orange} />
          </Pressable>
          {id < 4 && <Divider size={getCustomSize(2)} />}
        </Fragment>
      ))}
    </Row>
  );
};
