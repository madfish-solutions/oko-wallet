import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';

export interface ImportAccountProps extends NativeStackScreenProps<ScreensParamList, ScreensEnum.ImportAccount> {
  handleAuthorisation: () => void;
}
