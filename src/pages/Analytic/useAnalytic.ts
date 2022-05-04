import { useEffect, useMemo, useState, useRef } from 'react';
import { AnalyticData } from './types';
import { getClients } from '../../utils/api/routes/users/users';
import { Props as AnalyticInfo } from './AnalyticCard/AnalyticCard';
import {
  getJobsAnalytic,
  getWorklogsAnalytic,
} from '../../utils/api/routes/analytic/analytic';
import { AnalyticWorklog } from '../../utils/api/routes/analytic/types';
import { DonutItem as ChartDonutItem } from '../../components/Charts/ChartDonut/ChartDonut';

const checkAnalytic = (data: AnalyticInfo): boolean => {
  const { hours, newClients, activeTask, completeTask } = data;
  return (
    typeof hours !== 'undefined' &&
    typeof newClients !== 'undefined' &&
    typeof activeTask !== 'undefined' &&
    typeof completeTask !== 'undefined'
  );
};

const convertWorklogToDonutData = (
  data: AnalyticWorklog,
  color?: string
): ChartDonutItem => {
  return {
    type: `${data.last_name} ${data.first_name[0]}. ${data.patronomic[0]}`,
    value: Number(data.total_worklogs),
    color: color ?? '##dee4e8',
  };
};

const colors = [
  '#22C38E',
  '#F2C94C',
  '#F38B00',
  '#EB5757',
  '#56B9F2',
  '#0071B2',
];

export const useAnalytic = (): AnalyticData => {
  const [hours, setHours] = useState<number | undefined>();
  const [newClients, setNewClients] = useState<number | undefined>();
  const [analyticWorklog, setAnalyticWorklog] = useState<
    ChartDonutItem[] | undefined
  >();
  const [jobs, setJobs] = useState<
    { active: number; completed: number } | undefined
  >();

  const mounted = useRef<boolean>(true);

  const getNewClients = () => {
    getClients({ newest: true, limit: 20, offset: 0 })
      .then((res) => {
        if (mounted.current) {
          setNewClients(res.data.count);
        }
      })
      .catch(() => {
        if (mounted.current) {
          setNewClients(0);
        }
      });
  };

  const getWorkTime = () => {
    getWorklogsAnalytic({ limit: 20, offset: 0 })
      .then((res) => {
        if (Array.isArray(res.data)) {
          let totalTime = 0;
          const arr = res.data.map((item) => {
            const donutItem = convertWorklogToDonutData(item);
            totalTime += donutItem.value;
            return donutItem;
          });
          const sorted = arr
            .sort((a, b) => b.value - a.value)
            .map((item, index) => {
              const copyItem = { ...item };
              if (index < 6) {
                copyItem.color = colors[index];
              }
              return copyItem;
            });
          if (mounted.current) {
            setHours(totalTime);
            setAnalyticWorklog(sorted);
          }
        }
      })
      .catch(() => {
        if (mounted.current) {
          setAnalyticWorklog([]);
          setHours(0);
        }
      });
  };

  const getJobs = () => {
    getJobsAnalytic({ limit: 20, offset: 0 })
      .then(({ data }) => {
        if (Array.isArray(data)) {
          const active = data
            .filter(
              (item) => item.status === 'Открыта' || item.status === 'В работе'
            )
            .map((el) => el.count)
            .reduce((sum, item) => {
              return sum + item;
            });
          const completed = data
            .filter((item) => item.status === 'Выполнена')
            .map((el) => el.count)
            .reduce((sum, item) => {
              return sum + item;
            });
          if (mounted.current) {
            setJobs({ active, completed });
          }
        } else if (mounted.current) {
          setJobs({ active: 0, completed: 0 });
        }
      })
      .catch(() => {
        if (mounted.current) {
          setJobs({ active: 0, completed: 0 });
        }
      });
  };

  useEffect(() => {
    getNewClients();
    getWorkTime();
    getJobs();

    return () => {
      mounted.current = false;
    };
  }, []);

  const analyticData: AnalyticInfo = useMemo(() => {
    return {
      newClients,
      hours,
      activeTask: jobs?.active,
      completeTask: jobs?.completed,
    };
  }, [newClients, hours, jobs]);

  return {
    worklogData: analyticWorklog || false,
    analytic: checkAnalytic(analyticData)
      ? (analyticData as AnalyticData['analytic'])
      : false,
  };
};
