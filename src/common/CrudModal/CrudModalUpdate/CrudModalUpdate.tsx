import React, { useEffect, useState } from 'react';
import { AxiosPromise } from 'axios';
import { ItemRecord, InputType } from '../types';
import { cn } from '../../../__private__/utils/bem';
import { Button } from '@consta/uikit/Button';
import { TextField, TextFieldPropValue } from '@consta/uikit/TextField';
import { Combobox } from '@consta/uikit/Combobox';
import {
  DatePicker,
  DatePickerPropValue,
} from '@consta/uikit/DatePickerCanary';

import './CrudModalUpdate.scss';

type CrudModalUpdateProps<TYPE = Record<string, unknown | undefined>> = {
  updateFunc: (data: TYPE, id: string) => AxiosPromise<TYPE>;
  items: ItemRecord<TYPE, InputType>[];
  onClose?: () => void;
  successCallback?: (data: unknown) => void;
  errorCallback?: (data: unknown) => void;
  element: TYPE;
  itemId: string;
};

const cnCrudModalUpdate = cn('CrudModalUpdate');

export const CrudModalUpdate = <TYPE,>(props: CrudModalUpdateProps<TYPE>) => {
  const {
    updateFunc,
    items,
    onClose,
    successCallback,
    errorCallback,
    element,
    itemId,
  } = props;

  const [data, setData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setData(element as Record<string, unknown>);
  }, [element]);

  const handleClick = () => {
    updateFunc(data as TYPE, itemId)
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

  const handleChange = (value: unknown, key: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  return (
    <div className={cnCrudModalUpdate()}>
      {items.map((item, index) => {
        const { key, label, type, list, multiple, getItemLabel, getItemKey } =
          item;
        const defaultGetter = () => '';
        if (type === 'email' || type === 'number' || type === 'text') {
          return (
            <TextField
              width="full"
              key={`${cnCrudModalUpdate()}-${index}`}
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
              key={`${cnCrudModalUpdate()}-${index}`}
              items={list ?? []}
              labelPosition="top"
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
            key={`${cnCrudModalUpdate()}-${index}`}
            label={(label ?? key).toString()}
            placeholder={(label ?? key).toString()}
            size="m"
            style={{ zIndex: 10000 }}
            onChange={({ value }) => handleChange(value, key.toString())}
            value={data[key as string] as DatePickerPropValue<DATE_TYPE>}
          />
        );
      })}
      <div className={cnCrudModalUpdate('Buttons')}>
        <Button label="Создать" onClick={handleClick} />
        {onClose && <Button label="Отмена" view="ghost" onClick={onClose} />}
      </div>
    </div>
  );
};
