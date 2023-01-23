import React, { FC, useState } from 'react';
import { FlatList, Linking, ListRenderItem, Pressable, View } from 'react-native';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { IconWithBorder } from '../../../../components/icon-with-border/icon-with-border';
import { NavigationBar } from '../../../../components/navigation-bar/navigation-bar';
import { Row } from '../../../../components/row/row';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { SearchPanel } from '../../../../components/search-panel/search-panel';
import { Text } from '../../../../components/text/text';
import { EMPTY_STRING } from '../../../../constants/defaults';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useSelectedAccountDAppsListSelector } from '../../../../store/d-apps/d-apps.selectors';
import { DAppState } from '../../../../store/d-apps/d-apps.state';
import { eraseProtocol } from '../../../../utils/string.util';

import { styles } from './authorized-d-apps.style';
import { MOCK_PERMISSIONS } from './constants';
import { Permission } from './permission/permission';

export const AuthorizedDApps: FC = () => {
  const selectedAccountDAppsList = useSelectedAccountDAppsListSelector();
  const { goBack, navigate } = useNavigation();
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  const filteredDAppsList = selectedAccountDAppsList.filter(dApp => dApp.name.includes(searchValue));

  const navigateToConfirm = (origin: string) => navigate(ScreensEnum.DeleteDApp, { origin });

  const renderItem: ListRenderItem<DAppState> = ({ item }) => (
    <View style={styles.container}>
      <Row style={styles.topRow}>
        <Row>
          <IconWithBorder style={styles.icon}>
            <Icon name={IconNameEnum.IconPlaceholder} />
          </IconWithBorder>
          <Text style={styles.explorerLink} onPress={() => Linking.openURL(item.origin)} numberOfLines={1}>
            {eraseProtocol(item.origin)}
          </Text>
        </Row>
        <Pressable onPress={() => navigateToConfirm(item.origin)}>
          <Icon name={IconNameEnum.Delete} iconStyle={styles.deleteIcon} />
        </Pressable>
      </Row>
      <Row style={styles.permissions}>
        {MOCK_PERMISSIONS.map(({ id, iconName, text }) => (
          <Permission iconName={iconName} text={text} key={id} />
        ))}
      </Row>
    </View>
  );

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Authorized DApps" onBackButtonPress={goBack} />
        <Text style={styles.amount}>{Object.keys(selectedAccountDAppsList).length}</Text>
      </HeaderContainer>
      <SearchPanel
        setSearchValue={setSearchValue}
        isEmptyList={!filteredDAppsList.length}
        style={styles.root}
        emptyIconStyle={styles.emptyIcon}
      />

      <FlatList data={filteredDAppsList} renderItem={renderItem} keyExtractor={dApp => dApp.origin} />

      <NavigationBar />
    </ScreenContainer>
  );
};
