import {
  CarouselDefaultItem,
  CarouselPropGetItemKey,
  CarouselPropGetItemSrc,
  CarouselPropGetItemOnClick,
  CarouselPropGetItemLabel,
  CarouselProps,
  GetItemsParams,
} from './types';

const defaultGetItemKey: CarouselPropGetItemKey<CarouselDefaultItem> = (item) =>
  item.key;
const defaultGetItemLabel: CarouselPropGetItemLabel<CarouselDefaultItem> = (
  item
) => item.label;
const defaultGetItemSrc: CarouselPropGetItemSrc<CarouselDefaultItem> = (item) =>
  item.src;
const defaultGetItemOnClick: CarouselPropGetItemOnClick<CarouselDefaultItem> = (
  item
) => item.onClick;

export const withDefaultGetters = (props: CarouselProps) => {
  return {
    ...props,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemSrc: props.getItemSrc || defaultGetItemSrc,
    getItemOnClick: props.getItemOnClick || defaultGetItemOnClick,
  };
};

export const getItems = <ITEM>(
  props: GetItemsParams<ITEM>
): [ITEM, ITEM, ITEM] | [ITEM] => {
  const { items, getItemKey, activeKey } = props;
  const currentItem =
    items.find((item) => getItemKey(item) === activeKey) ?? items[0];
  const index = items.indexOf(currentItem);
  if (items.length > 2) {
    if (index === items.length - 1) {
      return [items[index - 1], items[index], items[0]];
    }
    if (index === 0) {
      return [items[items.length - 1], items[index], items[1]];
    }
    return [items[index - 1], items[index], items[index + 1]];
  }
  if (items.length === 1) {
    return [items[0]];
  }
  if (index === 0) {
    return [items[1], items[0], items[1]];
  }
  return [items[0], items[1], items[0]];
};
