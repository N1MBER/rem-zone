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
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

const cnModel = cn('Model');

const Model = () => {
  const [open, setOpen] = useFlag();

  const { userType } = useSelector((store: RootState) => store.user);

  return (
    <>
      <TablePage
        className={cnModel()}
        title="Модели автомобилей"
        apiFunction={getModels}
        tableComponent={ModelTable}
        titleButton={
          userType !== 'master-executor' ? (
            <Button
              label="Добавить модель"
              size="s"
              iconLeft={IconAdd}
              onClick={setOpen.on}
            />
          ) : undefined
        }
      />
      {userType !== 'master-executor' && (
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
      )}
    </>
  );
};

export default Model;
