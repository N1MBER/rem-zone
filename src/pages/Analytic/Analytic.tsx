import React from 'react';
import { cn } from '../../__private__/utils/bem';
import { ChartDonut } from '../../components/Charts/ChartDonut/ChartDonut';
import { ChartRadar } from '../../components/Charts/ChartRadar/ChartRadar';
import { radarData } from '../../components/Charts/ChartRadar/__mocks__/mock.data';
import { columnData } from '../../components/Charts/ChartColumn/__mocks__/mock.data';
import { ChartColumn } from '../../components/Charts/ChartColumn/ChartColumn';
import { Card } from '@consta/uikit/Card';
import { AnalyticCard } from './AnalyticCard/AnalyticCard';
import { useAnalytic } from './useAnalytic';
import { SkeletonCard } from '../../common/Skeleton/SkeletonCard/SkeletonCard';

import './Analytic.scss';

const cnAnalytic = cn('Analytic');

const Analytic = () => {
  const { worklogData, analytic } = useAnalytic();

  return (
    <main className={cnAnalytic()}>
      {Array.isArray(worklogData) ? (
        <Card verticalSpace="2xl" horizontalSpace="2xl">
          <ChartDonut
            title="Отработанные часы за месяц"
            items={worklogData}
            style={{ width: 245, height: 245 }}
          />
        </Card>
      ) : (
        <SkeletonCard />
      )}

      {typeof analytic !== 'boolean' ? (
        <AnalyticCard {...analytic} />
      ) : (
        <SkeletonCard />
      )}
      <Card verticalSpace="2xl" horizontalSpace="2xl">
        <ChartRadar
          title="Отработанные часы за месяц"
          items={radarData}
          style={{ width: 337, height: 247 }}
        />
      </Card>
      <Card verticalSpace="2xl" horizontalSpace="2xl">
        <ChartColumn
          data={{
            data: columnData,
            color: ['var(--color-bg-normal)', 'var(--color-bg-success)'],
          }}
          title="Выручка"
          style={{
            width: '100%',
            height: 231,
          }}
        />
      </Card>
    </main>
  );
};

export default Analytic;
