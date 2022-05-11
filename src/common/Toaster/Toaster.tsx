import React from 'react';
import {
  toast as handler,
  Toaster as ToasterComponent,
  ToastOptions,
} from 'react-hot-toast';
import { Message } from '../../utils/toast/toast';
import { ToasterCard } from './ToasterCard/ToasterCard';

const options: ToastOptions = {
  duration: 5000,
  position: 'top-right',
};

export const Toaster = () => {
  return (
    <ToasterComponent toastOptions={options}>
      {(toast) => {
        let message: Message = '';
        if (toast.message) {
          try {
            message = JSON.parse(toast.message.toString());
          } catch (e) {
            message = toast.message.toString();
          }
        }
        const icon = toast.icon as React.ReactElement;
        let title: string | undefined;
        let messageText = '';
        if (Array.isArray(message)) {
          messageText = message.join(' ');
        } else if (typeof message === 'object') {
          title = message.title;
          messageText = message.message;
        } else {
          messageText = message;
        }
        return (
          <ToasterCard
            id={toast.id}
            icon={icon}
            duration={toast.duration}
            style={toast.style}
            title={title}
            message={messageText}
            onClose={(id) => handler.dismiss(id)}
          />
        );
      }}
    </ToasterComponent>
  );
};
