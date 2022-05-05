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
import { getErrorMessage } from '../../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

const cnAuto = cn('Auto');

const Auto = () => {
  const [open, setOpen] = useFlag();

  const { userType } = useSelector((store: RootState) => store.user);

  return (
    <>
      <TablePage
        className={cnAuto()}
        title="Автомобили"
        apiFunction={getCars}
        tableComponent={AutoTable}
        titleButton={
          userType !== 'master-executor' ? (
            <Button
              label="Добавить автомобиль"
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
          createFunc={addCar}
          title="Создание нового автомобиля"
          onClose={setOpen.off}
          isOpen={open}
          items={autoCreate}
          successCallback={() => {
            toast.success('Автомобиль успешно создан');
            setTimeout(() => document.location.reload(), 1000);
          }}
          errorCallback={(error) => {
            const message = getErrorMessage(error);
            toast.alert(message ?? 'Не удалось создать автомобиль');
          }}
        />
      )}
    </>
  );
};

export default Auto;
