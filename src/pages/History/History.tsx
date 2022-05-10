import React, { useState } from 'react';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { HistoryTable } from './HistoryTable/HistoryTable';
import { cn } from '../../__private__/utils/bem';
import { getBalanceHistory } from '../../utils/api/routes/bonuses/bonuses';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconRevert } from '@consta/uikit/IconRevert';
import { IconSearch } from '@consta/uikit/IconSearch';
import { Combobox } from '../../components/Combobox/Combobox';
import { Client } from '../../types/user';
import { getClients } from '../../utils/api/routes/users/users';

import './History.scss';

const cnHistory = cn('History');

type FilterData = {
  client_id?: string;
};

export const History = () => {
  const [filterData, setFilterData] = useState<FilterData>({});
  const [data, setData] = useState<FilterData>({});

  const setValue: (
    key: keyof FilterData,
    value: FilterData[keyof FilterData]
  ) => void = (key, value) => {
    setFilterData({
      ...filterData,
      [key as string]: value,
    });
  };

  const clearData = () => {
    setFilterData({});
    setData({});
  };

  return (
    <TablePage
      className={cnHistory()}
      title="История изменений бонусов"
      apiFunction={getBalanceHistory}
      tableComponent={HistoryTable}
      additionalControls={
        <>
          <div className={cnHistory('Controls')}>
            <Text size="s" lineHeight="m" view="primary" weight="regular">
              Поиск
            </Text>
            <div className={cnHistory('Inputs')}>
              <Combobox
                className={cnHistory('Input')}
                size="s"
                loadable
                list={[] as Client[]}
                getItemLabel={(item: Client) =>
                  `${item.last_name} ${item.first_name}`
                }
                getItemKey={(item: Client) => item.id}
                getItems={getClients}
                queryField="last_name"
                valueKey="id"
                // @ts-ignore
                value={filterData.client_id}
                style={{ zIndex: 10 }}
                onChange={({ value }) =>
                  value && setValue('client_id', value?.toString())
                }
                placeholder="Клиент"
              />
            </div>
          </div>
          <div className={cnHistory('Buttons')}>
            <Button
              form="defaultBrick"
              size="s"
              view="secondary"
              label="Сброс"
              onClick={clearData}
              iconLeft={IconRevert}
            />
            <Button
              form="brickDefault"
              size="s"
              label="Поиск"
              onClick={() => setData(filterData)}
              iconRight={IconSearch}
            />
          </div>
        </>
      }
      queries={{
        client_id: data.client_id,
      }}
    />
  );
};

export default History;
