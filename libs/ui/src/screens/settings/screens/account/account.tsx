import React, { FC } from 'react';

import { Divider } from '../../../../components/divider/divider';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { NavigationBar } from '../../../../components/navigation-bar/navigation-bar';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useSelectedAccountSelector } from '../../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../../styles/format-size';
import { ItemContainer } from '../../components/item-container/item-container';
import { Item } from '../../components/item/item';
import { styles } from '../../settings.styles';

export const Account: FC = () => {
  const { goBack, navigate } = useNavigation();
  const account = useSelectedAccountSelector();

  const onEditAccount = () => navigate(ScreensEnum.EditAccount, { account });
  const navigateToRevealSeedPhrase = () => navigate(ScreensEnum.RevealSeedPhrase);
  const navigateToRevealPrivateKey = () => navigate(ScreensEnum.RevealPrivateKey);

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Account" onBackButtonPress={goBack} />
        <TouchableIcon name={IconNameEnum.Edit} onPress={onEditAccount} />
      </HeaderContainer>

      <ScreenScrollView>
        <ItemContainer>
          <Item title="Home Widgets" icon={IconNameEnum.GridSettings} />
        </ItemContainer>

        <Divider size={getCustomSize(2)} />

        <ItemContainer>
          <Item title="Reveal Private Key" icon={IconNameEnum.See} onPress={navigateToRevealPrivateKey} />
          <Divider size={getCustomSize(0.125)} style={styles.separator} />
          <Item title="Reveal Seed Phrase" icon={IconNameEnum.See} onPress={navigateToRevealSeedPhrase} />
        </ItemContainer>
      </ScreenScrollView>

      <NavigationBar />
    </ScreenContainer>
  );
};
