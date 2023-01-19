import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Divider } from '../../../../components/divider/divider';
import { DropdownSelectedItem } from '../../../../components/dropdown/components/dropdown-selected-item/dropdown-selected-item';
import { NavigationBar } from '../../../../components/navigation-bar/navigation-bar';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { Switch } from '../../../../components/switch/switch';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { setIsAnalyticsEnabled } from '../../../../store/settings/settings.actions';
import { useAnalyticsEnabledSelector } from '../../../../store/settings/settings.selectors';
import { getCustomSize } from '../../../../styles/format-size';
import { Item } from '../../components/item/item';
import { ItemContainer } from '../../components/item-container/item-container';
import { styles } from '../../settings.styles';

export const General: FC = () => {
  const isAnalyticsEnabled = useAnalyticsEnabledSelector();
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();

  const handleAnalyticsChange = () => dispatch(setIsAnalyticsEnabled(!isAnalyticsEnabled));
  const navigateToCurrencySelector = () => navigate(ScreensEnum.SettingsCurrencySelector);
  const navigateToAppearanceSelector = () => navigate(ScreensEnum.SettingsAppearanceSelector);

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="General" onBackButtonPress={goBack} />
      </HeaderContainer>

      <ScreenScrollView>
        <ItemContainer>
          <Item title="Anonymous Analytics" onPress={handleAnalyticsChange} style={styles.itemWithSwitch}>
            <Switch isActive={isAnalyticsEnabled} onPress={handleAnalyticsChange} triggerAnimation />
          </Item>
        </ItemContainer>

        <Divider size={getCustomSize(2)} />

        <ItemContainer>
          <Item title="Currency" onPress={navigateToCurrencySelector} style={styles.itemWithDropDown}>
            <DropdownSelectedItem title="USD" onPress={navigateToCurrencySelector} />
          </Item>
        </ItemContainer>

        <Divider size={getCustomSize(2)} />

        <ItemContainer>
          <Item title="Appearance" onPress={navigateToAppearanceSelector} style={styles.itemWithDropDown}>
            <DropdownSelectedItem title="Dark" onPress={navigateToAppearanceSelector} />
          </Item>
        </ItemContainer>
      </ScreenScrollView>

      <NavigationBar />
    </ScreenContainer>
  );
};
