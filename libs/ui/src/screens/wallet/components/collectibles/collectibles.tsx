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
import { TestIDProps } from '../../../../interfaces/test-id.props';
import { Token } from '../../../../interfaces/token.interface';
import { isEmptyArray } from '../../../../utils/array.utils';
import { getTokenSlug } from '../../../../utils/token.utils';
import { useGroupedCollectibles } from '../../../collectibles/hooks/use-grouped-collectibles.hook';

import { styles } from './collectibles.styles';

const RECEIVE_COLLECTIBLE = 'Receive';
const ADD_COLLECTIBLE = 'Add';
const COLLECTIBLES = 'Collectibles';
const RECEIVE = 'RECEIVE';
const VIEW_ALL = 'VIEW ALL';

export const CollectiblesWidget: FC<TestIDProps> = ({ testID }) => {
  const { navigate } = useNavigation();
  const { collectionList } = useGroupedCollectibles();

  const navigateToNftList = () => navigate(ScreensEnum.CollectiblesList);
  const navigateToReceive = () => navigate(ScreensEnum.Receive);
  const navigateToAddNewCollectible = () => navigate(ScreensEnum.AddNewCollectible);

  const handleItemPress = (collectible: Token) => navigate(ScreensEnum.Collectible, { collectible });

  return (
    <WidgetContainer title={COLLECTIBLES} iconName={IconNameEnum.Nft} testID={testID}>
      {isEmptyArray(collectionList) ? (
        <Row>
          <ButtonWithIcon
            title={RECEIVE_COLLECTIBLE}
            onPress={navigateToReceive}
            size={ButtonWithIconSizeEnum.Medium}
            theme={ButtonWithIconThemesEnum.Tertiary}
            leftIcon={IconNameEnum.ReceiveSmall}
            style={styles.button}
          />
          <Divider />
          <ButtonWithIcon
            title={ADD_COLLECTIBLE}
            onPress={navigateToAddNewCollectible}
            size={ButtonWithIconSizeEnum.Medium}
            theme={ButtonWithIconThemesEnum.Tertiary}
            leftIcon={IconNameEnum.AddSmall}
            style={styles.button}
          />
        </Row>
      ) : (
        <Row>
          <Row>
            {collectionList.slice(0, 2).map(collectible => (
              <React.Fragment key={getTokenSlug(collectible.tokenAddress, collectible.tokenId)}>
                <CollectibleImage
                  artifactUri={collectible.artifactUri}
                  onPress={() => handleItemPress(collectible)}
                  containerStyle={styles.imageContainer}
                />
                <Divider />
              </React.Fragment>
            ))}
          </Row>
          <Column style={styles.buttons}>
            <ButtonWithIcon
              title={RECEIVE}
              onPress={navigateToReceive}
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
