import React from 'react';
import { ItemRecord, InputType } from '../../common/CrudModal/types';
import { Auto, CarModel } from '../../types/auto';
import { getModels } from '../../utils/api/routes/cars/cars';
import moment from 'moment';

import { CreateAuto, UpdateAuto } from '../../utils/api/routes/cars/types';
import { getClients } from '../../utils/api/routes/users/users';
import { Client } from '../../types/user';

export const autoCreate: Array<
  ItemRecord<CreateAuto, InputType, boolean, CarModel | Client>
> = [
  {
    key: 'owner',
    label: 'Владелец',
    type: 'select',
    list: [] as Client[],
    getItems: getClients,
    loadable: true,
    queryField: 'last_name',
    getItemLabel: (item: Client) => `${item.last_name} ${item.first_name[0]}`,
    getItemKey: (item: Client) => item.id,
  },
  {
    key: 'model',
    label: 'Модель автомобиля',
    type: 'select',
    loadable: true,
    list: [] as CarModel[],
    getItems: getModels,
    queryField: 'name',
    getItemLabel: (item: CarModel) => `${item.name} ${item.brand}`,
    getItemKey: (item: CarModel) => item.id,
  },
  {
    key: 'vin',
    label: 'VIN',
    type: 'text',
  },
  {
    key: 'plate_number',
    label: 'Регистрационный номер',
    type: 'text',
  },
  {
    key: 'release_date',
    label: 'Дата выпуска',
    type: 'date',
    renderValue: (item) =>
      moment(item.release_date).format('YYYY-MM-DD').toString(),
  },
  {
    key: 'power',
    label: 'Мощность двигателя л. c.',
    type: 'number',
    explanation: 'л. c.',
  },
  {
    key: 'engine_size',
    label: 'Объем двигателя л.',
    type: 'number',
    explanation: 'л.',
  },
  {
    key: 'mileage',
    label: 'Пробег км',
    type: 'number',
    explanation: 'км',
  },
  {
    key: 'color_code',
    label: 'Код цвета',
    type: 'number',
  },
];

export const autoUpdate: Array<
  ItemRecord<UpdateAuto, InputType, boolean, CarModel>
> = [
  {
    key: 'vin',
    label: 'VIN',
    type: 'text',
  },
  {
    key: 'plate_number',
    label: 'Регистрационный номер',
    type: 'text',
  },
  {
    key: 'release_date',
    label: 'Дата выпуска',
    type: 'date',
  },
  {
    key: 'power',
    label: 'Мощность двигателя',
    type: 'number',
    explanation: 'л. c.',
  },
  {
    key: 'engine_size',
    label: 'Объем двигателя',
    type: 'number',
    explanation: 'л.',
  },
  {
    key: 'color_code',
    label: 'Код цвета',
    type: 'text',
  },
  {
    key: 'mileage',
    label: 'Пробег',
    type: 'number',
  },
];

export const autoView: Array<ItemRecord<Auto, InputType, boolean, CarModel>> = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
  },
  {
    key: 'owner',
    label: 'Владелец',
    type: 'text',
    renderValue: ({ owner }) => (
      <>{`${owner.last_name} ${owner.first_name} ${owner.patronomic}`}</>
    ),
  },
  {
    key: 'owner',
    label: 'Номер телефона',
    type: 'text',
    renderValue: ({ owner }) => <>{owner.phone_number}</>,
  },
  {
    key: 'model',
    label: 'Автомобиль',
    type: 'text',
    renderValue: ({ model }) => <>{`${model.brand} ${model.name}`}</>,
  },
  {
    key: 'vin',
    label: 'VIN',
    type: 'text',
  },
  {
    key: 'plate_number',
    label: 'Регистрационный номер',
    type: 'text',
  },
  {
    key: 'release_date',
    label: 'Дата выпуска',
    type: 'text',
    renderValue: ({ release_date }) => (
      <>{moment(release_date).format('DD.MM.YYYY HH:mm')}</>
    ),
  },
  {
    key: 'power',
    label: 'Мощность двигателя',
    type: 'number',
    renderValue: ({ power }) => <>{`${power} л.с.`}</>,
  },
  {
    key: 'engine_size',
    label: 'Объем двигателя',
    type: 'number',
    renderValue: ({ engine_size }) => <>{`${engine_size} л.`}</>,
  },
  {
    key: 'color_code',
    label: 'Код цвета',
    type: 'number',
    renderValue: (row) => (
      <a
        target="_blank"
        href={`https://google.com/search?q=${row.model.brand}+цвет+${row.color_code}`}
        rel="noreferrer"
      >
        {row.color_code}
      </a>
    ),
  },
  {
    key: 'mileage',
    label: 'Пробег',
    type: 'number',
    renderValue: ({ mileage }) => <>{`${mileage} км`}</>,
  },
];
