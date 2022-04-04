import React, { useMemo } from 'react';
import { Radar, RadarProps } from '@consta/charts/Radar';
import { Text } from '@consta/uikit/Text';
import { cn } from '../../../__private__/utils/bem';

import './ChartRadar.scss';

export type RadarItem = {
  name: string;
  type: string;
  color?: string;
  value: number;
};

type Props = {
  items: RadarItem[];
  title?: string;
  style?: React.CSSProperties;
};

const cnChartRadar = cn('ChartRadar');

export const ChartRadar = (props: Props) => {
  const { items, title, style } = props;

  const { colors, types } = useMemo(() => {
    if (!items) return {};
    const colorsItem = items
      .filter((item) => !!item.color)
      .map((item) => item.color)
      .filter((item, index, self) => self.indexOf(item) === index) as string[];
    const typesItem = items
      .map((item) => item.type)
      .filter((item, index, self) => self.indexOf(item) === index) as string[];
    return { colors: colorsItem, types: typesItem };
  }, [items]);

  const radarOptions: RadarProps = {
    data: items,
    xField: 'name',
    yField: 'value',
    seriesField: 'type',
    color: colors,
    legend: false,
    smooth: false,
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
      },
    },
    yAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
      },
    },
    lineStyle: (element: RadarItem) => {
      return {
        stroke: element.color,
      };
    },
    area: {
      style: (element: RadarItem) => {
        return {
          fill: element.color,
        };
      },
    },
    meta: {
      star: {
        min: 0,
        nice: true,
      },
    },
  };

  return (
    <div className={cnChartRadar()}>
      <Text size="xl" lineHeight="m" weight="bold" view="primary">
        {title}
      </Text>
      <div className={cnChartRadar('Content')}>
        <Radar style={style} {...radarOptions} renderer="svg" />
        <div className={cnChartRadar('Legend')}>
          {types && (
            <>
              {[...types].slice(0, 5).map((type, index) => (
                <Text
                  key={cnChartRadar(`Legend-Item-${index}`)}
                  className={cnChartRadar('Legend-Item')}
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
              {types.length > 5 && (
                <Text
                  className={cnChartRadar('Legend-Item')}
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
      </div>
    </div>
  );
};
