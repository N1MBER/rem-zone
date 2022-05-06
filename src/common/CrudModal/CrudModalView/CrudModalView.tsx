import React, { useState, useEffect } from 'react';
import { AxiosPromise } from 'axios';
import { ItemRecord, InputType } from '../types';
import { useFlag } from '@consta/uikit/useFlag';
import { Text } from '@consta/uikit/Text';
import { Loader } from '@consta/uikit/Loader';
import { cn } from '../../../__private__/utils/bem';

import './CrudModalView.scss';

type CrudModalViewProps<LOADABLE, TYPE> = {
  viewFunc: (id: string) => AxiosPromise<TYPE>;
  items: ItemRecord<TYPE, InputType, LOADABLE>[];
  itemId: string;
  successCallback?: (data: unknown) => void;
  errorCallback?: (data: unknown) => void;
};

const cnCrudModalView = cn('CrudModalView');

export const CrudModalView = <TYPE, LOADABLE>(
  props: CrudModalViewProps<LOADABLE, TYPE>
) => {
  const { viewFunc, items, itemId, successCallback, errorCallback } = props;

  const [loading, setLoading] = useFlag();
  const [object, setObject] = useState<TYPE | undefined>();

  useEffect(() => {
    setLoading.on();
    viewFunc(itemId)
      .then((res) => {
        setLoading.off();
        successCallback?.(res.data);
        setObject(res.data);
      })
      .catch((e) => {
        setLoading.off();
        errorCallback?.(e);
      })
      .finally(() => {
        setLoading.off();
      });
  }, [itemId]);

  if (loading)
    return (
      <div className={cnCrudModalView({ loading: true })}>
        <Loader size="s" />
      </div>
    );

  return (
    <div className={cnCrudModalView()}>
      {object ? (
        <>
          {items.map((item) => {
            const value = item.renderValue?.(object) ?? object[item.key];
            return (
              <Text
                size="m"
                key={`${cnCrudModalView()}-${item.key.toString()}`}
              >
                <b>{item.label ?? item.key}:</b> {value}
              </Text>
            );
          })}
        </>
      ) : (
        <Text>Не удалось получить данные по запросу</Text>
      )}
    </div>
  );
};
