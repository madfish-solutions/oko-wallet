import { RouteProp, useRoute } from '@react-navigation/native';
import { isString } from 'lodash';
import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { CopyText } from '../../../../components/copy-text/copy-text';
import { InfoItem } from '../../../../components/info-item/info-item';
import { GAS_TOKEN_ADDRESS } from '../../../../constants/defaults';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useSelectedNetworkSelector } from '../../../../store/wallet/wallet.selectors';
import { getString } from '../../../../utils/get-string.utils';
import { getTokenDetailsUrl } from '../../../../utils/get-token-details-url.util';
import { removeTrailingSlash } from '../../../../utils/remove-trailing-slash.util';
import { eraseProtocol } from '../../../../utils/string.util';

import { styles } from './token-info.styles';

export const TokenInfo: FC = () => {
  const {
    params: {
      token: { tokenAddress, decimals }
    }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Token>>();
  const { explorerUrl, networkType } = useSelectedNetworkSelector();

  // TODO: get data from api
  const web = undefined;

  const tokenMetadata = {
    ...(tokenAddress !== GAS_TOKEN_ADDRESS && {
      contract: {
        name: 'Contract',
        value: <CopyText text={tokenAddress} />,
        prompt: getTokenDetailsUrl(tokenAddress, getString(explorerUrl), networkType)
      }
    }),
    web: {
      name: 'Web',
      value: isString(web) ? eraseProtocol(removeTrailingSlash(web)) : web,
      prompt: web
    },
    decimal: {
      name: 'Decimal',
      value: decimals.toString(),
      prompt: null
    }
  };

  return (
    <ScrollView style={styles.root}>
      {Object.values(tokenMetadata).map(({ name, value, prompt }) => (
        <InfoItem key={name} name={name} value={value} prompt={prompt} />
      ))}
    </ScrollView>
  );
};
