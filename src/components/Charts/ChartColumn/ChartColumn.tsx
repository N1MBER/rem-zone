import React, { useMemo } from 'react';
import { Column } from '@consta/charts/Column';
import { Text } from '@consta/uikit/Text';
import { cn } from '../../../__private__/utils/bem';

import './ChartColumn.scss';

export type Item = {
  name: string;
  value: number;
  group?: number;
  date: string;
};

type ColumnItem = {
  data: Item[];
  color?: string[];
};

type Props = {
  data: ColumnItem;
  title?: string;
  style?: React.CSSProperties;
};

const cnChartColumn = cn('ChartColumn');

export const ChartColumn = (props: Props) => {
  const { data, title, style } = props;

  const { types, colors } = useMemo(() => {
    return {
      types: data.data
        .map((element) => element.name)
        .filter((item, index, self) => self.indexOf(item) === index),
      colors: data.color
        ? (data.color.filter(
            (item, index, self) => self.indexOf(item) === index && !!item
          ) as string[])
        : [],
    };
  }, [data]);

  return (
    <div className={cnChartColumn()}>
      <Text size="xl" lineHeight="m" weight="bold" view="primary">
        {title}
      </Text>
      <div className={cnChartColumn('Content')}>
        <div className={cnChartColumn('Legend')}>
          {types && (
            <>
              {[...types].slice(0, 3).map((type, index) => (
                <Text
                  key={cnChartColumn(`Legend-Item-${index}`)}
                  className={cnChartColumn('Legend-Item')}
                  view="secondary"
                  size="xs"
                  lineHeight="2xs"
                  style={{
                    ['--legend-item-color' as string]:
                      colors[index] ?? '#0071B2',
                  }}
                >
                  {type}
                </Text>
              ))}
              {types.length > 3 && (
                <Text
                  className={cnChartColumn('Legend-Item')}
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
            </>
          )}
        </div>
        <Column
          style={style}
          color={colors}
          legend={false}
          xField="date"
          yField="value"
          seriesField="name"
          isStack
          data={data.data}
          animation={{
            appear: { duration: 500, delay: 0, easing: 'easeLinear' },
            update: { duration: 500, delay: 0, easing: 'easeLinear' },
          }}
          renderer="svg"
        />
      </div>
    </div>
  );
};
