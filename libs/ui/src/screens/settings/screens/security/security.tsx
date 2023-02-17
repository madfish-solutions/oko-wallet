import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { isMobile } from 'shared';

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
import { setIsBiometricEnabled } from '../../../../store/settings/settings.actions';
import { useBiometricEnabledSelector, useLockTimePeriodSelector } from '../../../../store/settings/settings.selectors';
import { getCustomSize } from '../../../../styles/format-size';
import { Item } from '../../components/item/item';
import { ItemContainer } from '../../components/item-container/item-container';
import { styles } from '../../settings.styles';

export const Security: FC = () => {
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();
  const isBiometricEnabled = useBiometricEnabledSelector();
  const lockTimePeriod = useLockTimePeriodSelector();

  const navigateToLockTimeSelector = () => navigate(ScreensEnum.SettingsLockTimeSelector);
  const navigateToChangePassword = () => navigate(ScreensEnum.ChangePassword);
  const handleBiometricChange = () => dispatch(setIsBiometricEnabled(!isBiometricEnabled));

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Security" onBackButtonPress={goBack} />
      </HeaderContainer>

      <ScreenScrollView>
        <ItemContainer>
          <Item title="Lock time(m)" onPress={navigateToLockTimeSelector} style={styles.itemWithDropDown}>
            <DropdownSelectedItem title={lockTimePeriod.toString()} onPress={navigateToLockTimeSelector} />
          </Item>
        </ItemContainer>

        <Divider size={getCustomSize(2)} />

        <ItemContainer>
          <Item title="Change Password" onPress={navigateToChangePassword} />
        </ItemContainer>

        {isMobile && (
          <>
            <Divider size={getCustomSize(2)} />

            <ItemContainer>
              <Item title="Biometric ID" onPress={handleBiometricChange} style={styles.itemWithSwitch}>
                <Switch isActive={isBiometricEnabled} onPress={handleBiometricChange} triggerAnimation />
              </Item>
            </ItemContainer>
          </>
        )}
      </ScreenScrollView>

      <NavigationBar />
    </ScreenContainer>
  );
};
