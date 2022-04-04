import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@consta/uikit/Card';
import { ViewMode } from '../../types/timetable';
import { SheduleHeader } from './SheduleHeader/SheduleHeader';
import { cn } from '../../__private__/utils/bem';
import './Shedule.scss';
import { SheduleTimeLine } from './SheduleTimeLine/SheduleTimeLine';
import { TimeTable } from '../../components/TimeTable/TimeTable';
import { timeTableItems } from '../../components/TimeTable/__mocks__/mock.data';
import { Task } from '../../types/schedule';
import { useFlag } from '@consta/uikit/useFlag';
import { ScheduleTaskModal } from './ScheduleTaskModal/ScheduleTaskModal';
import { getRandomColor } from './helper';
import { toast } from '../../utils/toast';

const cnShedule = cn('Shedule');

const services = ['Сервис на Карповке', 'Сервис на Парнасе'];

export const Shedule = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState<
    Date | [Date, Date] | undefined
  >();
  const [tasks, setTasks] = useState<Task[]>(timeTableItems);
  const [visibleTask, setVisibleTask] = useState<Task | undefined>();
  const [showModal, setShowModal] = useFlag(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const addTask = () => {
    setShowModal.on();
  };

  const changeTask = (params: {
    type: 'add' | 'remove' | 'update';
    task: Partial<Task>;
  }) => {
    handleCloseModal();
    const { type, task } = params;
    const copyTasks = [...tasks];
    if (type === 'add') {
      toast.success({
        title: task.type === 'service' ? 'Обслуживание' : 'Заказ',
        message: `${
          task.type === 'service' ? 'Обслуживание' : 'Заказ'
        } успешно зарегестрировано`,
      });
      task.color = getRandomColor();
      task.key = (tasks.length + 1).toString();
      copyTasks.push(task as Task);
    } else {
      const index = copyTasks.indexOf(
        copyTasks.filter((item) => item.key === task.key)[0]
      );
      copyTasks.splice(index, 1);
      if (type === 'update') {
        copyTasks.push(task as Task);
        toast.warning({
          title: task.type === 'service' ? 'Обслуживание' : 'Заказ',
          message: `${
            task.type === 'service' ? 'Обслуживание' : 'Заказ'
          } успешно обновлено`,
        });
      } else {
        toast.alert({
          title: task.type === 'service' ? 'Обслуживание' : 'Заказ',
          message: `${
            task.type === 'service' ? 'Обслуживание' : 'Заказ'
          } успешно удалено`,
        });
      }
    }
    setTasks(copyTasks);
  };

  const handleCloseModal = () => {
    setShowModal.off();
    setVisibleTask(undefined);
  };

  useEffect(() => {
    if (visibleTask) {
      setShowModal.on();
    }
  }, [visibleTask]);

  return (
    <Card
      ref={containerRef}
      className={cnShedule()}
      verticalSpace="2xl"
      horizontalSpace="2xl"
    >
      <SheduleHeader
        viewMode={viewMode}
        changeViewMode={setViewMode}
        onAddNewTask={addTask}
        servicePlace={services}
      />
      <SheduleTimeLine
        viewMode={viewMode}
        currentDate={Array.isArray(currentDate) ? currentDate[0] : currentDate}
        className={cnShedule('TimeLine')}
        onChangeDate={setCurrentDate}
      />
      <TimeTable
        type={viewMode}
        items={tasks}
        containerRef={containerRef}
        onItemClick={({ item }) => setVisibleTask(item)}
        date={Array.isArray(currentDate) ? currentDate[0] : currentDate}
        className={cnShedule('TimeTable')}
      />
      <ScheduleTaskModal
        isOpen={showModal}
        onClose={handleCloseModal}
        task={visibleTask}
        type={visibleTask ? 'update' : 'add'}
        onSubmitTask={(value) => changeTask(value)}
      />
    </Card>
  );
};
