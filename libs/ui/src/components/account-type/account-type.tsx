import React, { FC } from 'react';
import { AccountTypeEnum } from 'shared';

import { getCustomSize } from '../../styles/format-size';
import { getIconName } from '../../types/get-account-type.util';
import { Icon } from '../icon/icon';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './account-type.styles';

interface Props {
  type: AccountTypeEnum;
}

export const AccountType: FC<Props> = ({ type }) => (
  <Row style={styles.accountType}>
    <Icon name={getIconName(type)} size={getCustomSize(2)} iconStyle={styles.accountTypeIcon} />
    <Text style={styles.accountTypeName}>{type}</Text>
  </Row>
);
