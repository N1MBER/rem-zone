import React, { useCallback, useMemo } from 'react';
import { useRefs } from '@consta/uikit/useRefs';
import moment from 'moment';
import { TimeTableDefaultItem, TimeTablePropGetItemDate } from '../types';
import { ViewMode } from '../../../types/timetable';
import { getWeekday, compareDates, getWeek } from '../../../utils/date/date';

type UseTimeTableParams<ITEM, TYPE> = {
  mode: TYPE;
  items?: ITEM[];
  targetDate?: Date;
  minTime?: number;
  maxTime?: number;
  getItemStartDate: TimeTablePropGetItemDate<ITEM>;
  getItemEndDate: TimeTablePropGetItemDate<ITEM>;
};

export type TitleItem<TYPE> = TYPE extends 'week'
  ? {
      weekDay: string;
      day: string;
    }
  : {
      name: string;
    };

type RefElements = {
  startTimeRef: React.RefObject<HTMLDivElement>;
  endTimeRef: React.RefObject<HTMLDivElement>;
};

type GetCardPositionProps = {
  startTimeRef?: React.RefObject<HTMLDivElement>;
  endTimeRef?: React.RefObject<HTMLDivElement>;
  offsetX?: number;
  offsetY?: number;
};

export type GetCardPosition = (params: GetCardPositionProps) => ResultSize;

type UseTimeTableResult<ITEM, TYPE> = {
  refs: TimeTableRefs;
  titleItems: TitleItem<TYPE>[];
  columns: number;
  sortedItems: ITEM[];
  times: string[];
  getRefsForItem: (item: ITEM) => RefElements;
  getCardPosition: GetCardPosition;
};

export type TimeTableRefs = Record<string, React.Ref<HTMLDivElement>[]>;

export type ResultSize = {
  top: number;
  left: number;
  height: number;
  width: number;
};

const getValidHour = (hour: number, min: number, max: number) => {
  if (hour > max) {
    return max;
  }
  if (hour < min) {
    return min;
  }
  return hour;
};

export function useTimeTable<
  ITEM extends TimeTableDefaultItem,
  TYPE extends ViewMode
>(props: UseTimeTableParams<ITEM, TYPE>): UseTimeTableResult<ITEM, TYPE> {
  const {
    mode,
    items = [],
    targetDate = new Date(),
    minTime = 8,
    maxTime = 18,

    getItemEndDate,
    getItemStartDate,
  } = props;

  const min = maxTime > minTime ? minTime : maxTime;
  const max = maxTime > minTime ? maxTime : minTime;
  const executors = useMemo(() => {
    const users = items
      .map((item) => item.executor.name)
      .filter((item, index, self) => self.indexOf(item) === index);
    return users;
  }, [items]);

  const lengthForExecutors = executors.length > 7 ? executors.length : 4;
  const columnsCount: number = mode === 'week' ? 7 : lengthForExecutors;
  const hoursCount: number = max - min + 1;

  const itemRefs = useRefs<HTMLDivElement>(columnsCount * hoursCount);

  const refs = useMemo(() => {
    const refsArray: TimeTableRefs = {};
    for (let i = 0; i <= hoursCount; i++) {
      refsArray[`${minTime + i}:00`] = [...itemRefs].slice(
        i * 7,
        i * 7 + columnsCount
      );
    }
    return refsArray;
  }, [columnsCount, hoursCount]);

  const times = Array(hoursCount)
    .fill(minTime)
    .map((time, index) => `${time + index}:00`);

  const titleItems = useMemo(() => {
    const array: TitleItem<TYPE>[] = [];
    if (mode === 'week') {
      const { startWeek, endWeek } = getWeek({
        date: targetDate,
        dateMode: false,
      });
      let day = startWeek;
      while (day <= endWeek) {
        array.push({
          weekDay: getWeekday(day.toDate().getDay()),
          day: moment(day.toDate()).locale('ru').format('DD MMMM'),
        } as TitleItem<TYPE>);
        day = day.clone().add(1, 'd');
      }
    } else {
      executors.forEach((user) => {
        array.push({
          name: user,
        } as TitleItem<TYPE>);
      });
    }
    if (mode === 'day' && executors.length < columnsCount) {
      for (let i = executors.length; i < columnsCount; i++) {
        array.push({
          name: '',
        } as TitleItem<TYPE>);
      }
    }
    return array;
  }, [targetDate, mode, items, executors]);

  const sortedItems = useMemo(() => {
    if (mode === 'day') {
      return items.filter(
        (item) =>
          compareDates(getItemStartDate(item), targetDate) ||
          compareDates(getItemEndDate(item), targetDate)
      );
    }
    const startOfWeek = moment(targetDate).startOf('week').toDate();
    const endOfWeek = moment(targetDate).endOf('week').toDate();
    return items.filter(
      (item) =>
        startOfWeek < getItemStartDate(item) && endOfWeek > getItemEndDate(item)
    );
  }, [mode, targetDate, items]);

  const getRefsForItem = useCallback(
    (item: ITEM) => {
      const startTimeHours = getItemStartDate(item).getHours();
      const endTimeHours = getItemEndDate(item).getHours();
      const startTime = getValidHour(startTimeHours, min, max);
      const endTime = getValidHour(endTimeHours, min, max) - 1;
      if (mode === 'week') {
        const weekdayStart = getItemStartDate(item).getDay();
        const weekdayEnd = getItemEndDate(item).getDay();
        return {
          startTimeRef: refs[`${startTime}:00`]?.[weekdayStart - 1],
          endTimeRef: refs[`${endTime}:00`]?.[weekdayEnd - 1],
        } as RefElements;
      }
      const index = executors.indexOf(
        executors.find((user) => user === item.executor.name) ?? executors[0]
      );
      return {
        startTimeRef: refs[`${startTime}:00`]?.[index],
        endTimeRef: refs[`${endTime}:00`]?.[index],
      } as RefElements;
    },
    [refs, sortedItems, mode, min, max]
  );

  const getPosition = (ref?: React.RefObject<HTMLElement>): ResultSize => {
    return {
      left: ref?.current?.offsetLeft ?? 0,
      top: ref?.current?.offsetTop ?? 0,
      width: ref?.current?.offsetWidth ?? 0,
      height: ref?.current?.offsetHeight ?? 0,
    };
  };

  const getCardPosition: GetCardPosition = (
    params: GetCardPositionProps
  ): ResultSize => {
    const { startTimeRef, endTimeRef, offsetX = 0, offsetY = 0 } = params;
    if (startTimeRef?.current && endTimeRef?.current) {
      const startData = getPosition(startTimeRef);
      const endData = getPosition(endTimeRef);
      return {
        top: startData.top + offsetY,
        left: startData.left + offsetX,
        height: endData.top + endData.height - startData.top - 2 * offsetY,
        width: startData.width - 2 * offsetX,
      };
    }
    return {
      top: 0,
      left: 0,
      height: 0,
      width: 0,
    };
  };

  return {
    refs,
    titleItems,
    columns: columnsCount,
    times,
    sortedItems,
    getRefsForItem,
    getCardPosition,
  };
}
