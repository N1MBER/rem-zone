import React from 'react';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { toast } from '../../utils/toast/toast';
import { cn } from '../../__private__/utils/bem';
import { autoCreate } from './helper';
import { addCar, getCars } from '../../utils/api/routes/cars/cars';
import { AutoTable } from './AutoTable/AutoTable';

const cnAuto = cn('Auto');

const Auto = () => {
  const [open, setOpen] = useFlag();

  return (
    <>
      <TablePage
        className={cnAuto()}
        title="Автомобили"
        apiFunction={getCars}
        tableComponent={AutoTable}
        titleButton={
          <Button
            label="Добавить автомобиль"
            size="s"
            iconLeft={IconAdd}
            onClick={setOpen.on}
          />
        }
      />
      <CrudModal
        mode="create"
        createFunc={addCar}
        title="Создание нового автомобиля"
        onClose={setOpen.off}
        isOpen={open}
        items={autoCreate}
        successCallback={() => {
          toast.success('Автомобиль успешно создан');
          setTimeout(() => document.location.reload(), 1000);
        }}
        errorCallback={() => {
          toast.alert('Не удалось создать автомобиль');
        }}
      />
    </>
  );
};

export default Auto;
