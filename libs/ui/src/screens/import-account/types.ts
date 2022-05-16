import { ScreensEnum } from '../../enums/sreens.enum';
import { NavigationProps } from '../../interfaces/navigation.interface';

export interface ImportAccountProps extends NavigationProps<ScreensEnum.ImportAccount> {
  handleAuthorisation: () => void;
}
