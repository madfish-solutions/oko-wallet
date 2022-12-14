import { OnEventFn } from '@rnw-community/shared';
import React, { FC, BaseSyntheticEvent } from 'react';
import { View } from 'react-native';

import { Button } from '../../../../components/button/button';
import { ButtonThemesEnum } from '../../../../components/button/enums';

import { styles } from './send-button.styles';

interface Props {
  isDisabled: boolean;
  onPress: OnEventFn<BaseSyntheticEvent | undefined, Promise<void>>;
}

export const SendButton: FC<Props> = ({ isDisabled, onPress }) => (
  <View style={styles.root}>
    <Button title="Send" onPress={onPress} disabled={isDisabled} theme={ButtonThemesEnum.Secondary} />
  </View>
);
