import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@consta/uikit/Card';
import { Job, ViewMode } from '../../types/timetable';
import { SheduleHeader } from './SheduleHeader/SheduleHeader';
import { cn } from '../../__private__/utils/bem';
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
import { useHistory, useLocation } from 'react-router-dom';
import { getQueryData, convertDataToQuery } from '../../utils';

import './Shedule.scss';

const cnShedule = cn('Shedule');

const getDate = (date: Date | [Date, Date], mode?: 'start' | 'end'): Date => {
  if (Array.isArray(date)) {
    return date[mode !== 'end' ? 0 : 1];
  }
  return date;
};

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
  const [defaultDate, setDefaultDate] = useState<[Date, Date] | undefined>();

  const containerRef = useRef<HTMLDivElement>(null);

  const mounted = useRef<boolean>(true);

  const addTask = () => {
    setShowModal.on();
  };

  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const data = getQueryData<{ mode: ViewMode; date: string }>(search);
    if (data?.mode && viewMode !== data.mode) {
      setViewMode(data.mode);
    }
    if (data?.mode && data.date) {
      setCurrentDate(getStartDate(data.mode, new Date(Number(data.date))));
    }
  }, []);

  useEffect(() => {
    const query = convertDataToQuery({
      mode: viewMode,
      date: Array.isArray(currentDate)
        ? currentDate[0].getTime()
        : currentDate?.getTime(),
    });
    history.push({
      search: query,
    });
  }, [currentDate, viewMode]);

  const getJobsList = (date?: Date | [Date, Date]) => {
    const targetDate = date ?? new Date();
    const start = resetDateTime(getDate(targetDate))?.toISOString() ?? '';
    const end =
      resetDateTime(getDate(targetDate, 'end'), 'end')?.toISOString() ?? '';
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
        if (mounted.current) {
          setTasks(eventsArr);
          setResources(resourcesArr);
        }
      })
      .catch(() => {
        if (mounted.current) {
          setTasks([]);
          setResources([]);
        }
      })
      .finally(() => {
        setLoading.off();
      });
  };

  useEffect(() => {
    getJobsList(currentDate);

    return () => {
      mounted.current = false;
    };
  }, [currentDate]);

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

  const handleCloseModal = () => {
    setShowModal.off();
    setVisibleTask(undefined);
  };

  const createJob = (data: CustomJob) => {
    const { description, favour, date, master } = data;
    return addJob({
      description,
      master,
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
      />
      <SheduleTimeLine
        viewMode={viewMode}
        currentDate={Array.isArray(currentDate) ? currentDate[0] : currentDate}
        className={cnShedule('TimeLine')}
        onChangeDate={setCurrentDate}
        onChangeActive={setCurrentDate}
      />
      <BigCalendar
        mode={viewMode}
        date={currentDate}
        items={tasks}
        resources={resources}
        changeEvent={handleChangeEvent}
        changeView={setViewMode}
        onCellClick={(data) => {
          addTask();
          const date = new Date(data.slots[0].getTime());
          date.setHours(date.getHours() + 1);
          setDefaultDate([data.slots[0], date]);
        }}
        onCellSelect={(data) => {
          addTask();
          setDefaultDate([data.start, data.end]);
        }}
        loading={loading}
        changeDate={setCurrentDate}
        className={cnShedule('TimeTable')}
      />
      <CrudModal
        mode="create"
        createFunc={
          createJob as unknown as (data: CustomJob) => AxiosPromise<CustomJob>
        }
        title="???????????????? ?????????? ????????????"
        onClose={handleCloseModal}
        isOpen={showModal}
        items={jobsCreate}
        defaultValues={
          defaultDate
            ? [
                {
                  key: 'date',
                  value: defaultDate,
                },
              ]
            : []
        }
        successCallback={() => {
          toast.success('???????????? ?????????????? ??????????????');
          setTimeout(() => document.location.reload(), 1000);
        }}
        errorCallback={() => {
          toast.alert('???? ?????????????? ?????????????? ????????????');
        }}
      />
    </Card>
  );
};

export default Shedule;
