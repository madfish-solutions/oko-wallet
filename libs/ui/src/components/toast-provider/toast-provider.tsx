import React, { FC } from 'react';
import { ToastProvider as ToastProviderBase } from 'react-native-toast-notifications';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';

import { ToastsEnum } from '../../enums/toasts.enums';

import { Toast } from './components/toast/toast';
import { offset } from './constants/offset';

const renderToast = ({ message, type }: ToastProps) => <Toast message={message} type={type as ToastsEnum} />;

export const ToastProvider: FC = ({ children }) => (
  <ToastProviderBase offset={offset} renderToast={renderToast}>
    {children}
  </ToastProviderBase>
);
