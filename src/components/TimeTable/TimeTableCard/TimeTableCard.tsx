import React, { useEffect, useRef, useState } from 'react';
import { timeTablePropColorDefault, TimeTableCardProps } from '../types';
import { Text } from '@consta/uikit/Text';
import { IconInfo } from '@consta/uikit/IconInfo';
import { cn } from '../../../__private__/utils/bem';

import './TimeTableCard.scss';
import { ResultSize } from '../useTimeTable/useTimeTable';

const cnTimeTableCard = cn('TimeTableCard');

export const TimeTableCard = (props: TimeTableCardProps) => {
  const {
    executor,
    customer,
    auto,
    type,
    color = timeTablePropColorDefault,
    label,
    offsetY,
    offsetX,
    startTimeRef,
    endTimeRef,
    getCardPosition,
    onCardInfoClick,
  } = props;

  const cardRef = useRef<HTMLDivElement>(null);

  const [sizes, setSizes] = useState<ResultSize>(
    getCardPosition({ startTimeRef, endTimeRef, offsetY, offsetX })
  );

  useEffect(() => {
    setSizes(getCardPosition({ startTimeRef, endTimeRef, offsetY, offsetX }));
  }, [startTimeRef, endTimeRef]);

  return (
    <div
      ref={cardRef}
      style={{
        ['--time-table-card-color' as string]: `var(--color-bg-${color})`,
        ...sizes,
      }}
      className={cnTimeTableCard()}
    >
      <Text size="s" lineHeight="s">
        {type === 'service' ? `${auto?.brand} ${customer.name}` : label}
      </Text>
      {type === 'service' && (
        <>
          <Text size="xs" lineHeight="s">
            Исполнитель:
          </Text>
          <Text size="xs" lineHeight="s" weight="bold">
            {executor.name}
          </Text>
        </>
      )}
      <button
        className={cnTimeTableCard('Button')}
        type="button"
        onClick={onCardInfoClick}
      >
        <IconInfo size="xs" />
      </button>
    </div>
  );
};
