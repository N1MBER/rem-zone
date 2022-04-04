import { BaseModal, BaseModalProps } from '../../../common/BaseModal/BaseModal';
import React, { useEffect, useState } from 'react';
import { Task } from '../../../types/schedule';
import { Combobox } from '@consta/uikit/Combobox';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { Button } from '@consta/uikit/Button';
import { cn } from '../../../__private__/utils/bem';
import {
  auto,
  customer,
  executor,
} from '../../../components/TimeTable/__mocks__/mock.data';
import { TextField } from '@consta/uikit/TextField';
import { TimeInterval } from '../../../components/TimeInterval/TimeInterval';
import { FieldLabel } from '@consta/uikit/FieldLabel';

import './ScheduleTaskModal.scss';

type ModalType = 'remove' | 'add' | 'update';

type Props = {
  onSubmitTask?: (params: { type: ModalType; task: Partial<Task> }) => void;
  type?: 'add' | 'update';
  task?: Task;
} & Omit<BaseModalProps, 'title' | 'withCloseButton'>;

const cnScheduleTaskModal = cn('ScheduleTaskModal');

type ChoiceItem = {
  label: string;
  type: Task['type'] | undefined;
};

const choiceItems: ChoiceItem[] = [
  {
    label: 'Сервис',
    type: 'service',
  },
  {
    label: 'Внутреняя',
    type: 'order',
  },
  {
    label: 'Другое',
    type: undefined,
  },
];

export const ScheduleTaskModal = (props: Props) => {
  const {
    onSubmitTask,
    task: currentTask,
    type: modalType = 'add',
    onClose,
    ...otherProps
  } = props;

  const [task, setTask] = useState<Partial<Task>>({});
  const [type, setType] = useState<ChoiceItem>(choiceItems[0]);

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
      setType(
        choiceItems.find((item) => item.type === currentTask.type) ??
          choiceItems[0]
      );
    }
  }, [currentTask]);

  useEffect(() => {
    setTask({ ...task, type: type.type });
  }, [type]);

  const setDate = (dates: [Date, Date]) => {
    setTask({ ...task, startDate: dates[0], endDate: dates[1] });
  };

  const minDate = new Date();

  const handleClick = (type?: ModalType) => {
    onSubmitTask?.({ type: type ?? modalType, task });
  };

  return (
    <BaseModal
      className={cnScheduleTaskModal()}
      title={modalType === 'add' ? 'Создание задачи' : 'Изменение задачи'}
      onClose={onClose}
      withCloseButton
      lockBackground
      {...otherProps}
    >
      <div className={cnScheduleTaskModal('Container')}>
        <FieldLabel size="m">Тип задачи</FieldLabel>
        <ChoiceGroup
          items={choiceItems}
          onChange={({ value }) => setType(value)}
          size="m"
          view="primary"
          multiple={false}
          name="ChoiceGroupType"
          width="full"
          value={type}
          getLabel={(item) => item.label}
        />
        <Combobox
          value={task.executor}
          getItemKey={(item) => item.name}
          getItemLabel={(item) => item.name}
          size="m"
          label="Укажите исполнителя"
          items={[executor]}
          onChange={({ value }) =>
            value && setTask({ ...task, executor: value })
          }
        />
        {type.type === 'service' ? (
          <>
            <Combobox
              value={task.customer}
              getItemKey={(item) => item.name}
              getItemLabel={(item) => item.name}
              size="m"
              label="Укажите заказчика"
              onChange={({ value }) => setTask({ ...task, customer: value })}
              items={[customer]}
            />
            <Combobox
              value={task.auto}
              getItemKey={(item) => item.id}
              getItemLabel={(item) => `${item.brand} ${item.VIN}`}
              size="m"
              label="Укажите автомообиль"
              onChange={({ value }) => setTask({ ...task, auto: value })}
              items={[auto]}
            />
            <TimeInterval
              label="Время выполнения"
              value={[task.startDate, task.endDate]}
              onChange={({ value }) => setDate(value)}
              size="m"
              minDate={minDate}
              currentVisibleDate={minDate}
            />
          </>
        ) : (
          <>
            <TextField
              label="Укажите название задачи"
              size="m"
              width="full"
              placeholder="Название задачи"
              value={task.label}
              onChange={({ value }) => setTask({ ...task, label: value })}
            />
            <TimeInterval
              label="Время выполнения"
              value={[task.startDate, task.endDate]}
              onChange={({ value }) => setDate(value)}
              size="m"
              minDate={minDate}
              currentVisibleDate={minDate}
            />
          </>
        )}
        <div className={cnScheduleTaskModal('Buttons')}>
          <Button size="m" label="Создать" onClick={() => handleClick()} />
          {modalType !== 'add' && (
            <Button
              size="m"
              view="secondary"
              label="Удалить"
              onClick={() => handleClick('remove')}
            />
          )}
          <Button size="m" view="ghost" label="Отмена" onClick={onClose} />
        </div>
      </div>
    </BaseModal>
  );
};
