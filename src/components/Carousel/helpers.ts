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
):
  | [CarouselDefaultItem, CarouselDefaultItem, CarouselDefaultItem]
  | [CarouselDefaultItem] => {
  const {
    items,
    getItemKey,
    getItemLabel,
    getItemOnClick,
    getItemSrc,
    activeKey,
  } = props;
  const currentItem =
    items.find((item) => getItemKey(item) === activeKey) ?? items[0];
  const index = items.indexOf(currentItem);
  const validItems: CarouselDefaultItem[] = items.map((item) => {
    return {
      label: getItemLabel(item),
      src: getItemSrc(item),
      key: getItemKey(item),
      onClick: () => getItemOnClick(item)?.(item),
    };
  });
  if (validItems.length > 2) {
    if (index === validItems.length - 1) {
      return [validItems[index - 1], validItems[index], validItems[0]];
    }
    if (index === 0) {
      return [validItems[items.length - 1], validItems[index], validItems[1]];
    }
    return [validItems[index - 1], validItems[index], validItems[index + 1]];
  }
  if (validItems.length === 1) {
    return [validItems[0]];
  }
  if (index === 0) {
    return [validItems[1], validItems[0], validItems[1]];
  }
  return [validItems[0], validItems[1], validItems[0]];
};
