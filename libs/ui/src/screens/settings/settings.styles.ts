import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 0
  },
  rootContentContainer: {
    flexGrow: 1
  },
  easterEgg: {
    position: 'absolute',
    top: -getCustomSize(23)
  },
  content: {
    flex: 1,
    padding: getCustomSize(2),
    justifyContent: 'space-between'
  },
  robot: {
    marginRight: getCustomSize(),
    borderRadius: getCustomSize(1.03125)
  },
  socialMedia: {
    paddingVertical: getCustomSize(),
    paddingHorizontal: getCustomSize(1.5),
    justifyContent: 'space-between'
  },
  socialMediaBlock: {
    backgroundColor: colors.bgGrey4,
    flex: 1,
    alignItems: 'center',
    borderRadius: getCustomSize(0.75)
  },
  telegramBlock: {
    marginRight: getCustomSize(1.5)
  },
  telegram: {
    ...typography.bodyInterSemiBold15,
    marginRight: getCustomSize(0.75)
  },
  twitter: {
    ...typography.bodyInterSemiBold15,
    marginRight: getCustomSize()
  },
  resetContainer: {
    alignItems: 'center',
    marginTop: getCustomSize(3.25)
  },
  resetText: {
    ...typography.taglineInterSemiBoldUppercase13,
    color: colors.orange
  },
  outIcon: {
    marginLeft: getCustomSize(0.5)
  },
  logo: {
    marginTop: getCustomSize(5.25)
  },
  itemWithSwitch: {
    paddingRight: getCustomSize(1.75)
  },
  itemWithDropDown: {
    paddingVertical: getCustomSize(0.75),
    paddingRight: getCustomSize(0.75)
  }
});
