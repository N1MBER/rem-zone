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
  convertFunction?: (item: OBJECT) => ITEM;
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
    onChange,
    list,
    queryField,
    loadable,
    getItems,
    value,
    onInputChange,
    getGroupLabel,
    getGroupKey,
    convertFunction,
    ...otherProps
  } = props;

  const [searchText, setSearchText] = useState<string | undefined | null>();
  const [items, setItems] = useState<(ITEM | OBJECT)[]>([]);
  const [loading, setLoading] = useFlag();

  const searchParam = useDebounce(searchText, 500);

  const loadData = () => {
    if (searchParam) {
      setLoading.on();
      getItems?.({
        [queryField]: `${searchParam ?? ''}`,
      } as QUERY)
        .then((res) => {
          if (res.data.results) {
            const arr = res.data.results.map((item) => {
              return convertFunction ? convertFunction(item) : (item as OBJECT);
            });
            setItems(arr);
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
    }
  };

  useEffect(() => {
    loadable && loadData();
  }, [searchParam]);

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
      className={cnCombobox()}
      getGroupLabel={() => ''}
      getItemGroupKey={() => ''}
      getGroupKey={() => ''}
      getItemLabel={getItemLabel ?? deafultGetLabel}
      getItemKey={getItemKey ?? deafultGetKey}
      placeholder={(placeholder ?? label ?? key)?.toString()}
      multiple={multiple}
      size={size}
      items={items}
      isLoading={loading}
      value={value}
      onChange={onChange}
      onInputChange={handleChange}
      {...otherProps}
    />
  );
};
