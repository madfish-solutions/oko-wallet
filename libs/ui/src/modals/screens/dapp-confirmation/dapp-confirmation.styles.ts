import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    marginHorizontal: getCustomSize(2),
    alignItems: 'stretch',
    height: '100%'
  },
  container: {
    marginHorizontal: getCustomSize(2),
    paddingHorizontal: getCustomSize(8),
    paddingVertical: getCustomSize(1.5)
  },
  imageContainer: {
    height: getCustomSize(8),
    width: getCustomSize(8),
    borderColor: colors.border2,
    borderWidth: getCustomSize(0.25),
    borderRadius: getCustomSize(2),
    alignItems: 'center',
    justifyContent: 'center'
  },
  addressRow: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize(1.5)
  },
  smallText: {
    ...typography.captionInterRegular11,
    color: colors.textGrey3
  },
  explorerLink: {
    maxWidth: getCustomSize(26.5),
    color: colors.orange,
    ...typography.captionInterSemiBold13
  },
  divider: {
    height: getCustomSize(0.125),
    backgroundColor: colors.bgGrey3,
    width: '100%'
  },
  from: {
    marginTop: getCustomSize(2.25),
    marginBottom: getCustomSize()
  },
  accountSelector: {
    backgroundColor: colors.bgGrey4,
    paddingHorizontal: getCustomSize(1.5),
    borderRadius: getCustomSize(),
    paddingTop: getCustomSize(1.5),
    paddingBottom: getCustomSize()
  },
  button: {
    padding: getCustomSize(0.5),
    borderRadius: getCustomSize(1.75)
  },
  accountName: {
    ...typography.bodyInterSemiBold15,
    marginLeft: getCustomSize(0.5),
    marginRight: getCustomSize(0.25)
  },
  address: {
    ...typography.numbersIBMPlexSansMedium13
  },
  selectorRow: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize(1.5)
  },
  gasBalanceTitle: {
    ...typography.numbersIBMPlexSansRegular11,
    color: colors.textGrey3
  },
  gasBalance: {
    ...typography.numbersIBMPlexSansMedium13
  },
  buttonPanel: {
    alignItems: 'flex-end',
    paddingBottom: getCustomSize(2)
  },
  greyLabel: {
    ...typography.captionInterRegular13,
    color: colors.textGrey3
  },
  greyText: {
    ...typography.captionInterRegular11,
    color: colors.textGrey3
  },
  allowsBlock: {
    marginTop: getCustomSize(3.75),
    flex: 1
  },
  allowsText: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: getCustomSize(1.5)
  },
  allowStatus: {
    marginRight: getCustomSize(0.5)
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});
