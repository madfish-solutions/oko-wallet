import React, { FC, PropsWithChildren } from 'react';
import { ToastProvider as ToastProviderBase } from 'react-native-toast-notifications';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';

import { ToastsEnum } from '../../enums/toasts.enums';
import { Toast } from '../toast/toast';

import { offset } from './constants/offset';

const renderToast = ({ message, type, data, onHide, duration }: ToastProps) => (
  <Toast message={message} type={type as ToastsEnum} onClose={onHide} data={data} duration={duration} />
);

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => (
  <ToastProviderBase offset={offset} renderToast={renderToast}>
    {children}
  </ToastProviderBase>
);
