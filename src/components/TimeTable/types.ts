import { User } from '../../types/user';
import { Auto } from '../../types/auto';
import {
  PropsWithHTMLAttributes,
  PropsWithHTMLAttributesAndRef,
} from '../../__private__/utils/types/PropsWithHTMLAttributes';
import React from 'react';
import { ViewMode } from '../../types/timetable';
import { GetCardPosition } from './useTimeTable/useTimeTable';

export const timeTablePropColor = [
  'brand',
  'success',
  'alert',
  'warning',
  'caution',
  'normal',
] as const;
export type TimeTablePropColor = typeof timeTablePropColor[number];
export const timeTablePropColorDefault: TimeTablePropColor =
  timeTablePropColor[0];

export type TimeTablePropItemType = 'service' | 'order';

export type TimeTablePropGetItemKey<ITEM> = (item: ITEM) => string;
export type TimeTablePropGetItemExecutor<ITEM> = (item: ITEM) => User;
export type TimeTablePropGetItemColor<ITEM> = (
  item: ITEM
) => TimeTablePropColor | undefined;
export type TimeTablePropGetItemCustomer<ITEM> = (item: ITEM) => User;
export type TimeTablePropGetItemType<ITEM> = (
  item: ITEM
) => TimeTablePropItemType;
export type TimeTablePropGetItemDate<ITEM> = (item: ITEM) => Date;
export type TimeTablePropGetItemAuto<ITEM> = (item: ITEM) => Auto | undefined;
export type TimeTablePropGetItemLabel<ITEM> = (
  item: ITEM
) => string | undefined;

export type TimeTableDefaultItem = {
  key: string;
  executor: User;
  color?: TimeTablePropColor;
  customer: User;
  type: TimeTablePropItemType;
  startDate: Date;
  endDate: Date;
  auto?: Auto;
  label?: string;
};

export type Mappers<ITEM> = {
  getItemKey?: TimeTablePropGetItemKey<ITEM>;
  getItemColor?: TimeTablePropGetItemColor<ITEM>;
  getItemExecutor?: TimeTablePropGetItemExecutor<ITEM>;
  getItemCustomer?: TimeTablePropGetItemCustomer<ITEM>;
  getItemType?: TimeTablePropGetItemType<ITEM>;
  getItemStartDate?: TimeTablePropGetItemDate<ITEM>;
  getItemEndDate?: TimeTablePropGetItemDate<ITEM>;
  getItemAuto?: TimeTablePropGetItemAuto<ITEM>;
  getItemLabel?: TimeTablePropGetItemLabel<ITEM>;
};

export type TimeTableProps<
  ITEM = TimeTableDefaultItem,
  TYPE = ViewMode
> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    children?: never;
    type: TYPE;
    date?: Date;
    containerRef?: React.RefObject<HTMLElement>;
    onItemClick?: (params: { e: React.MouseEvent; item: ITEM }) => void;
  },
  HTMLDivElement
> &
  Mappers<ITEM>;

export type TimeTableCardProps = PropsWithHTMLAttributes<
  TimeTableDefaultItem & {
    startTimeRef?: React.RefObject<HTMLDivElement>;
    endTimeRef?: React.RefObject<HTMLDivElement>;
    offsetX?: number;
    offsetY?: number;
    getCardPosition: GetCardPosition;
    onCardInfoClick?: React.MouseEventHandler;
  },
  HTMLDivElement
>;

export type TimeTableComponent = <ITEM = TimeTableDefaultItem, TYPE = ViewMode>(
  props: TimeTableProps<ITEM, TYPE>,
  ref: React.Ref<HTMLDivElement>
) => React.ReactElement | null;
