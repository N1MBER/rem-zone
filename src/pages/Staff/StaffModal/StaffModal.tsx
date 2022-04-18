import React from 'react';
import {
  BaseModal,
  BaseModalProps,
} from '../../../common/BaseComponents/BaseModal/BaseModal';
import { Staff } from '../../../types/user';
import { StaffModalView } from './StaffModalView/StaffModalView';
import { cn } from '../../../__private__/utils/bem';
import {
  StaffData,
  StaffModalControl,
} from './StaffModalControl/StaffModalControl';
import {
  updateStaff as updateStaffFunc,
  addStaff,
} from '../../../utils/api/routes/users/users';
import { toast } from '../../../utils/toast/toast';

import './StaffModal.scss';

export type ModeProps =
  | {
      mode: 'edit';
      staff: Staff;
      id: string;
    }
  | {
      mode: 'view';
      staff?: never;
      id: string;
    }
  | {
      mode: 'create';
      staff?: never;
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
  const { mode, staff, id, onClose, ...otherProps } = props;

  const updateStaff = (data: StaffData, id?: string) => {
    if (id) {
      updateStaffFunc(data, id)
        .then((res) => {
          if (res.status === 200) {
            onClose?.();
            toast.success('Данные успешно обновились');
            setTimeout(() => document.location.reload(), 1000);
          } else {
            toast.alert('Ну удалось обновить данные сотрудника');
          }
        })
        .catch(() => {
          toast.alert('Ну удалось обновить данные сотрудника');
        });
    } else {
      toast.alert('Ну удалось обновить данные сотрудника');
    }
  };

  const createStaff = (data: StaffData) => {
    addStaff(data)
      .then((res) => {
        if (res.status === 201) {
          onClose?.();
          toast.success('Сотрудник успешно создан');
          setTimeout(() => document.location.reload(), 1000);
        } else {
          toast.alert('Ну удалось создать сотрудника');
        }
      })
      .catch(() => {
        toast.alert('Ну удалось создать сотрудника');
      });
  };

  const getContent = () => {
    if (mode === 'view') {
      return <StaffModalView id={id} />;
    }
    if (mode === 'edit') {
      return (
        <StaffModalControl
          onClose={onClose}
          staff={staff}
          mode="edit"
          onSubmit={(data) => updateStaff(data, id)}
        />
      );
    }
    return (
      <StaffModalControl
        onClose={onClose}
        mode="create"
        onSubmit={(data) => createStaff(data)}
      />
    );
  };

  return (
    <BaseModal
      title={getTitle(mode)}
      onClose={onClose}
      {...otherProps}
      className={cnStaffModal()}
    >
      {getContent()}
    </BaseModal>
  );
};
