import React, { useState } from 'react';
import { cn } from '../../../__private__/utils/bem';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';
import { Select } from '@consta/uikit/Select';
import { BaseModal } from '../../../common/BaseComponents/BaseModal/BaseModal';
import { Balance } from '../../../types/bonuses';
import { changeBalance } from '../../../utils/api/routes/bonuses/bonuses';
import { toast } from '../../../utils/toast/toast';
import { getErrorMessage } from '../../../utils';

import './BalanceModal.scss';

type Props = {
  balance?: Balance;
  isOpen: boolean;
  onClose: () => void;
};

type OperationType = 'asc' | 'desc';

const cnBalanceModal = cn('BalanceModal');

const operations = [
  {
    label: 'Пополнение',
    type: 'asc',
  },
  {
    label: 'Списание',
    type: 'desc',
  },
];

export const BalanceModal = (props: Props) => {
  const { balance, isOpen, onClose } = props;

  const [type, setType] = useState<OperationType>('asc');
  const [count, setCount] = useState<number | null>(null);

  const handleClick = () => {
    if (count) {
      if (balance) {
        changeBalance(
          { bonuses: type === 'desc' ? -1 * count : count },
          balance.id
        )
          .then((res) => {
            if (res.status === 200) {
              toast.success('Операция выполнена успшно');
              setTimeout(() => document.location.reload(), 1000);
            } else {
              const message = getErrorMessage(res.data);
              toast.alert(message ?? 'Произошла ошибка, попробуйте позже');
            }
          })
          .catch((e) => {
            const message = getErrorMessage(e);
            toast.alert(message ?? 'Произошла ошибка, попробуйте позже');
          });
      } else {
        toast.alert('Произошла ошибка, попробуйте позже');
      }
    } else {
      toast.alert('Количество бонусов не указано');
    }
  };

  return (
    <BaseModal
      className={cnBalanceModal()}
      title={`Изменение баланса для ${balance?.client.last_name} ${balance?.client.first_name}`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={cnBalanceModal('Controls')}>
        <TextField
          label="Количестов бонусов"
          placeholder={`Текущий баланс: ${balance?.balance ?? 0}`}
          labelPosition="top"
          value={count?.toString()}
          type="number"
          min={0}
          form="defaultClear"
          onChange={({ value }) =>
            setCount(typeof value === 'string' ? Number(value) : value)
          }
        />
        <Select
          form="brickDefault"
          value={operations.find((item) => item.type === type)}
          getItemLabel={(item) => item.label}
          getItemKey={(item) => item.type}
          items={operations}
          style={{ zIndex: 1000 }}
          onChange={({ value }) =>
            value && setType(value.type as OperationType)
          }
        />
      </div>
      <div className={cnBalanceModal('Buttons')}>
        <Button label="Изменить" onClick={handleClick} />
        {onClose && <Button label="Отмена" view="ghost" onClick={onClose} />}
      </div>
    </BaseModal>
  );
};
