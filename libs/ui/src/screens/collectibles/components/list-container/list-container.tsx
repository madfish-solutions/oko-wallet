import { OnEventFn } from '@rnw-community/shared';
import React, { FC, PropsWithChildren } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { Column } from '../../../../components/column/column';
import { NavigationBar } from '../../../../components/navigation-bar/navigation-bar';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { SearchPanel } from '../../../../components/search-panel/search-panel';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Token } from '../../../../interfaces/token.interface';
import { ActivityFilterEnum } from '../../../../modals/screens/activity-filter-selector/activity-filter.enum';
import { ACTIVITIES_TYPES } from '../../../../modals/screens/activity-filter-selector/constants';
import { getTokenSlug } from '../../../../utils/token.utils';

import { styles } from './list-container.styles';

type Props = PropsWithChildren<{
  title?: string;
  collectibles: Token[];
  renderItem: ListRenderItem<Token>;
  setSearchValue: OnEventFn<string>;
}>;

const keyExtractor = ({ tokenAddress, tokenId }: Token) => getTokenSlug(tokenAddress, tokenId);

export const ListContainer: FC<Props> = ({ title, collectibles, setSearchValue, renderItem, children }) => {
  const { goBack, navigate } = useNavigation();

  const navigateToAddNewCollectible = () => navigate(ScreensEnum.AddNewCollectible);
  const navigateToActivity = () =>
    navigate(ScreensEnum.Activity, {
      filterType: ACTIVITIES_TYPES.find(item => item.value === ActivityFilterEnum.Collectibles) ?? ACTIVITIES_TYPES[0]
    });

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title={title} onBackButtonPress={goBack} />
        {children}
      </HeaderContainer>

      <Column style={styles.root}>
        <SearchPanel
          onPressAddIcon={navigateToAddNewCollectible}
          setSearchValue={setSearchValue}
          onPressActivityIcon={navigateToActivity}
          isEmptyList={!collectibles.length}
          style={styles.searchPanel}
        />

        <FlatList
          data={collectibles}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          style={styles.flatList}
        />
      </Column>

      <NavigationBar />
    </ScreenContainer>
  );
};
