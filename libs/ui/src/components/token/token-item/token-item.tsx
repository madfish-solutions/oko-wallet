import { isDefined } from '@rnw-community/shared';
import React, { FC, PropsWithChildren } from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';
import { Icon } from '../../icon/icon';
import { IconNameEnum } from '../../icon/icon-name.enum';
import { Row } from '../../row/row';
import { Text } from '../../text/text';
import { TokenAmount } from '../../token-amount/token-amount';

import { themeClasses } from './constants';
import { TokenItemThemesEnum } from './enums';
import { styles } from './token-item.styles';

type Props = PropsWithChildren<{
  symbol: string;
  imageSource: ImageSourcePropType;
  balance: string;
  name: string;
  valueInDollar: string;
  isGasToken?: boolean;
  theme?: TokenItemThemesEnum;
}>;

export const TokenItem: FC<Props> = ({
  imageSource,
  symbol,
  balance,
  isGasToken = false,
  name,
  valueInDollar,
  children,
  theme = TokenItemThemesEnum.Primary
}) => (
  <Row style={[styles.root, themeClasses[theme].root]}>
    <Row style={styles.token}>
      <Image style={[styles.image, themeClasses[theme].image]} source={imageSource} />
      <View style={styles.token}>
        <Row style={styles.token}>
          <Text style={[styles.text, themeClasses[theme].text]} numberOfLines={1}>
            {symbol}
          </Text>
          {isGasToken && <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />}
        </Row>
        {theme === TokenItemThemesEnum.Secondary && (
          <Text style={styles.tokenName} numberOfLines={1}>
            {name}
          </Text>
        )}
      </View>
    </Row>

    <View style={styles.rightSideContainer}>
      {isDefined(children) ? (
        children
      ) : (
        <View style={styles.text}>
          <TokenAmount value={balance} style={themeClasses[theme].text} />
          <Text style={styles.valueInDollar}>
            {valueInDollar} <Text style={styles.usdSymbol}>$</Text>
          </Text>
        </View>
      )}
    </View>
  </Row>
);
