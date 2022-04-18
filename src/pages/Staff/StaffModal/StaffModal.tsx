import React from 'react';
import {
  BaseModal,
  BaseModalProps,
} from '../../../common/BaseComponents/BaseModal/BaseModal';
import { Staff } from '../../../types/user';
import { StaffModalView } from './StaffModalView/StaffModalView';
import { cn } from '../../../__private__/utils/bem';

import './StaffModal.scss';

export type ModeProps =
  | {
      mode: 'edit';
      staff: Staff;
      onSubmit?: (data: Staff) => void;
      id?: never;
    }
  | {
      mode: 'view';
      staff?: never;
      id: string;
      onSubmit?: never;
    }
  | {
      mode: 'create';
      staff?: never;
      onSubmit?: (data: Staff) => void;
      id?: never;
    };

const getTitle = (mode: ModeProps['mode']) => {
  if (mode === 'create') {
    return 'Создание сотрудника';
  }
  if (mode === 'edit') {
    return 'Изменение данных сотрудника';
  }
  return 'Просмотр данных сотрудника';
};

const cnStaffModal = cn('StaffModal');

type Props = ModeProps & Omit<BaseModalProps, 'title' | 'withCloseButton'>;

export const StaffModal = (props: Props) => {
  const { mode, staff, id, ...otherProps } = props;

  const getContent = () => {
    if (mode === 'view') {
      return <StaffModalView id={id} />;
    }
  };

  return (
    <BaseModal
      title={getTitle(mode)}
      {...otherProps}
      className={cnStaffModal()}
    >
      {getContent()}
    </BaseModal>
  );
};
