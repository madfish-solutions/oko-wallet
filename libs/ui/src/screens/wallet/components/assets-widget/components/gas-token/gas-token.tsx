import React, { FC, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../../components/icon/icon-name.enum';
import { Row } from '../../../../../../components/row/row';
import { loadGasTokenBalanceAction } from '../../../../../../store/wallet/wallet.actions';
import {
  useSelectedAccountPkhSelector,
  useSelectedNetworkSelector
} from '../../../../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../../../../styles/format-size';
import { formatUnits } from '../../../../../../utils/units.utils';
import { styles } from '../../assets-widget.styles';
import { getImagePath } from '../../utils/get-image-path.util';

export const GasToken: FC = () => {
  const {
    gasTokenMetadata: { decimals, symbol, thumbnailUri },
    gasTokenBalance: { data: balance }
  } = useSelectedNetworkSelector();
  const selectedNetwork = useSelectedNetworkSelector();
  const pkh = useSelectedAccountPkhSelector();
  const dispatch = useDispatch();

  const imagePath = getImagePath(thumbnailUri);
  const formattedBalance = formatUnits(balance, decimals);

  useEffect(() => {
    dispatch(loadGasTokenBalanceAction.submit());
  }, [selectedNetwork.rpcUrl, pkh]);

  return (
    <Row style={styles.tokenInfoContainer}>
      <Row style={styles.token}>
        <Image style={styles.tokenImage} source={imagePath} />
        <Text style={styles.text}>{symbol}</Text>
        <Icon name={IconNameEnum.Gas} size={getCustomSize(1.8)} iconStyle={styles.gasToken} />
      </Row>

      <View style={styles.balanceContainer}>
        <Text style={styles.text}>{formattedBalance}</Text>
        <Text style={[styles.text, styles.usdBalance]}>1000 $</Text>
      </View>
    </Row>
  );
};
