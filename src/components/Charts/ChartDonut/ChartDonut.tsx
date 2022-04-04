import React, { useMemo } from 'react';
import { Pie } from '@consta/charts/Pie';
import { useThemeVars } from '@consta/uikit/useThemeVars';
import { Text } from '@consta/uikit/Text';
import { cn } from '../../../__private__/utils/bem';

import './ChartDonut.scss';

export type DonutItem = {
  type: string;
  value: number;
  color?: string;
};

type Props = {
  title?: string;
  items: DonutItem[];
  style?: React.CSSProperties;
};

const cnChartDonut = cn('ChartDonut');

export const ChartDonut = (props: Props) => {
  const { title, items, style } = props;
  const vars = useThemeVars();

  const colors = useMemo(() => {
    return items
      .filter((item) => !!item.color)
      .map((item) => item.color) as string[];
  }, [items]);

  return (
    <div className={cnChartDonut()}>
      <Text size="xl" lineHeight="m" weight="bold" view="primary">
        {title}
      </Text>
      <div className={cnChartDonut('Content')}>
        <Pie
          data={items}
          style={style}
          angleField="value"
          colorField="type"
          color={colors}
          renderer="svg"
          label={{
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
              textAlign: 'center',
              fontSize: 14,
            },
          }}
          statistic={{
            title: {
              formatter: (v) => v?.type || 'Всего',
              style: {
                color: vars.color.primary['--color-typo-primary'],
              },
            },
            content: {
              style: {
                color: vars.color.primary['--color-typo-primary'],
              },
            },
          }}
          legend={false}
          innerRadius={0.64}
          radius={1}
        />
        <div className={cnChartDonut('Legend')}>
          {[...items].slice(0, 5).map((item, index) => (
            <Text
              key={cnChartDonut(`Legend-Item-${index}`)}
              className={cnChartDonut('Legend-Item')}
              view="secondary"
              size="xs"
              lineHeight="2xs"
              style={{
                ['--legend-item-color' as string]: item.color ?? '#0071B2',
              }}
            >
              {item.type}
            </Text>
          ))}
          {items.length > 5 && (
            <Text
              className={cnChartDonut('Legend-Item')}
              view="secondary"
              size="xs"
              lineHeight="2xs"
              style={{
                ['--legend-item-color' as string]: 'var(--color-bg-system)',
              }}
            >
              Другие
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};
