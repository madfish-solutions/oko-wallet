import React, { FC } from 'react';
import { Pressable } from 'react-native';

import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Icon } from '../../../icon/icon';
import { IconNameEnum } from '../../../icon/icon-name.enum';

import { styles } from './header-close-button.styles';

export const HeaderCloseButton: FC = () => {
  const { goBack } = useNavigation();

  return (
    <Pressable onPress={goBack} style={styles.root}>
      <Icon name={IconNameEnum.X} />
    </Pressable>
  );
};
