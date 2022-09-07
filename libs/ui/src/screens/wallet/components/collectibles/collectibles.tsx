import React, { FC } from 'react';

import { ButtonWithIcon } from '../../../../components/button-with-icon/button-with-icon';
import { ButtonWithIconSizeEnum, ButtonWithIconThemesEnum } from '../../../../components/button-with-icon/enums';
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
        <ButtonWithIcon
          title={EMPTY_NFT}
          size={ButtonWithIconSizeEnum.Medium}
          theme={ButtonWithIconThemesEnum.Tertiary}
          leftIcon={IconNameEnum.Receive}
        />
      ) : (
        <Row>
          <Row>
            {collectibles.map(collectible => (
              <CollectibleImages
                collectible={collectible}
                key={getTokenSlug(collectible.tokenAddress, collectible.tokenId)}
              />
            ))}
          </Row>
          <Column style={styles.buttons}>
            <ButtonWithIcon
              title={RECEIVE}
              size={ButtonWithIconSizeEnum.Medium}
              theme={ButtonWithIconThemesEnum.Tertiary}
              rightIcon={IconNameEnum.Receive}
            />
            <Divider />
            <ButtonWithIcon
              title={VIEW_ALL}
              size={ButtonWithIconSizeEnum.Medium}
              theme={ButtonWithIconThemesEnum.Tertiary}
              rightIcon={IconNameEnum.ArrowRight}
            />
          </Column>
        </Row>
      )}
    </WidgetContainer>
  );
};
