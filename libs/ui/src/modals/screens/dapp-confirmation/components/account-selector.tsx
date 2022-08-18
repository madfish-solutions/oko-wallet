import React, { FC } from 'react';
import { Column } from 'src/components/column/column';
import { Text } from 'src/components/text/text';

interface Props {
  accounts: any;
  balance: any;
}

export const AccountSelector: FC<Props> = () => {
  const a = 1;

  return (
    <Column>
      <Text>{a}</Text>
    </Column>
  );
};
