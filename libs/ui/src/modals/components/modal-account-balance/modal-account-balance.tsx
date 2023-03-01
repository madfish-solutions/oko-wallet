import React, { FC } from 'react';

import { Text } from '../../../components/text/text';

import { styles } from './modal-account-balance.styles';
import { AccountBalanceEnum, themeClasses } from './themes';

interface Props {
  balance?: string;
  theme?: keyof typeof themeClasses;
}

export const ModalAccountBalance: FC<Props> = ({ balance, theme = AccountBalanceEnum.Small }) => (
  <>
    <Text style={[styles.text, styles.amount, themeClasses[theme]]}>{balance ?? '0.00'}</Text>
    <Text style={[styles.text, themeClasses[theme]]}>$</Text>
  </>
);
