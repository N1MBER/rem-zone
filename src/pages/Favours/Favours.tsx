import React, { useState } from 'react';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { toast } from '../../utils/toast/toast';
import { cn } from '../../__private__/utils/bem';
import { favourCreate } from './helper';
import { getFavours, addFavour } from '../../utils/api/routes/favour/favour';
import { FavoursTable } from './FavoursTable/FavoursTable';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { IconRevert } from '@consta/uikit/IconRevert';
import { IconSearch } from '@consta/uikit/IconSearch';
import { getErrorMessage } from '../../utils';

const cnFavours = cn('Favours');

export const Favours = () => {
  const [open, setOpen] = useFlag();
  const [name, setName] = useState<string | undefined>();
  const [queries, setQueries] = useState<{ name?: string }>({});

  const clearData = () => {
    setName(undefined);
    setQueries({});
  };

  return (
    <>
      <TablePage
        className={cnFavours()}
        title="Услуги"
        apiFunction={getFavours}
        tableComponent={FavoursTable}
        titleButton={
          <Button
            label="Добавить услугу"
            size="s"
            iconLeft={IconAdd}
            onClick={setOpen.on}
          />
        }
        queries={{ name: queries.name }}
        additionalControls={
          <>
            <div className={cnFavours('Controls')}>
              <Text size="s" lineHeight="m" view="primary" weight="regular">
                Поиск
              </Text>
              <div className={cnFavours('Inputs')}>
                <TextField
                  className={cnFavours('Input')}
                  type="text"
                  size="s"
                  value={name}
                  onChange={({ value }) => setName(value?.toString())}
                  placeholder="Название"
                />
              </div>
            </div>
            <div className={cnFavours('Buttons')}>
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
                onClick={() => setQueries({ name })}
                iconRight={IconSearch}
              />
            </div>
          </>
        }
      />
      <CrudModal
        mode="create"
        createFunc={addFavour}
        title="Создание новой услуги"
        onClose={setOpen.off}
        isOpen={open}
        items={favourCreate}
        successCallback={() => {
          toast.success('Услуга успешно создана');
          setTimeout(() => document.location.reload(), 1000);
        }}
        errorCallback={(error) => {
          const message = getErrorMessage(error);
          toast.alert(message ?? 'Не удалось создать услугу');
        }}
      />
    </>
  );
};

export default Favours;
