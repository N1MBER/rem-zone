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

export type ItemRecord<ITEM, TYPE> = {
  key: keyof ITEM;
  type: TYPE;
  label?: string;
  renderValue?: (item: ITEM) => React.ReactElement;
  list?: ITEM[keyof ITEM][];
  multiple?: boolean;
  getItemLabel?: (item: ITEM[keyof ITEM]) => string;
  getItemKey?: (item: ITEM[keyof ITEM]) => string;
} & (TYPE extends 'select'
  ? {
      list: ITEM[keyof ITEM][];
      getItemLabel: (item: ITEM[keyof ITEM]) => string;
      getItemKey: (item: ITEM[keyof ITEM]) => string;
    }
  : {});

export type CrudModalProps<
  MODE extends ModalCrudType,
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
  items: ItemRecord<TYPE, InputType>[];
  itemId?: string;
  successCallback?: (data: unknown) => void;
  errorCallback?: (data: unknown) => void;
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
