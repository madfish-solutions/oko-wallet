import React, { FC, useMemo } from 'react';

import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Column } from '../../../column/column';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Text } from '../../../text/text';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './title.styles';

interface Props {
  title: string;
}

const rootRoutes: string[] = [ScreensEnum.Receive, ScreensEnum.Send, ScreensEnum.Settings];

export const Title: FC<Props> = ({ title }) => {
  const { navigate, goBack } = useNavigation();

  const isRootRoute = useMemo(() => rootRoutes.includes(title), [title]);

  const onBackButtonPress = () => (isRootRoute ? navigate(ScreensEnum.Wallet) : goBack());

  return (
    <Column>
      <TouchableIcon name={IconNameEnum.ArrowLeft} onPress={onBackButtonPress} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </Column>
  );
};
