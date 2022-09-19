import { StyleSheet } from 'react-native';

import { maximiseViewStyles } from '../../components/navigator/utils/maximise-view-options';
import { colors } from '../../styles/colors';
import { EXTENSION_FULL_SIZE, getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { checkActiveApplicationSession } from '../../utils/check-active-application-session.util';
import { isWeb } from '../../utils/platform.utils';

const { isMaximiseScreenOpened } = checkActiveApplicationSession();

export const styles = StyleSheet.create({
  root: {
    height: isWeb ? EXTENSION_FULL_SIZE : '100%',
    backgroundColor: colors.navGrey1,
    paddingTop: getCustomSize(6),
    textAlign: 'center',
    width: '100%',
    ...(isMaximiseScreenOpened && maximiseViewStyles)
  },
  title: {
    ...typography.bodyInterSemiBold17
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: colors.textGrey2
  },
  button: {
    margin: 20
  }
});
