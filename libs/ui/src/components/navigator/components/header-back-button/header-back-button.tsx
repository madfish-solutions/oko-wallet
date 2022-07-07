import React, { FC } from 'react';

import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './header-back-button.styles';

export const HeaderBackButton: FC = () => {
  const { goBack } = useNavigation();

  return <TouchableIcon style={styles.root} onPress={goBack} name={IconNameEnum.ArrowLeft} />;
};
