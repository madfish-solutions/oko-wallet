import React, { FC } from 'react';
import { View } from 'react-native';

import { Icon } from '../../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../../components/icon/icon-name.enum';
import { IconWithBorder } from '../../../../../../components/icon-with-border/icon-with-border';
import { Row } from '../../../../../../components/row/row';
import { Text } from '../../../../../../components/text/text';
import { useSelectedNetworkSelector } from '../../../../../../store/wallet/wallet.selectors';
import { styles } from '../../confirmation.styles';

export const SelectedNetwork: FC = () => {
  const { iconName, name } = useSelectedNetworkSelector();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Network</Text>
      <Row style={styles.networkContainer}>
        <IconWithBorder>
          <Icon name={iconName ?? IconNameEnum.NetworkFallback} />
        </IconWithBorder>
        <Text style={styles.networkName}>{name}</Text>
      </Row>
    </View>
  );
};
