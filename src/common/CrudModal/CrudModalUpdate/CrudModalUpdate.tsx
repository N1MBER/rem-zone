import React, { useEffect, useState } from 'react';
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

import './CrudModalUpdate.scss';

type CrudModalUpdateProps<
  LOADABLE extends boolean,
  OBJECT extends Record<string, unknown>,
  TYPE extends Record<string, unknown | undefined>
> = {
  updateFunc: (data: TYPE, id: string) => AxiosPromise<TYPE>;
  items: ItemRecord<TYPE, InputType, LOADABLE, OBJECT>[];
  onClose?: () => void;
  defaultValues?: DefaultValue<TYPE>[];
  successCallback?: (data: unknown) => void;
  errorCallback?: (data: unknown) => void;
  element: TYPE;
  itemId: string;
};

const cnCrudModalUpdate = cn('CrudModalUpdate');

export const CrudModalUpdate = <
  TYPE extends Record<string, unknown | undefined>,
  LOADABLE extends boolean,
  OBJECT extends Record<string, unknown>
>(
  props: CrudModalUpdateProps<LOADABLE, OBJECT, TYPE>
) => {
  const {
    updateFunc,
    items,
    onClose,
    successCallback,
    errorCallback,
    element,
    itemId,
    defaultValues,
  } = props;

  const [data, setData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof TYPE, string>>>({});

  useEffect(() => {
    setData(element as Record<string, unknown>);
  }, [element]);

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
    updateFunc(copyData as unknown as TYPE, itemId)
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
    <div className={cnCrudModalUpdate()}>
      {items.map((item, index) => {
        const {
          key,
          label,
          type,
          list,
          multiple,
          getItemLabel,
          getItemKey,
          explanation,
          icon,
          ...otherProps
        } = item;
        const defaultGetter = () => '';
        if (type === 'email' || type === 'number' || type === 'text') {
          return (
            <TextField
              width="full"
              key={`${cnCrudModalUpdate()}-${index}`}
              label={(label ?? key).toString()}
              placeholder={(label ?? key).toString()}
              size="m"
              leftSide={icon}
              caption={errors[key] ?? undefined}
              status={errors[key] ? 'alert' : undefined}
              rightSide={explanation}
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
              key={`${cnCrudModalUpdate()}-${index}`}
              // @ts-ignore
              items={list ?? []}
              labelPosition="top"
              // @ts-ignore
              getItemLabel={getItemLabel ?? defaultGetter}
              // @ts-ignore
              getItemKey={getItemKey ?? defaultGetter}
              // @ts-ignore
              value={data[key] as TYPE}
              multiple={multiple}
              style={{ zIndex: 10000 }}
              {...otherProps}
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
            caption={errors[key] ?? undefined}
            status={errors[key] ? 'alert' : undefined}
            labelPosition="top"
            style={{ zIndex: 10000 }}
            onChange={({ value }) => handleChange(value, key.toString())}
            value={data[key as string] as DatePickerPropValue<DATE_TYPE>}
          />
        );
      })}
      <div className={cnCrudModalUpdate('Buttons')}>
        <Button label="Обновить" onClick={handleClick} />
        {onClose && <Button label="Отмена" view="ghost" onClick={onClose} />}
      </div>
    </div>
  );
};
