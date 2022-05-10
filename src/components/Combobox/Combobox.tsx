import React, { useEffect, useState } from 'react';
import {
  Combobox as ComboboxComponent,
  ComboboxProps,
} from '@consta/uikit/Combobox';
import { AxiosPromise } from 'axios';
import { cn } from '../../__private__/utils/bem';
import { useDebounce } from '../../hooks/useDebounce/useDebounce';
import { BaseListResponse } from '../../utils/api/types';
import { useFlag } from '@consta/uikit/useFlag';

type DefaultGroup = {
  label: string;
  id: string | number;
};

type DefaultItem = {
  label: string;
  key: string;
  groupId?: string;
  disabled?: boolean;
};

type Props<
  ITEM,
  QUERY extends Record<string, string>,
  MULTIPLE extends boolean = false,
  OBJECT = Record<string, unknown>
> = Omit<ComboboxProps<ITEM, DefaultGroup, MULTIPLE>, 'items'> & {
  loadable?: boolean;
  getItems?: (query: QUERY) => AxiosPromise<BaseListResponse<OBJECT>>;
  queryField: string;
  multiple?: MULTIPLE;
  valueKey?: string;
} & (OBJECT extends Record<string, unknown>
    ? {
        list?: OBJECT[];
        getItemLabel: (item: OBJECT) => string;
        getItemKey: (item: OBJECT) => string;
      }
    : {
        getItemLabel: (item: ITEM) => string;
        getItemKey: (item: ITEM) => string;
        list?: ITEM[];
      });

const cnCombobox = cn('CustomCombobox');

const deafultGetLabel = (item: DefaultItem) => (item ? item?.label ?? '' : '');
const deafultGetKey = (item: DefaultItem) => (item ? item?.key ?? '' : '');

export const Combobox = <
  ITEM,
  QUERY extends Record<string, string> = Record<string, string>,
  MULTIPLE extends boolean = false,
  OBJECT = Record<string, unknown>
>(
  props: Props<ITEM, QUERY, MULTIPLE, OBJECT>
) => {
  const {
    label,
    key,
    multiple,
    placeholder,
    size = 'm',
    getItemLabel,
    getItemKey,
    style,
    onChange,
    list,
    valueKey,
    queryField,
    loadable,
    getItems,
    value,
    className,
    onInputChange,
  } = props;

  const [searchText, setSearchText] = useState<string | undefined | null>();
  const [items, setItems] = useState<(ITEM | OBJECT)[]>([]);
  const [loading, setLoading] = useFlag();
  const [focusable, setFocusable] = useFlag();

  const [current, setCurrent] = useState<ITEM | OBJECT | undefined>();

  useEffect(() => {
    if (value) {
      setCurrent(
        items.find((el) => {
          if (typeof el === 'object') {
            const element = el as Record<string, unknown>;
            return element[valueKey ?? 'id'] === value;
          }
          return el === value;
        })
      );
    } else {
      setCurrent(undefined);
    }
  }, [value]);

  const searchParam = useDebounce(searchText, 500);

  const loadData = () => {
    setLoading.on();
    getItems?.({
      offset: '0',
      limit: '30',
      [queryField]: `${searchParam ?? ''}`,
    } as unknown as QUERY)
      .then((res) => {
        if (res.data.results) {
          setItems(res.data.results);
        } else {
          setItems([]);
        }
      })
      .catch(() => {
        setItems([]);
      })
      .finally(() => {
        setLoading.off();
      });
  };

  useEffect(() => {
    loadable && focusable && loadData();
  }, [searchParam, focusable]);

  useEffect(() => {
    !loadable && list && setItems(list);
  }, [list]);

  const handleChange: Required<ComboboxProps>['onInputChange'] = (props) => {
    onInputChange?.(props);
    setSearchText(props.value);
  };

  return (
    // @ts-ignore
    <ComboboxComponent
      label={(label ?? key)?.toString()}
      labelPosition="top"
      className={cnCombobox(null, [className])}
      getItemLabel={getItemLabel ?? deafultGetLabel}
      getItemKey={getItemKey ?? deafultGetKey}
      placeholder={(placeholder ?? label ?? key)?.toString()}
      multiple={multiple}
      size={size}
      onFocus={setFocusable.toogle}
      style={style ?? { zIndex: 2000 }}
      items={items}
      isLoading={loading}
      value={current}
      onChange={(props) => {
        if (typeof props.value === 'object') {
          onChange?.({
            ...props,
            // @ts-ignore
            value: props.value[valueKey ?? 'id'],
          });
        } else {
          // @ts-ignore
          onChange?.(props);
        }
      }}
      onInputChange={handleChange}
    />
  );
};
