import {
  TimeTableProps,
  TimeTablePropGetItemColor,
  TimeTablePropGetItemCustomer,
  TimeTablePropGetItemAuto,
  TimeTablePropGetItemDate,
  TimeTablePropGetItemExecutor,
  TimeTablePropGetItemLabel,
  TimeTablePropGetItemType,
  TimeTableDefaultItem,
  TimeTablePropGetItemKey,
  Mappers,
} from './types';

const defaultGetItemKey: TimeTablePropGetItemKey<TimeTableDefaultItem> = (
  item
) => item.key;
const defaultGetItemColor: TimeTablePropGetItemColor<TimeTableDefaultItem> = (
  item
) => item.color;
const defaultGetItemExecutor: TimeTablePropGetItemExecutor<
  TimeTableDefaultItem
> = (item) => item.executor;
const defaultGetItemCustomer: TimeTablePropGetItemCustomer<
  TimeTableDefaultItem
> = (item) => item.customer;
const defaultGetItemStartDate: TimeTablePropGetItemDate<
  TimeTableDefaultItem
> = (item) => item.startDate;
const defaultGetItemEndDate: TimeTablePropGetItemDate<TimeTableDefaultItem> = (
  item
) => item.endDate;
const defaultGetItemLabel: TimeTablePropGetItemLabel<TimeTableDefaultItem> = (
  item
) => item.label;
const defaultGetItemAuto: TimeTablePropGetItemAuto<TimeTableDefaultItem> = (
  item
) => item.auto;
const defaultGetItemType: TimeTablePropGetItemType<TimeTableDefaultItem> = (
  item
) => item.type;

export const withDefaultGetters = (props: TimeTableProps) => {
  return {
    ...props,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemColor: props.getItemColor || defaultGetItemColor,
    getItemExecutor: props.getItemExecutor || defaultGetItemExecutor,
    getItemCustomer: props.getItemCustomer || defaultGetItemCustomer,
    getItemType: props.getItemType || defaultGetItemType,
    getItemStartDate: props.getItemStartDate || defaultGetItemStartDate,
    getItemEndDate: props.getItemEndDate || defaultGetItemEndDate,
    getItemAuto: props.getItemAuto || defaultGetItemAuto,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
  };
};

export const getGridTemplateColumns = (length: number, width?: string) =>
  `64px ${Array(length)
    .fill(null)
    .map(() => width ?? '160px')
    .join(' ')}`;

export function getItem<ITEM>(
  item: ITEM,
  props: Required<Mappers<ITEM>>
): TimeTableDefaultItem {
  const {
    getItemKey,
    getItemAuto,
    getItemColor,
    getItemCustomer,
    getItemEndDate,
    getItemExecutor,
    getItemLabel,
    getItemStartDate,
    getItemType,
  } = props;
  return {
    label: getItemLabel(item),
    key: getItemKey(item),
    auto: getItemAuto(item),
    color: getItemColor(item),
    customer: getItemCustomer(item),
    endDate: getItemEndDate(item),
    startDate: getItemStartDate(item),
    executor: getItemExecutor(item),
    type: getItemType(item),
  };
}
