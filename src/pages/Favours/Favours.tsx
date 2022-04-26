import React from 'react';
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

const cnFavours = cn('Favours');

export const Favours = () => {
  const [open, setOpen] = useFlag();

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
        errorCallback={() => {
          toast.alert('Ну удалось создать услугу');
        }}
      />
    </>
  );
};
