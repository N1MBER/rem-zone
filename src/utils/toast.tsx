import React from 'react';
import { toast as handler } from 'react-hot-toast';
import { IconAlert } from '@consta/uikit/IconAlert';
import { IconThumbUp } from '@consta/uikit/IconThumbUp';
import { IconWarning } from '@consta/uikit/IconWarning';

export type Message =
  | {
      title?: string;
      message: string;
    }
  | string;

const converToString = (message: Message): string => {
  if (typeof message === 'string') {
    return message;
  }
  return JSON.stringify(message);
};

export const toast = {
  success: (message: Message) =>
    handler(converToString(message), {
      icon: <IconThumbUp size="s" />,
      style: {
        background: 'var(--color-bg-success)',
      },
    }),
  alert: (message: Message) =>
    handler(converToString(message), {
      icon: <IconWarning size="s" />,
      style: {
        background: 'var(--color-bg-alert)',
      },
    }),
  warning: (message: Message) =>
    handler(converToString(message), {
      icon: <IconAlert size="s" />,
      style: {
        background: 'var(--color-bg-warning)',
      },
    }),
};
