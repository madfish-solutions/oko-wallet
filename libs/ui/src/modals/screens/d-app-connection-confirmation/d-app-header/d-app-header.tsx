import React, { FC } from 'react';
import { Linking, View } from 'react-native';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Pressable } from '../../../../components/pressable/pressable';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { getCustomSize } from '../../../../styles/format-size';
import { handleCopyToClipboard } from '../../../../utils/copy-to-clipboard.util';
import { eraseProtocol } from '../../../../utils/string.util';
import { styles } from '../d-app-connection-confirmation.styles';
import { DAppImage } from '../d-app-image/d-app-image';

interface Props {
  favicon: string;
  origin: string;
}

export const DAppHeader: FC<Props> = ({ favicon, origin }) => {
  const copy = () => handleCopyToClipboard(origin);

  return (
    <>
      <Row style={styles.container}>
        <DAppImage imageUri={favicon} />
        <Icon name={IconNameEnum.SwapItems} size={getCustomSize(9)} />
        <DAppImage />
      </Row>
      <Row style={styles.addressRow}>
        <Text style={styles.smallText}>Address</Text>
        <Row>
          <Text style={styles.explorerLink} onPress={() => Linking.openURL(origin)} numberOfLines={1}>
            {eraseProtocol(origin)}
          </Text>
          <Pressable onPress={copy}>
            <Icon name={IconNameEnum.Copy} />
          </Pressable>
        </Row>
      </Row>
      <View style={styles.divider} />
    </>
  );
};
