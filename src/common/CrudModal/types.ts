import { IconComponent } from '@consta/uikit/Icon';
import { AxiosPromise } from 'axios';

import { ModalCrudType } from '../../types/setings';

export type InputType =
  | 'email'
  | 'text'
  | 'number'
  | 'select'
  | 'date'
  | 'date-time'
  | 'date-time-range';

export type SelectData<ITEM, LOADABLE> = {
  multiple?: boolean;
  list: ITEM[keyof ITEM][];
  getItemLabel: (item: ITEM[keyof ITEM]) => string;
  getItemKey: (item: ITEM[keyof ITEM]) => string;
  loadable?: LOADABLE;
  valueKey?: string;
} & (LOADABLE extends true
  ? {
      getItems: (
        query: Record<string, string>
      ) => AxiosPromise<ITEM[keyof ITEM]>;
      queryField: string;
    }
  : {
      getItems?: never;
      queryField?: never;
    });

export type ItemRecord<ITEM, TYPE, LOADABLE> = {
  key: keyof ITEM;
  type: TYPE;
  label?: string;
  explanation?: string;
  icon?: IconComponent;
  valueKey?: string;
  renderValue?: (item: ITEM) => React.ReactElement;
} & (TYPE extends 'select'
  ? SelectData<ITEM, LOADABLE>
  : {
      list?: never;
      multiple?: never;
      getItemLabel?: never;
      getItemKey?: never;
    });

export type DefaultValue<ITEM> = {
  key: keyof ITEM;
  value: ITEM[keyof ITEM];
};

export type CrudModalProps<
  MODE extends ModalCrudType,
  LOADABLE extends boolean,
  TYPE = Record<string, unknown | undefined>
> = {
  mode: MODE;
  title?: string;
  viewFunc?: (id: string) => AxiosPromise<TYPE>;
  createFunc?: (data: TYPE) => AxiosPromise<TYPE>;
  updateFunc?: (data: TYPE, id: string) => AxiosPromise<TYPE>;
  isOpen?: boolean;
  onClose?: () => void;
  element?: TYPE;
  items: ItemRecord<TYPE, InputType, LOADABLE>[];
  itemId?: string;
  successCallback?: (data: unknown) => void;
  errorCallback?: (data: unknown) => void;
  defaultValues?: DefaultValue<TYPE>[];
} & (MODE extends 'view'
  ? {
      viewFunc: (id: string) => AxiosPromise<TYPE>;
      itemId: string;
    }
  : {}) &
  (MODE extends 'create'
    ? {
        createFunc: (data: TYPE) => AxiosPromise<TYPE>;
      }
    : {}) &
  (MODE extends 'edit'
    ? {
        updateFunc: (data: TYPE, id: string) => AxiosPromise<TYPE>;
        element: TYPE;
        itemId: string;
      }
    : {});
