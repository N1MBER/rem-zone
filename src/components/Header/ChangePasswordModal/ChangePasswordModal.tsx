import { cn } from '../../../__private__/utils/bem';
import React, { useState } from 'react';
import { BaseModal } from '../../../common/BaseComponents/BaseModal/BaseModal';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import { changePassword } from '../../../store/reducers/user/user';
import { useDispatch } from 'react-redux';
import { toast } from '../../../utils/toast/toast';

import './ChangePasswordModal.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type Data = {
  new_password1?: string | null;
  new_password2?: string | null;
};

const checkData = (data: Data): Data => {
  const { new_password1, new_password2 } = data;
  if (!new_password1 || !new_password2) {
    return {
      new_password1: new_password1 ? undefined : 'Значение не указано',
      new_password2: new_password2 ? undefined : 'Значение не указано',
    };
  }
  if (new_password1.length < 5 || new_password2.length < 5) {
    return {
      new_password1:
        new_password1.length < 5
          ? undefined
          : 'Пароль должен быть больше 5 символов',
      new_password2:
        new_password2.length < 5
          ? undefined
          : 'Пароль должен быть больше 5 символов',
    };
  }
  if (new_password1 !== new_password2) {
    return {
      new_password2: 'Пароли не совпадают',
    };
  }
  return {};
};

const cnChangePasswordModal = cn('ChangePasswordModal');

export const ChangePasswordModal = (props: Props) => {
  const [data, setData] = useState<Data>({});
  const [erros, setErrors] = useState<Data>({});

  const dispatch = useDispatch();

  const handleClick = () => {
    const info = checkData(data);
    if (Object.keys(info).length === 0) {
      const { new_password1, new_password2 } = data;
      dispatch(
        changePassword({
          new_password1: new_password1 as string,
          new_password2: new_password2 as string,
          successCallback: () => {
            toast.success('Пароль успешно обновлен');
            props.onClose?.();
          },
          errorCallback: () => {
            toast.alert('Не удалось изменить пароль');
          },
        })
      );
    } else {
      setErrors(info);
    }
  };

  return (
    <BaseModal
      title="Смена пароля"
      withCloseButton
      lockBackground
      className={cnChangePasswordModal()}
      {...props}
    >
      <div className={cnChangePasswordModal('Container')}>
        <TextField
          label="Новый пароль"
          placeholder="Новый пароль"
          value={data.new_password1}
          required
          width="full"
          status={erros.new_password1 ? 'alert' : undefined}
          caption={erros.new_password1 ?? undefined}
          type="text"
          size="m"
          onChange={({ value }) => setData({ ...data, new_password1: value })}
        />
        <TextField
          label="Повторите пароль"
          placeholder="Повторите пароль"
          value={data.new_password2}
          required
          width="full"
          status={erros.new_password2 ? 'alert' : undefined}
          caption={erros.new_password2 ?? undefined}
          type="text"
          size="m"
          onChange={({ value }) => setData({ ...data, new_password2: value })}
        />
        <div className={cnChangePasswordModal('Buttons')}>
          <Button label="Обновить" onClick={handleClick} />
          {props.onClose && (
            <Button label="Отмена" view="ghost" onClick={props.onClose} />
          )}
        </div>
      </div>
    </BaseModal>
  );
};
