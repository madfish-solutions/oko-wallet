import React, { FC } from 'react';

import { Divider } from '../../../../components/divider/divider';
import { ActionContainer } from '../../../../components/grey-container/components/action-container/action-container';
import { GreyContainer } from '../../../../components/grey-container/grey-container';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { Text } from '../../../../components/text/text';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useSelectedAccountSelector } from '../../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../../styles/format-size';
import { styles } from '../../settings.styles';

export const Account: FC = () => {
  const { goBack, navigate } = useNavigation();
  const account = useSelectedAccountSelector();

  const onEditAccount = () => navigate(ScreensEnum.EditAccount, { account });
  const navigateToRevealSeedPhrase = () => navigate(ScreensEnum.SettingsRevealSeedPhrase);
  const navigateToRevealPrivateKey = () => navigate(ScreensEnum.SettingsRevealPrivateKey);

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Account" onBackButtonPress={goBack} />
        <TouchableIcon name={IconNameEnum.Edit} onPress={onEditAccount} />
      </HeaderContainer>

      <ScreenScrollView>
        <GreyContainer>
          <ActionContainer>
            <Row>
              <Icon name={IconNameEnum.GridSettings} iconStyle={styles.icon} />
              <Text style={styles.text}>Home Widgets</Text>
            </Row>
            <Icon name={IconNameEnum.ChevronRight} />
          </ActionContainer>
        </GreyContainer>

        <Divider size={getCustomSize(2)} />

        <GreyContainer>
          <ActionContainer onPress={navigateToRevealPrivateKey}>
            <Row>
              <Icon iconStyle={styles.icon} name={IconNameEnum.See} />
              <Text style={styles.text}>Reveal Private Key</Text>
            </Row>
            <Icon name={IconNameEnum.ChevronRight} />
          </ActionContainer>
          <Divider size={getCustomSize(0.125)} style={styles.separator} />
          <ActionContainer onPress={navigateToRevealSeedPhrase}>
            <Row>
              <Icon iconStyle={styles.icon} name={IconNameEnum.See} />
              <Text style={styles.text}>Reveal Seed Phrase</Text>
            </Row>
            <Icon name={IconNameEnum.ChevronRight} />
          </ActionContainer>
        </GreyContainer>
      </ScreenScrollView>
    </ScreenContainer>
  );
};
