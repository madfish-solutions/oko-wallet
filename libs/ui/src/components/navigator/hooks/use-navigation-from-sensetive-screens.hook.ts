import { ScreensEnum } from '../../../enums/screens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';

const sensitiveRoutes = [ScreensEnum.RevealPrivateKey, ScreensEnum.RevealSeedPhrase];

export const useNavigationFromSensetiveScreens = () => {
  const { goBack, pop } = useNavigation();

  const checkScreenAndRedirect = (name: ScreensEnum, cb?: () => void) => {
    if (sensitiveRoutes.includes(name)) {
      pop();

      return goBack();
    }

    cb?.();
  };

  return { checkScreenAndRedirect };
};
