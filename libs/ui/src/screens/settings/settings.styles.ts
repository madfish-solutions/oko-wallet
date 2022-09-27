import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    padding: 0
  },
  easterEgg: {
    position: 'absolute',
    top: -getCustomSize(22)
  },
  content: {
    padding: getCustomSize(2)
  },
  robot: {
    marginRight: getCustomSize()
  },
  text: {
    ...typography.bodyInterSemiBold15
  },
  icon: { marginRight: getCustomSize(0.5) },
  separator: {
    backgroundColor: colors.bgGrey3,
    width: '100%',
    marginLeft: getCustomSize(2)
  },
  socialMedia: {
    paddingVertical: getCustomSize(),
    paddingLeft: getCustomSize(3.5),
    paddingRight: getCustomSize(3.375),
    justifyContent: 'space-between'
  },
  resetContainer: {
    alignItems: 'center',
    marginTop: getCustomSize(3.25)
  },
  resetActionContainer: {
    height: 'auto',
    padding: 0
  },
  resetText: {
    ...typography.taglineInterSemiBoldUppercase13,
    color: colors.orange
  },
  outIcon: {
    marginLeft: getCustomSize(0.5)
  },
  madLogo: {
    marginTop: getCustomSize(5.25),
    alignItems: 'center'
  }
});
