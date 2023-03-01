import { handleSetValueToClipboard } from '../utils/copy-to-clipboard.util';

import { useToast } from './use-toast.hook';

const TOAST_DURATION_OF_COPY = 1000;

interface Props {
  text: string;
  toastDuration?: number;
}

export const useCopyToClipboard = ({ text, toastDuration = TOAST_DURATION_OF_COPY }: Props) => {
  const { showSuccessToast } = useToast();

  const copy = () => {
    handleSetValueToClipboard(text);

    showSuccessToast({
      message: 'Copied',
      duration: toastDuration,
      data: {
        isShowTimerLine: false
      }
    });
  };

  return copy;
};
