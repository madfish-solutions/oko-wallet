import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';

import { ButtonWithIcon } from '../../../../components/button-with-icon/button-with-icon';
import { ButtonWithIconSizeEnum, ButtonWithIconThemesEnum } from '../../../../components/button-with-icon/enums';
import { CollectibleImage } from '../../../../components/collectible-image/collectible-image';
import { Column } from '../../../../components/column/column';
import { Divider } from '../../../../components/divider/divider';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { WidgetContainer } from '../../../../components/widget-container/widget-container';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Token } from '../../../../interfaces/token.interface';
import { isEmptyArray } from '../../../../utils/array.utils';
import { getTokenSlug } from '../../../../utils/token.utils';
import { useGroupedCollectibles } from '../../../collectibles/hooks/use-grouped-collectibles.hook';

import { styles } from './collectibles.styles';

const EMPTY_NFT = 'Receive your first NFT';
const COLLECTIBLES = 'Collectibles';
const RECEIVE = 'RECEIVE';
const VIEW_ALL = 'VIEW ALL';

export const CollectiblesWidget: FC = () => {
  const { navigate } = useNavigation();
  const { collectiblesList, groupedCollectibles } = useGroupedCollectibles();

  const navigateToNftList = () => navigate(ScreensEnum.CollectiblesList);

  const handleItemPress = (nft: Token) => {
    if (isDefined(nft.collectionId) && isDefined(groupedCollectibles)) {
      return navigate(ScreensEnum.SpicificCollectiblesList, { collectibles: groupedCollectibles[nft.collectionId] });
    }

    return navigate(ScreensEnum.NFT, { nft });
  };

  return (
    <WidgetContainer title={COLLECTIBLES} iconName={IconNameEnum.Nft}>
      {isEmptyArray(collectiblesList) ? (
        <ButtonWithIcon
          title={EMPTY_NFT}
          size={ButtonWithIconSizeEnum.Medium}
          theme={ButtonWithIconThemesEnum.Tertiary}
          leftIcon={IconNameEnum.Receive}
        />
      ) : (
        <Row>
          <Row>
            {collectiblesList.slice(0, 2).map(collectible => (
              <React.Fragment key={getTokenSlug(collectible.tokenAddress, collectible.tokenId)}>
                <CollectibleImage
                  artifactUri={collectible.artifactUri}
                  onPress={() => handleItemPress(collectible)}
                  imageStyle={styles.image}
                />
                <Divider />
              </React.Fragment>
            ))}
          </Row>
          <Column style={styles.buttons}>
            <ButtonWithIcon
              title={RECEIVE}
              size={ButtonWithIconSizeEnum.Medium}
              theme={ButtonWithIconThemesEnum.Tertiary}
              rightIcon={IconNameEnum.Receive}
              style={styles.button}
            />
            <Divider />
            <ButtonWithIcon
              title={VIEW_ALL}
              onPress={navigateToNftList}
              size={ButtonWithIconSizeEnum.Medium}
              theme={ButtonWithIconThemesEnum.Tertiary}
              rightIcon={IconNameEnum.ArrowRight}
              style={styles.button}
            />
          </Column>
        </Row>
      )}
    </WidgetContainer>
  );
};
