import React, { useState } from 'react';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { Button } from '@consta/uikit/Button';
import { cn } from '../../__private__/utils/bem';
import { getBalances } from '../../utils/api/routes/bonuses/bonuses';
import { BalanceTable } from './BalanceTable/BalanceTable';
import { Text } from '@consta/uikit/Text';
import { IconRevert } from '@consta/uikit/IconRevert';
import { IconSearch } from '@consta/uikit/IconSearch';
import { Combobox } from '../../components/Combobox/Combobox';
import { Client } from '../../types/user';
import { getClients } from '../../utils/api/routes/users/users';

import './Balance.scss';

const cnBalance = cn('Balance');

const Balance = () => {
  const [filterData, setFilterData] = useState<string | undefined>();
  const [data, setData] = useState<string | undefined>();

  const clearData = () => {
    setFilterData(undefined);
    setData(undefined);
  };

  return (
    <>
      <TablePage
        className={cnBalance()}
        title="Балансы"
        apiFunction={getBalances}
        tableComponent={BalanceTable}
        additionalControls={
          <>
            <div className={cnBalance('Controls')}>
              <Text size="s" lineHeight="m" view="primary" weight="regular">
                Поиск
              </Text>
              <div className={cnBalance('Inputs')}>
                <Combobox
                  size="s"
                  className={cnBalance('Control')}
                  placeholder="Клиент"
                  loadable
                  // @ts-ignore
                  value={filterData}
                  list={[] as Client[]}
                  getItemLabel={(item: Client) =>
                    `${item.last_name} ${item.first_name}`
                  }
                  getItemKey={(item: Client) => item.id}
                  getItems={getClients}
                  valueKey="id"
                  queryField="last_name"
                  style={{ zIndex: 10 }}
                  onChange={({ value }) =>
                    value && setFilterData(value.toString())
                  }
                />
              </div>
            </div>
            <div className={cnBalance('Buttons')}>
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
          client_id: data,
        }}
      />
    </>
  );
};

export default Balance;
