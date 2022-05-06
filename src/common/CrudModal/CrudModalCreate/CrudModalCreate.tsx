import React, { useState, useEffect } from 'react';
import { AxiosPromise } from 'axios';
import { ItemRecord, InputType, DefaultValue } from '../types';
import { cn } from '../../../__private__/utils/bem';
import { Button } from '@consta/uikit/Button';
import { TextField, TextFieldPropValue } from '@consta/uikit/TextField';
import { Combobox } from '@consta/uikit/Combobox';
import {
  DatePicker,
  DatePickerPropValue,
} from '@consta/uikit/DatePickerCanary';

import './CrudModalCreate.scss';

type CrudModalCreateProps<
  LOADABLE extends boolean,
  TYPE = Record<string, unknown | undefined>
> = {
  createFunc: (data: TYPE) => AxiosPromise<TYPE>;
  items: ItemRecord<TYPE, InputType, LOADABLE>[];
  defaultValues?: DefaultValue<TYPE>[];
  onClose?: () => void;
  successCallback?: (data: unknown) => void;
  errorCallback?: (data: unknown) => void;
};

const cnCrudModalCreate = cn('CrudModalCreate');

export const CrudModalCreate = <TYPE, LOADABLE extends boolean>(
  props: CrudModalCreateProps<LOADABLE, TYPE>
) => {
  const {
    createFunc,
    defaultValues,
    items,
    onClose,
    successCallback,
    errorCallback,
  } = props;
  const [data, setData] = useState<Record<string, unknown>>({});

  const handleClick = () => {
    const copyData = { ...data };
    items.forEach((item) => {
      if (item.valueKey) {
        copyData[item.key.toString()] = (
          copyData[item.key.toString()] as Record<string, unknown>
        )?.[item.valueKey];
      }
    });
    createFunc(data as TYPE)
      .then((res) => {
        if (Math.round(res.status / 100) === 2) {
          successCallback?.(res.data);
          onClose?.();
        } else {
          errorCallback?.(res.data);
        }
      })
      .catch((e) => {
        errorCallback?.(e);
      });
  };

  useEffect(() => {
    const obj: Record<string, unknown> = {};
    if (defaultValues) {
      defaultValues.forEach((item) => {
        obj[item.key as string] = item.value;
      });
      setData({ ...data, ...obj });
    }
  }, [defaultValues]);

  const handleChange = (value: unknown, key: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  return (
    <div className={cnCrudModalCreate()}>
      {items.map((item, index) => {
        const { key, label, type, list, multiple, getItemLabel, getItemKey } =
          item;
        const defaultGetter = () => '';
        if (type === 'email' || type === 'number' || type === 'text') {
          return (
            <TextField
              width="full"
              key={`${cnCrudModalCreate()}-${index}`}
              label={(label ?? key).toString()}
              placeholder={(label ?? key).toString()}
              size="m"
              value={data[key as string] as TextFieldPropValue}
              type={type}
              onChange={({ value }) => handleChange(value, key.toString())}
            />
          );
        }
        if (type === 'select') {
          return (
            // @ts-ignore
            <Combobox
              label={(label ?? key).toString()}
              placeholder={(label ?? key).toString()}
              size="m"
              key={`${cnCrudModalCreate()}-${index}`}
              items={list ?? []}
              getItemLabel={getItemLabel ?? defaultGetter}
              getItemKey={getItemKey ?? defaultGetter}
              // @ts-ignore
              value={data[key] as TYPE}
              multiple={multiple}
              style={{ zIndex: 10000 }}
              onChange={({ value }) => handleChange(value, key.toString())}
            />
          );
        }
        type DATE_TYPE = typeof type;
        return (
          <DatePicker
            type={type}
            key={`${cnCrudModalCreate()}-${index}`}
            label={(label ?? key).toString()}
            placeholder={(label ?? key).toString()}
            size="m"
            labelPosition="top"
            style={{ zIndex: 10000 }}
            onChange={({ value }) => handleChange(value, key.toString())}
            value={data[key as string] as DatePickerPropValue<DATE_TYPE>}
          />
        );
      })}
      <div className={cnCrudModalCreate('Buttons')}>
        <Button label="Создать" onClick={handleClick} />
        {onClose && <Button label="Отмена" view="ghost" onClick={onClose} />}
      </div>
    </div>
  );
};
