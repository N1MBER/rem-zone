import React from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '../../../__private__/utils/bem';

import './TimeTableRow.scss';

export const cnTimeTableRow = cn('TimeTableRow');

type Props = {
  label: string;
  refs: React.Ref<HTMLDivElement>[];
  className?: string;
  columns: number;
  hoveredIndex?: number;
  isLast?: boolean;
  onElementHover?: (params: { index: number; flag: boolean }) => void;
};

export const TimeTableRow = (props: Props) => {
  const {
    label,
    refs = [],
    hoveredIndex,
    className,
    columns,
    isLast,
    onElementHover,
  } = props;

  return (
    <div className={cnTimeTableRow({ last: isLast }, [className])}>
      <div className={cnTimeTableRow('Time')}>
        <Text align="right" size="s" lineHeight="s" view="ghost">
          {label}
        </Text>
      </div>
      {Array(columns)
        .fill(null)
        .map((_item, index) => (
          <div
            onMouseEnter={() => onElementHover?.({ index, flag: true })}
            onMouseLeave={() => onElementHover?.({ index, flag: false })}
            key={cnTimeTableRow(`Item-${index}`)}
            ref={refs[index]}
            className={cnTimeTableRow('Item', {
              hovered: hoveredIndex === index,
            })}
          />
        ))}
    </div>
  );
};
