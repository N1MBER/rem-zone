import { useEffect, useState } from 'react';
import { AnalyticData } from './types';
import { getClients } from '../../utils/api/routes/users/users';

export const useAnalytic = (): AnalyticData => {
  const [newClients, setNewClients] = useState<number | undefined>();

  const getNewClients = () => {
    getClients({ newest: true, limit: 20, offset: 0 }).then((res) => {
      setNewClients(res.data.count);
    });
  };

  useEffect(() => {
    getNewClients();
    console.log(newClients);
  }, []);
  return {
    worklogData: false,
    analytic: false,
  };
};
