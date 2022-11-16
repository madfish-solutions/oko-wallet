import React, { FC, useState } from 'react';
import { FlatList, Linking, Pressable, View } from 'react-native';

import { IconWithBorder } from '../../../../components/icon-with-border/icon-with-border';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
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
import { useDappsByAddressSelector } from '../../../../store/dapps/dapps.selectors';
import { eraseProtocol } from '../../../../utils/string.util';

import { styles } from './authorized-dapps.style';
import { Permission } from './components/permission';
import { MOCK_PERMISSIONS } from './constants';

export const AuthorizedDapps: FC = () => {
  const authorizedDapps = useDappsByAddressSelector();
  const { goBack, navigate } = useNavigation();
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  const dapps = Object.values(authorizedDapps).filter(dapp => dapp.name?.includes(searchValue));

  const dappNames = dapps.map(dapp => dapp.name);

  const navigateToConfirm = (dappName: string) => navigate(ScreensEnum.DeleteDapp, { dappName });

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.container}>
      <Row style={styles.topRow}>
        <Row>
          <IconWithBorder style={styles.icon}>
            <Icon name={IconNameEnum.IconPlaceholder} />
          </IconWithBorder>
          <Text style={styles.explorerLink} onPress={() => Linking.openURL(item)} numberOfLines={1}>
            {eraseProtocol(item)}
          </Text>
        </Row>
        <Pressable onPress={() => navigateToConfirm(item)}>
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
        <Text style={styles.amount}>{Object.keys(authorizedDapps).length}</Text>
      </HeaderContainer>
      <SearchPanel
        setSearchValue={setSearchValue}
        isEmptyList={!dapps.length}
        style={styles.root}
        emptyIconStyle={styles.emptyIcon}
      />

      <FlatList data={dappNames} renderItem={renderItem} keyExtractor={dapps => dapps} />
      {!dapps.length && !searchValue && (
        <View style={styles.exploreDapps}>
          <Text style={styles.exploreText} numberOfLines={1} onPress={() => null}>
            EXPLORE DAPPS
          </Text>
        </View>
      )}

      <NavigationBar />
    </ScreenContainer>
  );
};
