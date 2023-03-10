import React, { FC } from 'react';
import { isMobile } from 'shared';

import { Text } from '../../../../../../components/text/text';
import { Item } from '../../../../components/item/item';
import { ItemContainer } from '../../../../components/item-container/item-container';

import { version, build } from './constants';
import { styles } from './version.styles';

export const Version: FC = () => (
  <ItemContainer>
    <Item title="Version" style={styles.root}>
      <Text style={styles.version}>
        {version} {isMobile && `(${build})`}
      </Text>
    </Item>
  </ItemContainer>
);
