import { useEffect, useMemo, useState } from 'react';
import { AnalyticData } from './types';
import { getClients } from '../../utils/api/routes/users/users';
import { Props as AnalyticInfo } from './AnalyticCard/AnalyticCard';
import { getWorklogsAnalytic } from '../../utils/api/routes/analytic/analytic';
import { AnalyticWorklog } from '../../utils/api/routes/analytic/types';
import { DonutItem as ChartDonutItem } from '../../components/Charts/ChartDonut/ChartDonut';

const checkAnalytic = (data: AnalyticInfo): boolean => {
  const { hours, newClients } = data;
  return Boolean(hours && newClients);
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

  const getNewClients = () => {
    getClients({ newest: true, limit: 20, offset: 0 })
      .then((res) => {
        setNewClients(res.data.count);
      })
      .catch(() => {
        setNewClients(0);
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
          setHours(totalTime);
          setAnalyticWorklog(sorted);
        }
      })
      .catch(() => {
        setAnalyticWorklog([]);
        setHours(0);
      });
  };

  useEffect(() => {
    getNewClients();
    getWorkTime();
  }, []);

  const analyticData: AnalyticInfo = useMemo(() => {
    return {
      newClients,
      hours,
    };
  }, [newClients, hours]);

  return {
    worklogData: analyticWorklog || false,
    analytic: checkAnalytic(analyticData)
      ? (analyticData as AnalyticData['analytic'])
      : false,
  };
};
