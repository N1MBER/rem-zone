import React, { useState, useEffect } from 'react';
import { AxiosPromise } from 'axios';
import { ItemRecord, InputType, DefaultValue } from '../types';
import { cn } from '../../../__private__/utils/bem';
import { Button } from '@consta/uikit/Button';
import { TextField, TextFieldPropValue } from '@consta/uikit/TextField';
import { Combobox } from '../../../components/Combobox/Combobox';
import {
  DatePicker,
  DatePickerPropValue,
} from '@consta/uikit/DatePickerCanary';
import { convertError } from '../helper';

import './CrudModalCreate.scss';

type CrudModalCreateProps<
  LOADABLE extends boolean,
  OBJECT extends Record<string, unknown>,
  TYPE extends Record<string, unknown | undefined>
> = {
  createFunc: (data: TYPE) => AxiosPromise<TYPE>;
  items: ItemRecord<TYPE, InputType, LOADABLE, OBJECT>[];
  defaultValues?: DefaultValue<TYPE>[];
  onClose?: () => void;
  successCallback?: (data: unknown) => void;
  errorCallback?: (data: unknown) => void;
};

const cnCrudModalCreate = cn('CrudModalCreate');

export const CrudModalCreate = <
  TYPE extends Record<string, unknown | undefined>,
  LOADABLE extends boolean,
  OBJECT extends Record<string, unknown>
>(
  props: CrudModalCreateProps<LOADABLE, OBJECT, TYPE>
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
  const [errors, setErrors] = useState<Partial<Record<keyof TYPE, string>>>({});

  const handleClick = () => {
    const copyData = { ...data };
    items.forEach((item) => {
      if (item.valueKey) {
        copyData[item.key.toString()] = (
          copyData[item.key.toString()] as Record<string, unknown>
        )?.[item.valueKey];
      }
      if (item.renderValue) {
        copyData[item.key.toString()] = item.renderValue(
          copyData as unknown as TYPE
        );
      }
    });
    setErrors({});
    createFunc(copyData as unknown as TYPE)
      .then((res) => {
        if (Math.round(res.status / 100) === 2) {
          successCallback?.(res.data);
          onClose?.();
        } else {
          setErrors(convertError<TYPE>(res.data));
          errorCallback?.(res.data);
        }
      })
      .catch((e) => {
        setErrors(convertError<TYPE>(e.data));
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
        const {
          key,
          label,
          type,
          list,
          multiple,
          getItemLabel,
          getItemKey,
          ...otherProps
        } = item;
        const defaultGetter = () => '';
        if (type === 'email' || type === 'number' || type === 'text') {
          return (
            <TextField
              width="full"
              key={`${cnCrudModalCreate()}-${index}`}
              label={(label ?? key).toString()}
              placeholder={(label ?? key).toString()}
              size="m"
              caption={errors[key] ?? undefined}
              status={errors[key] ? 'alert' : undefined}
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
              caption={errors[key] ?? undefined}
              status={errors[key] ? 'alert' : undefined}
              key={`${cnCrudModalCreate()}-${index}`}
              // @ts-ignore
              items={list ?? []}
              // @ts-ignore
              getItemLabel={getItemLabel ?? defaultGetter}
              // @ts-ignore
              getItemKey={getItemKey ?? defaultGetter}
              // @ts-ignore
              value={data[key] as TYPE}
              multiple={multiple}
              {...otherProps}
              style={{ zIndex: 10000 }}
              onChange={({ value }) => handleChange(value, key.toString())}
            />
          );
        }
        type DATE_TYPE = typeof type;
        return (
          <DatePicker
            type={type}
            caption={errors[key] ?? undefined}
            status={errors[key] ? 'alert' : undefined}
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
