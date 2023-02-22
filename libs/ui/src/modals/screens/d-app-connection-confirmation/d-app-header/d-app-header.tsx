import React, { FC } from 'react';
import { Linking, View } from 'react-native';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Pressable } from '../../../../components/pressable/pressable';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { getCustomSize } from '../../../../styles/format-size';
import { eraseProtocol } from '../../../../utils/string.util';
import { styles } from '../d-app-connection-confirmation.styles';
import { DAppImage } from '../d-app-image/d-app-image';

interface Props {
  favicon: string;
  origin: string;
}

export const DAppHeader: FC<Props> = ({ favicon, origin }) => (
  <>
    <Row style={styles.container}>
      <Icon name={IconNameEnum.WalletLogoPlaceholder} size={getCustomSize(8)} />
      <Icon name={IconNameEnum.SwapItems} size={getCustomSize(8)} />
      <DAppImage imageUri={favicon} />
    </Row>
    <Row style={styles.addressRow}>
      <Text style={styles.smallText}>DAPP</Text>
      <Row>
        <Text style={styles.explorerLink} onPress={() => Linking.openURL(origin)} numberOfLines={1}>
          {eraseProtocol(origin)}
        </Text>
        <Pressable onPress={() => Linking.openURL(origin)}>
          <Icon name={IconNameEnum.Tooltip} />
        </Pressable>
      </Row>
    </Row>
    <View style={styles.divider} />
  </>
);
