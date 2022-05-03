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
import { getJobs, addJob, updateJob } from '../../utils/api/routes/jobs/jobs';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { AxiosPromise } from 'axios';
import {
  BigCalendarEvent,
  BigCalendarResource,
  getUniqueJobGroup,
  convertJobToEvent,
} from '../../components/BigCalendar/helper';
import { resetDateTime } from '../../utils/date/date';

const cnShedule = cn('Shedule');

const services = ['Сервис на Карповке', 'Сервис на Парнасе'];

const Shedule = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState<
    Date | [Date, Date] | undefined
  >(getStartDate('week'));
  const [tasks, setTasks] = useState<BigCalendarEvent<Job>[]>();
  const [resources, setResources] = useState<BigCalendarResource[]>();
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
        const { results } = res.data;
        const elements = getUniqueJobGroup(results);
        let eventsArr: BigCalendarEvent<Job>[] = [];
        const resourcesArr: BigCalendarResource[] = [];
        elements.forEach((el) => {
          eventsArr = eventsArr.concat(el.items);
          resourcesArr.push(el.group);
        });
        setTasks(eventsArr);
        setResources(resourcesArr);
        setLoading.off();
      })
      .catch(() => {
        setLoading.off();
        setTasks([]);
        setResources([]);
      })
      .finally(() => {
        setLoading.off();
      });
  };

  const changeEvent = (event: BigCalendarEvent<Job>) => {
    const prevJob = tasks?.find((el) => el.id === event.resource.id);
    if (tasks && prevJob) {
      const copyTasks = [...tasks];
      copyTasks.splice(copyTasks.indexOf(prevJob), 1);
      copyTasks.push(event);
      setTasks(copyTasks);
    } else {
      setTasks([event]);
    }
  };

  useEffect(() => {
    getJobsList(currentDate);
  }, []);

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

  const handleChangeEvent = (event: BigCalendarEvent<Job>) => {
    const job: Omit<Job, 'id' | 'master' | 'status'> = {
      description: event.resource.description,
      started_at: event.start.toISOString(),
      ended_at: event.end.toISOString(),
      favour: event.resource.favour,
    };
    setLoading.on();
    changeEvent(event);
    updateJob(job, event.resource.id)
      .then((res) => {
        const newEvent = convertJobToEvent(res.data);
        changeEvent(newEvent);
        setLoading.off();
      })
      .catch(() => {
        changeEvent(convertJobToEvent(event.resource));
        setLoading.off();
      });
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
        resources={resources}
        changeEvent={handleChangeEvent}
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
