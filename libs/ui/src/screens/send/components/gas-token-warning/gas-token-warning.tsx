import React, { FC } from 'react';

import { Announcement } from '../../../../components/announcement/announcement';
import { useGasTokenSelector } from '../../../../store/wallet/wallet.selectors';

import { styles } from './gas-token-warning.styles';

export const GasTokenWarning: FC = () => {
  const { symbol } = useGasTokenSelector();

  return <Announcement text={`Needed gas token: ${symbol}`} style={styles.root} />;
};
