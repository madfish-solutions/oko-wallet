import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: getCustomSize(2),
    paddingBottom: getCustomSize(4),
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
  imageContainer: {
    marginBottom: getCustomSize(2)
  },
  image: {
    backgroundColor: colors.bgGrey2
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
    ...typography.captionInterSemiBold13
  },
  buttonContainer: {
    paddingHorizontal: getCustomSize(2)
  },
  button: {
    height: getCustomSize(5),
    flexGrow: 0
  }
});
