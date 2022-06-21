import React, { FC } from 'react';
import { Image, Text, View, ImageSourcePropType } from 'react-native';

import { Icon } from '../../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../../components/icon/icon-name.enum';
import { Row } from '../../../../../../components/row/row';
import { getCustomSize } from '../../../../../../styles/format-size';

import { styles } from './token.styles';

interface Props {
  symbol: string;
  imageSource: ImageSourcePropType;
  balance: string;
  isGasToken?: boolean;
}

export const Token: FC<Props> = ({ imageSource, symbol, balance, isGasToken = false }) => (
  <Row style={styles.tokenInfoContainer}>
    <Row style={styles.token}>
      {/*TODO Change to reusable component, when header be merged*/}
      <Image style={styles.tokenImage} source={imageSource} />
      <Text style={styles.text}>{symbol}</Text>
      {isGasToken && <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />}
    </Row>

    <View style={styles.balanceContainer}>
      <Text style={styles.text}>{balance}</Text>
      <Text style={styles.usdBalance}>
        1000 <Text style={styles.usdSymbol}>$</Text>
      </Text>
    </View>
  </Row>
);
