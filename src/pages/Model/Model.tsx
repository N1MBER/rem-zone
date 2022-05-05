import React from 'react';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { toast } from '../../utils/toast/toast';
import { cn } from '../../__private__/utils/bem';
import { modelUpdate } from './helper';
import { addModel, getModels } from '../../utils/api/routes/cars/cars';
import { ModelTable } from './ModelTable/ModelTable';
import { getErrorMessage } from '../../utils';

const cnModel = cn('Model');

const Model = () => {
  const [open, setOpen] = useFlag();

  return (
    <>
      <TablePage
        className={cnModel()}
        title="Модели автомобилей"
        apiFunction={getModels}
        tableComponent={ModelTable}
        titleButton={
          <Button
            label="Добавить модель"
            size="s"
            iconLeft={IconAdd}
            onClick={setOpen.on}
          />
        }
      />
      <CrudModal
        mode="create"
        createFunc={addModel}
        title="Создание новой модели"
        onClose={setOpen.off}
        isOpen={open}
        items={modelUpdate}
        successCallback={() => {
          toast.success('Модель успешно создан');
          setTimeout(() => document.location.reload(), 1000);
        }}
        errorCallback={(error) => {
          const message = getErrorMessage(error);
          toast.alert(message ?? 'Не удалось создать модель');
        }}
      />
    </>
  );
};

export default Model;
