import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@consta/uikit/Card';
import { Job, ViewMode } from '../../types/timetable';
import { SheduleHeader } from './SheduleHeader/SheduleHeader';
import { cn } from '../../__private__/utils/bem';
import './Shedule.scss';
import { SheduleTimeLine } from './SheduleTimeLine/SheduleTimeLine';
import { Task } from '../../types/schedule';
import { useFlag } from '@consta/uikit/useFlag';
import { CustomJob, jobsCreate } from './helper';
import { toast } from '../../utils/toast/toast';
import { BigCalendar } from '../../components/BigCalendar/BigCalendar';
import { getJobs, addJob } from '../../utils/api/routes/jobs/jobs';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { AxiosPromise } from 'axios';
import { BigCalendarEvent } from '../../components/BigCalendar/helper';

const cnShedule = cn('Shedule');

const services = ['Сервис на Карповке', 'Сервис на Парнасе'];

const mock: Job[] = [
  {
    description: 'Что-то',
    ended_at: '2022-04-30T19:00:00+03:00',
    favour: 2,
    id: 'dfde4c6c-364e-4b64-8774-1112a4ad533e',
    master: {
      email: 'admin@ad.com',
      first_name: '',
      groups: [],
      is_superuser: true,
      last_name: '',
      pk: '85fb7d7c-0e88-45d6-95f9-4d1f9c872010',
      username: 'admin',
    },
    started_at: '2022-04-29T12:00:00+03:00',
    status: 'Открыта',
  },
];

export const Shedule = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState<
    Date | [Date, Date] | undefined
  >();
  const [tasks, setTasks] = useState<Job[]>();
  const [visibleTask, setVisibleTask] = useState<Task | undefined>();
  const [showModal, setShowModal] = useFlag();
  const [loading, setLoading] = useFlag();

  const containerRef = useRef<HTMLDivElement>(null);

  const addTask = () => {
    setShowModal.on();
  };

  const getJobsList = () => {
    const start =
      (Array.isArray(currentDate)
        ? currentDate[0]
        : currentDate
      )?.toISOString() ?? '';
    const end =
      (Array.isArray(currentDate)
        ? currentDate[1]
        : currentDate
      )?.toISOString() ?? '';
    setLoading.on();
    getJobs({ offset: 0, limit: 200, start, end })
      .then((res) => {
        setTasks(res.data.results);
        console.log(res);
        setLoading.off();
      })
      .catch(() => {
        setLoading.off();
      })
      .finally(() => {
        setLoading.off();
      });
  };

  useEffect(() => {
    getJobsList();
  }, [currentDate]);

  // const changeTask = (params: {
  //   type: 'add' | 'remove' | 'update';
  //   task: Partial<Task>;
  // }) => {
  //   handleCloseModal();
  //   const { type, task } = params;
  //   const copyTasks = [...tasks];
  //   if (type === 'add') {
  //     toast.success({
  //       title: task.type === 'service' ? 'Обслуживание' : 'Заказ',
  //       message: `${
  //         task.type === 'service' ? 'Обслуживание' : 'Заказ'
  //       } успешно зарегестрировано`,
  //     });
  //     task.color = getRandomColor();
  //     task.key = (tasks.length + 1).toString();
  //     copyTasks.push(task as Task);
  //   } else {
  //     const index = copyTasks.indexOf(
  //       copyTasks.filter((item) => item.key === task.key)[0]
  //     );
  //     copyTasks.splice(index, 1);
  //     if (type === 'update') {
  //       copyTasks.push(task as Task);
  //       toast.warning({
  //         title: task.type === 'service' ? 'Обслуживание' : 'Заказ',
  //         message: `${
  //           task.type === 'service' ? 'Обслуживание' : 'Заказ'
  //         } успешно обновлено`,
  //       });
  //     } else {
  //       toast.alert({
  //         title: task.type === 'service' ? 'Обслуживание' : 'Заказ',
  //         message: `${
  //           task.type === 'service' ? 'Обслуживание' : 'Заказ'
  //         } успешно удалено`,
  //       });
  //     }
  //   }
  //   setTasks(copyTasks);
  // };

  const handleCloseModal = () => {
    setShowModal.off();
    setVisibleTask(undefined);
  };

  const createJob = (data: CustomJob) => {
    const { description, favour, date } = data;
    return addJob({
      description,
      favour,
      started_at: date[0].toISOString(),
      ended_at: date[1].toISOString(),
    });
  };

  // const changeDate = (date: Date[] | { start: Date; end: Date }) => {
  //   // if  ()
  // }

  const handleChangeEvents = (
    events: BigCalendarEvent<Job>[]
    // errorCallback?: () => void
  ) => {
    setTasks(
      events
        .filter((item) => item.resource)
        .map((item) => item.resource) as Job[]
    );
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
      <BigCalendar
        mode={viewMode}
        date={currentDate}
        items={mock ?? tasks}
        changeEvents={handleChangeEvents}
        changeView={setViewMode}
        loading={loading}
        changeDate={setCurrentDate}
        className={cnShedule('TimeTable')}
      />
      <CrudModal
        mode="create"
        createFunc={
          createJob as unknown as (data: CustomJob) => AxiosPromise<CustomJob>
        }
        title="Создание новой задачи"
        onClose={handleCloseModal}
        isOpen={showModal}
        items={jobsCreate}
        successCallback={() => {
          toast.success('Задача успешно создана');
          setTimeout(() => document.location.reload(), 1000);
        }}
        errorCallback={() => {
          toast.alert('Ну удалось создать задачу');
        }}
      />
    </Card>
  );
};
