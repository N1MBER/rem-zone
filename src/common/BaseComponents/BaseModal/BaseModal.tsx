import React, { useEffect } from 'react';
import { Modal } from '@consta/uikit/Modal';
import { PropsWithHTMLAttributes } from '../../../__private__/utils/types/PropsWithHTMLAttributes';
import { cn } from '../../../__private__/utils/bem';
import { Button } from '@consta/uikit/Button';
import { IconClose } from '@consta/uikit/IconClose';
import { Text } from '@consta/uikit/Text';
import { cnMixSpace } from '@consta/uikit/MixSpace';

import './BaseModal.scss';

export type BaseModalProps = PropsWithHTMLAttributes<
  {
    withCloseButton?: boolean;
    title?: string;
    titleElements?: React.ReactElement;
    hasOverlay?: boolean;
    lockBackground?: boolean;
    isOpen?: boolean;
    onClose?: () => void;
  },
  HTMLDivElement
>;

const cnBaseModal = cn('BaseModal');

export const BaseModal = (props: BaseModalProps) => {
  const {
    className,
    children,
    title,
    withCloseButton = true,
    isOpen,
    hasOverlay,
    lockBackground,
    titleElements,
    onClose,
  } = props;

  useEffect(() => {
    if (isOpen && lockBackground) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [lockBackground, isOpen]);

  return (
    <Modal
      className={cnBaseModal(null, [className, cnMixSpace({ p: '2xl' })])}
      isOpen={isOpen}
      onClickOutside={onClose}
      onEsc={onClose}
      hasOverlay={hasOverlay}
    >
      {withCloseButton && (
        <Button
          className={cnBaseModal('CloseButton')}
          onlyIcon
          onClick={onClose}
          iconLeft={IconClose}
          size="s"
          view="clear"
        />
      )}
      {title && (
        <div className={cnBaseModal('Title')}>
          <Text
            size="2xl"
            lineHeight="xs"
            view="primary"
            className={cnBaseModal('Title-Text')}
          >
            {title}
          </Text>
          {titleElements}
        </div>
      )}

      {children}
    </Modal>
  );
};
