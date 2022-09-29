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
    top: -getCustomSize(24)
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
  resetText: {
    ...typography.taglineInterSemiBoldUppercase13,
    color: colors.orange
  },
  outIcon: {
    marginLeft: getCustomSize(0.5)
  },
  logo: {
    marginTop: getCustomSize(5.25),
    alignItems: 'center'
  }
});
