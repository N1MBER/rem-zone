// import React from 'react';
// import {
//   Combobox as ComboboxComponent,
//   ComboboxProps,
// } from '@consta/uikit/Combobox';
// import { AxiosPromise } from 'axios';
// import { cn } from '../../__private__/utils/bem';
// import { string } from 'yup';

// type Props<ITEM> = ComboboxProps & {
//   loadable?: boolean;
//   getItems?: (query: Record<string, string>) => AxiosPromise<ITEM[keyof ITEM]>;
//   queryField: string;
//   getItemLabel: (item: ITEM[keyof ITEM]) => string;
//   getItemKey: (item: ITEM[keyof ITEM]) => string;
//   multiple?: boolean;
//   list?: ITEM[keyof ITEM][];
// };

// const cnCombobox = cn('CustomCombobox');

// const deafultGetLabel = <ITEM,>(item: ITEM) => (item ? item?.label ?? '' : '');

// export const Combobox = <ITEM,>(props: Props<ITEM>) => {
//   const {
//     label,
//     key,
//     multiple,
//     placeholder,
//     size = 'm',
//     getItemLabel,
//     getItemKey,
//   } = props;
//   return (
//     <ComboboxComponent
//       label={(label ?? key)?.toString()}
//       className={cnCombobox()}
//       placeholder={(label ?? key)?.toString()}
//       multiple={multiple}
//     />
//   );
// };
