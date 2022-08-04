import { useToast as useToastBase } from 'react-native-toast-notifications';

import { ToastsEnum } from '../enums/toasts.enums';

export const useToast = () => {
  const toast = useToastBase();

  const showSuccessToast = (message: string) => toast.show(message, { type: ToastsEnum.success });
  const showErrorToast = (message: string) => toast.show(message, { type: ToastsEnum.error });
  const showWarningToast = (message: string) => toast.show(message, { type: ToastsEnum.warning });

  return {
    showSuccessToast,
    showErrorToast,
    showWarningToast
  };
};
