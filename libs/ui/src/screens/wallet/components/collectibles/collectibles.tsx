import React, { FC } from 'react';

import { Button } from '../../../../components/button/button';
import { Column } from '../../../../components/column/column';
import { Divider } from '../../../../components/divider/divider';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { WidgetContainer } from '../../../../components/widget-container/widget-container';
import { useCollectiblesWidgetSelector } from '../../../../store/wallet/wallet.selectors';
import { isEmptyArray } from '../../../../utils/array.utils';
import { getTokenSlug } from '../../../../utils/token.utils';

import { styles } from './collectibles.styles';
import { CollectibleImages } from './components/collectible-image';

const EMPTY_NFT = 'Receive your first NFT';
const COLLECTIBLES = 'Collectibles';
const RECEIVE = 'RECEIVE';
const VIEW_ALL = 'VIEW ALL';

export const CollectiblesWidget: FC = () => {
  const collectibles = useCollectiblesWidgetSelector();

  return (
    <WidgetContainer title={COLLECTIBLES} iconName={IconNameEnum.Nft}>
      {isEmptyArray(collectibles) ? (
        <Button title={EMPTY_NFT} leftIcon={IconNameEnum.Receive} />
      ) : (
        <Row>
          <Row>
            {collectibles.map(collectible => (
              <CollectibleImages collectible={collectible} key={getTokenSlug(collectible)} />
            ))}
          </Row>
          <Column style={styles.buttons}>
            <Button title={RECEIVE} size="fluid" rightIcon={IconNameEnum.Receive} />
            <Divider />
            <Button title={VIEW_ALL} size="fluid" rightIcon={IconNameEnum.ArrowRight} />
          </Column>
        </Row>
      )}
    </WidgetContainer>
  );
};
