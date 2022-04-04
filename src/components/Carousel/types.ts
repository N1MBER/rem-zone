import { PropsWithHTMLAttributes } from '@consta/uikit/__internal__/src/utils/types/PropsWithHTMLAttributes';
import React from 'react';

export type CarouselDefaultItem = {
  key: string;
  src?: string;
  label?: string;
  onClick?: (item: CarouselDefaultItem) => void;
};

export type CarouselPropGetItemKey<ITEM> = (
  item: ITEM
) => CarouselDefaultItem['key'];
export type CarouselPropGetItemSrc<ITEM> = (
  item: ITEM
) => CarouselDefaultItem['src'];
export type CarouselPropGetItemLabel<ITEM> = (
  item: ITEM
) => CarouselDefaultItem['label'];
export type CarouselPropGetItemOnClick<ITEM> = (
  item: ITEM
) => CarouselDefaultItem['onClick'];

export type Mappers<ITEM> = {
  getItemKey?: CarouselPropGetItemKey<ITEM>;
  getItemSrc?: CarouselPropGetItemSrc<ITEM>;
  getItemLabel?: CarouselPropGetItemLabel<ITEM>;
  getItemOnClick?: CarouselPropGetItemOnClick<ITEM>;
};

export type CarouselProps<ITEM = CarouselDefaultItem> = PropsWithHTMLAttributes<
  {
    items: ITEM[];
    renderItem?: (item: ITEM) => React.ReactElement | null;
    onItemClick?: (params: { e: React.MouseEvent; item: ITEM }) => void;
    emptyItemsText?: string;
  } & Mappers<ITEM>,
  HTMLDivElement
> &
  (ITEM extends { key: CarouselDefaultItem['key'] }
    ? {
        getItemKey?: CarouselPropGetItemKey<ITEM>;
      }
    : {
        getItemKey: CarouselPropGetItemKey<ITEM>;
      });

export type CarouselComponent = <ITEM = CarouselDefaultItem>(
  props: CarouselProps<ITEM>
) => React.ReactElement | null;

export type GetItemsParams<ITEM> = {
  items: ITEM[];
  activeKey: string;
  getItemKey: CarouselPropGetItemKey<ITEM>;
};
