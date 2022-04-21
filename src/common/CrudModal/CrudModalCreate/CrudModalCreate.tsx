import React, { useState } from 'react';
import { AxiosPromise } from 'axios';
import { ItemRecord, InputType } from '../types';
import { cn } from '../../../__private__/utils/bem';
import { Button } from '@consta/uikit/Button';
import { TextField, TextFieldPropValue } from '@consta/uikit/TextField';
import { Combobox } from '@consta/uikit/Combobox';

import './CrudModalCreate.scss';

type CrudModalCreateProps<TYPE = Record<string, unknown | undefined>> = {
  createFunc: (data: TYPE) => AxiosPromise<TYPE>;
  items: ItemRecord<TYPE, InputType>[];
  onClose?: () => void;
  successCallback?: (data: unknown) => void;
  errorCallback?: (data: unknown) => void;
};

const cnCrudModalCreate = cn('CrudModalCreate');

export const CrudModalCreate = <TYPE,>(props: CrudModalCreateProps<TYPE>) => {
  const { createFunc, items, onClose, successCallback, errorCallback } = props;
  const [data, setData] = useState<Record<string, unknown>>({});

  const handleClick = () => {
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
        if (type === 'email' || type === 'number' || type === 'select') {
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
      })}
      <div className={cnCrudModalCreate('Buttons')}>
        <Button label="Создать" onClick={handleClick} />
        {onClose && <Button label="Отмена" view="ghost" onClick={onClose} />}
      </div>
    </div>
  );
};
