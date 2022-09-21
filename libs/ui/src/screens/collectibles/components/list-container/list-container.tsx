import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { Column } from '../../../../components/column/column';
import { NavigationBar } from '../../../../components/navigation-bar/navigation-bar';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { SearchPanel } from '../../../../components/search-panel/search-panel';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Token } from '../../../../interfaces/token.interface';
import { getTokenSlug } from '../../../../utils/token.utils';

import { styles } from './list-container.styles';

interface Props {
  title?: string;
  collectibles: Token[];
  renderItem: ListRenderItem<Token>;
  setSearchValue: OnEventFn<string>;
}

const keyExtractor = ({ tokenAddress, tokenId }: Token) => getTokenSlug(tokenAddress, tokenId);

export const ListContainer: FC<Props> = ({ title, collectibles, setSearchValue, renderItem, children }) => {
  const { goBack } = useNavigation();

  const navigateToAddNewNft = () => null;

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title={title} onBackButtonPress={goBack} />
        {children}
      </HeaderContainer>

      <Column style={styles.root}>
        <SearchPanel
          onPressAddIcon={navigateToAddNewNft}
          setSearchValue={setSearchValue}
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
