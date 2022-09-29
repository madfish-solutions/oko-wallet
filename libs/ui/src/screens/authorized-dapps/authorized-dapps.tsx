import React, { FC, useState } from 'react';
import { FlatList, Linking, Pressable, View } from 'react-native';

import { IconWithBorder } from '../../components/icon-with-border/icon-with-border';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Row } from '../../components/row/row';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { SearchPanel } from '../../components/search-panel/search-panel';
import { Text } from '../../components/text/text';
import { EMPTY_STRING } from '../../constants/defaults';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useAuthorizedDapps } from '../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../styles/format-size';
import { eraseProtocol } from '../../utils/string.util';

import { styles } from './authorized-dapps.style';
import { Permission } from './components/permission';
import { MOCK_PERMISSIONS } from './constants';

export const AuthorizedDapps: FC = () => {
  const authorizedDapps = useAuthorizedDapps();
  const { goBack, navigate } = useNavigation();
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  const dapps = Object.keys(authorizedDapps).filter(dapp => dapp.includes(searchValue));

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
        <ScreenTitle title="Authorized Dapps" onBackButtonPress={goBack} />
        <Text style={styles.amount}>{dapps.length}</Text>
      </HeaderContainer>
      <SearchPanel
        setSearchValue={setSearchValue}
        isEmptyList={!dapps.length}
        style={styles.root}
        emptyIconSize={getCustomSize(27)}
      />
      <View style={[styles.root, styles.flatlist]}>
        <FlatList data={dapps} renderItem={renderItem} keyExtractor={dapps => dapps} />
        {!dapps.length && (
          <View style={styles.exploreDapps}>
            <Text style={styles.exploreText} numberOfLines={1} onPress={() => null}>
              EXPLORE DAPPS
            </Text>
          </View>
        )}
      </View>
      <NavigationBar />
    </ScreenContainer>
  );
};
