import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, View } from 'react-native';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { TestIDProps } from '../../../../interfaces/test-id.props';

import { styles } from './warning-message-dropdown.styles';

interface Props extends TestIDProps {
  checkIsOpenDropdownState?: (arg: boolean) => void;
  style?: ViewStyleProps;
}

export const WarningMessageDropdown: FC<Props> = ({ checkIsOpenDropdownState, style, testID }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;

  const toggleContent = () => {
    Animated.timing(animationController, {
      duration: 300,
      toValue: isOpenDropdown ? 0 : 1,
      useNativeDriver: false
    }).start();
    setIsOpenDropdown(!isOpenDropdown);
  };

  useEffect(() => {
    checkIsOpenDropdownState?.(isOpenDropdown);
  }, [isOpenDropdown]);

  const arrowAnimation = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <Pressable onPress={toggleContent} testID={testID}>
      <Animated.View style={[styles.root, style]}>
        <Row style={styles.header}>
          <Row>
            <Icon name={IconNameEnum.WarningYellow} iconStyle={styles.warningIcon} />
            <Text style={styles.warningTitle}>Backup your mnemonic securely!</Text>
          </Row>
          <Animated.View style={{ transform: [{ rotateZ: arrowAnimation }] }}>
            <Icon name={IconNameEnum.Chevron} />
          </Animated.View>
        </Row>

        {isOpenDropdown && (
          <View style={styles.content}>
            <Text style={styles.warningMessage}>
              It is very important to save your seed phrase. This registration step is the only place where you can see
              your seed phrase. If you do not save your seed phrase, it will be impossible to restore it. Also, without
              your seed phrase, you will not be able to restore access to your account, if necessary.
            </Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};
