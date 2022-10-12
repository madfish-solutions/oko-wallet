import { StyleSheet } from 'react-native';

import { colors } from '../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../styles/format-size';
import { typography } from '../../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: getCustomSize(2),
    position: 'relative'
  },
  button: {
    maxHeight: getCustomSize(4),
    marginTop: getCustomSize(2),
    marginBottom: getCustomSize(2)
  },
  buttonText: {
    ...typography.taglineInterSemiBoldUppercase13
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  notGeneratedContainer: {
    backgroundColor: colors.bgGrey2,
    paddingHorizontal: getCustomSize(),
    paddingVertical: getCustomSize(0.25),
    borderRadius: getCustomSize(0.5)
  },
  notGeneratedText: {
    color: colors.textGrey3,
    ...typography.numbersIBMPlexSansMediumUppercase13
  },
  item: {
    paddingTop: getCustomSize(),
    paddingBottom: getCustomSize(3),
    borderColor: colors.border2,
    borderTopWidth: getCustomSize(0.0625),
    borderBottomWidth: getCustomSize(0.0625)
  },
  upperContainer: {
    marginBottom: getCustomSize(2.5)
  },
  nameContainer: {
    maxWidth: getCustomSize(10),
    flexGrow: 1,
    flexShrink: 1
  },
  robotIconWithBorder: {
    borderRadius: getCustomSize(1.375),
    marginRight: getCustomSize(0.5)
  },
  text: {
    ...typography.bodyInterSemiBold15
  },
  editIcon: {
    marginRight: getCustomSize(2)
  },
  buttonPrivateKey: {
    flex: 0,
    width: 'auto',
    height: 'auto'
  },
  emptyIcon: {
    top: -65
  }
});
