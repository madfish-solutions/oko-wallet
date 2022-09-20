import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';
import { isMobile, isWeb } from '../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: getCustomSize(2),
    paddingBottom: isMobile ? getCustomSize(4) : getCustomSize(2),
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    marginBottom: getCustomSize(2),
    paddingHorizontal: getCustomSize(2)
  },
  contentContainerStyle: {
    alignItems: 'center'
  },
  nftWrapper: {
    position: 'relative',
    marginBottom: getCustomSize(2),
    ...(isMobile && {
      maxHeight: getCustomSize(37.5),
      maxWidth: getCustomSize(37.5),
      width: '100%',
      height: '100%'
    })
  },
  imageContainer: {
    borderRadius: getCustomSize(0.5),
    ...(isWeb && {
      position: 'absolute',
      maxHeight: getCustomSize(37.5),
      maxWidth: getCustomSize(37.5),
      width: '100%',
      height: '100%'
    })
  },
  list: {
    width: '100%'
  },
  listItem: {
    justifyContent: 'space-between',
    height: getCustomSize(6),
    width: '100%',
    paddingVertical: getCustomSize(2),
    borderBottomWidth: getCustomSize(0.0625),
    borderBottomColor: colors.border2
  },
  itemTitle: {
    ...typography.captionInterRegular11,
    color: colors.textGrey3
  },
  itemValue: {
    ...typography.numbersIBMPlexSansMedium13,
    color: colors.textGrey4
  },
  buttonContainer: {
    paddingHorizontal: getCustomSize(2)
  },
  button: {
    height: getCustomSize(5),
    flexGrow: 0
  }
});
