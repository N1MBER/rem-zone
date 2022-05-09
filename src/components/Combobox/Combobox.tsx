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

type Props<ITEM = DefaultItem, MULTIPLE extends boolean = false> = Omit<
  ComboboxProps<ITEM, DefaultGroup, MULTIPLE>,
  'items'
> & {
  loadable?: boolean;
  getItems?: (
    query: Record<string, string>
  ) => AxiosPromise<BaseListResponse<Record<string, unknown>>>;
  queryField: string;
  getItemLabel: (item: ITEM) => string;
  getItemKey: (item: ITEM) => string;
  multiple?: MULTIPLE;
  list?: ITEM[];
  convertFunction?: (item: Record<string, unknown>) => ITEM;
};

const cnCombobox = cn('CustomCombobox');

const deafultGetLabel = (item: DefaultItem) => (item ? item?.label ?? '' : '');
const deafultGetKey = (item: DefaultItem) => (item ? item?.key ?? '' : '');

export const Combobox = <ITEM, MULTIPLE extends boolean = false>(
  props: Props<ITEM, MULTIPLE>
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
  const [items, setItems] = useState<ITEM[]>([]);
  const [loading, setLoading] = useFlag();

  const searchParam = useDebounce(searchText, 500);

  const loadData = () => {
    if (searchParam) {
      setLoading.on();
      getItems?.({
        [queryField]: `${searchParam ?? ''}`,
      })
        .then((res) => {
          if (res.data.results) {
            const arr = res.data.results.map((item) => {
              return convertFunction ? convertFunction(item) : (item as ITEM);
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
