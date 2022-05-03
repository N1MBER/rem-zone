import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@consta/uikit/Card';
import { Job, ViewMode } from '../../types/timetable';
import { SheduleHeader } from './SheduleHeader/SheduleHeader';
import { cn } from '../../__private__/utils/bem';
import './Shedule.scss';
import { SheduleTimeLine } from './SheduleTimeLine/SheduleTimeLine';
import { Task } from '../../types/schedule';
import { useFlag } from '@consta/uikit/useFlag';
import { CustomJob, getStartDate, jobsCreate } from './helper';
import { toast } from '../../utils/toast/toast';
import { BigCalendar } from '../../components/BigCalendar/BigCalendar';
import { getJobs, addJob } from '../../utils/api/routes/jobs/jobs';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { AxiosPromise } from 'axios';
import { BigCalendarEvent } from '../../components/BigCalendar/helper';
import { resetDateTime } from '../../utils/date/date';

const cnShedule = cn('Shedule');

const services = ['Сервис на Карповке', 'Сервис на Парнасе'];

const Shedule = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState<
    Date | [Date, Date] | undefined
  >(getStartDate('week'));
  const [tasks, setTasks] = useState<Job[]>();
  const [visibleTask, setVisibleTask] = useState<Task | undefined>();
  const [showModal, setShowModal] = useFlag();
  const [loading, setLoading] = useFlag();

  const containerRef = useRef<HTMLDivElement>(null);

  const addTask = () => {
    setShowModal.on();
  };

  const getJobsList = (date?: Date | [Date, Date]) => {
    const targetDate = date ?? new Date();
    const start =
      resetDateTime(
        Array.isArray(targetDate) ? targetDate[0] : targetDate
      )?.toISOString() ?? '';
    const end =
      resetDateTime(
        Array.isArray(targetDate) ? targetDate[1] : targetDate,
        'end'
      )?.toISOString() ?? '';
    setLoading.on();
    getJobs({ offset: 0, limit: 200, start, end })
      .then((res) => {
        setTasks(res.data.results);
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
    getJobsList(currentDate);
  }, []);

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

  const handleChangeEvents = (events: BigCalendarEvent<Job>[]) => {
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
        onChangeActive={(dates) => {
          setCurrentDate(dates);
          getJobsList(dates);
        }}
      />
      <BigCalendar
        mode={viewMode}
        date={currentDate}
        items={tasks}
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

export default Shedule;
